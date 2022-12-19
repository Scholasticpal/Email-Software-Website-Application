import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { CheckBox, Star } from "@material-ui/icons";
import { Launch, Print } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ReplyIcon from "@mui/icons-material/Reply";
import ForwardIcon from "@mui/icons-material/Forward";
import "./css/MailCards.css";
import Modal from "react-modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinkIcon from "@mui/icons-material/Link";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import PhotoIcon from "@mui/icons-material/Photo";
import ScreenLockRotationIcon from "@mui/icons-material/ScreenLockRotation";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useEffect } from "react";
import db from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/UserSlice";
import ReactHtmlParser from "react-html-parser";
import { selectMailId, setMailId } from "../features/mailSlice";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function SimpleAccordion({ key, Id, mail }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [subject, setSubject] = useState(mail.subject);
  const [content, setContent] = useState("");
  const [recipient, setRecipient] = useState(mail.to);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const mailId = useSelector(selectMailId);
  console.log(mailId);

  const [repliedMails, setRepliedMails] = useState([]);
  const [forwardedMails, setForwardedMails] = useState([]);

  const [forwarded, setForwarded] = useState(false);
  const [replied, setReplied] = useState(false);

  const [forward, setForward] = useState(false);

  const handleReply = () => {
    setModalOpen(true);
    setForward(false);
  };

  const handleForward = () => {
    setModalOpen(true);
    setForward(true);
  };

  const sendMail = (id) => {
    forward ? addForward(id) : addReply(id);
  };

  const addForward = (id) => {
    alert(id);
    if (id.mailId) {
      db.collection("sentMails")
        .doc(id.MailId)
        .collection("forwardedMails")
        .add({
          from: user.email,
          to: recipient,
          subject: `fwd<${subject}>`,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          content: content,
          forwarded: true,
          id: id,
          user: user,
        });
      alert("Mail Forwarded Successfully");
      setModalOpen(false);
      setContent("");
    }
  };

  const addReply = (id) => {
    alert(id);
    if (id.mailId) {
      db.collection("sentMails")
        .doc(id.MailId)
        .collection("repliedMails")
        .add({
          from: user.email,
          to: recipient,
          subject: `re<${subject}>`,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          content: content,
          replied: true,
          id: id,
          user: user,
        });
      alert("Mail Replied Successfully");
      setModalOpen(false);
      setContent("");
    }
  };

  useEffect(() => {
    if (mailId?.mailId) {
      db.collection("sentMails")
        .doc(mailId.mailId)
        .collection("repliedMails")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setRepliedMails(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              reMail: doc.data(),
            }))
          )
        );
      setReplied(true);
    }
  }, [mailId]);

  useEffect(() => {
    if (mailId?.mailId) {
      db.collection("sentMails")
        .doc(mailId.mailId)
        .collection("forwardedMails")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setForwardedMails(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              fwdMail: doc.data(),
            }))
          )
        );
      setForwarded(true);
    }
  }, [mailId]);

  return (
    <div>
      <Accordion
        key={key}
        onClick={() =>
          dispatch(
            setMailId({
              mailId: Id,
            })
          )
        }
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <div className="accordMid">
            <div className="accordLeft">
              <CheckBox />
              <Star />
              <Typography className="heading">
                {mail.user.email === user.email
                  ? "me"
                  : mail.from.toString().split("@")[0].trim()}
              </Typography>
            </div>
            <div className="accordMidMain">
              <Typography className="heading">{mail.subject}</Typography>
              <p className="heading">Click here to see Mail Content</p>
            </div>
            <div className="accordMidDate">
              <Typography className="heading">
                {new Date(mail.timestamp?.toDate()).toLocaleString()}
              </Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordDetails">
            <div className="accordDetailsTop">
              <p>{mail.subject}</p>
              <div className="accordDetailsTopRight">
                <Print />
                <Launch />
              </div>
            </div>
            <div className="accordDetailsInfo">
              <Avatar src={mail.user.photo} />
              <div className="sendersInfo">
                <h4>
                  {mail.user.displayName}
                  <small>{mail.from}</small>
                </h4>
                <small>{`To ${mail.to === user.email ? "me" : mail.to}`}</small>
              </div>
              <div className="sendersInfoDate ">
                <div className="sendersInfoDateOption">
                  <small>
                    {new Date(mail.timestamp.toDate()).toLocaleString()}
                  </small>
                  <StarIcon />
                  <ReplyIcon />
                  <MoreVertIcon />
                </div>
              </div>
            </div>
            <div className="mailContent">
              <div className="mailContentAccord">
                {ReactHtmlParser(mail.content)}
              </div>
              <ReplyMails />
              <ForwardMails />
              <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                shouldCloseOnOverlayClick={false}
                style={{
                  overlay: {
                    width: 680,
                    height: "auto",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    zIndex: "1000",
                    top: "35%",
                    left: "50%",
                    mariginTop: "-250px",
                    marginLeft: "-350px",
                    borderRadius: "none",
                  },
                  content: {
                    margin: 0,
                    padding: 0,
                    border: "none",
                  },
                }}
              >
                <div className="modalContainer">
                  <div className="modalContainerTop">
                    <div className="modalHeader">
                      <p>{forward ? "Forward" : "Reply"}</p>
                      <div className="modalHeaderIcons">
                        <IconButton onClick={() => setModalOpen(false)}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div
                      onClick={() => setFocus(true)}
                      className="modalRecipient"
                    >
                      <p>{focus ? "To" : " Recipients"}</p>
                      <input
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        type="text"
                      />
                    </div>
                    <div className="modalRecipient">
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        type="text"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="quill">
                      <ReactQuill
                        value={content}
                        onChange={(value) => setContent(value)}
                        placeholder={
                          forward
                            ? "Add content here then forward mail ..."
                            : "Add reply to this mail..."
                        }
                      />
                    </div>
                  </div>
                  <div className="modalContainerBottom">
                    <div className="modalBottom">
                      <button onClick={(e) => sendMail(mailId)}>
                        {forward ? "Forward" : "Reply"}
                      </button>
                      <TextFormatIcon />
                      <AttachFileIcon />
                      <LinkIcon />
                      <SentimentSatisfiedIcon />
                      <PhotoIcon />
                      <ScreenLockRotationIcon />
                      <div className="modalBottomLast">
                        <MoreVertIcon />
                        <DeleteIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              {replied &&
                repliedMails.map(({ id, reMail }) => (
                  <ReplyMails key={id} id={id} mail={reMail} />
                ))}
              {forwarded &&
                forwardedMails.map(({ id, fwdMail }) => (
                  <ReplyMails key={id} id={id} mail={fwdMail} />
                ))}
              <div className="mailReplyLinks">
                <div onClick={handleReply} className="mailReplyLink">
                  <ReplyIcon />
                  <a href="#">Reply</a>
                </div>

                <div onClick={handleForward} className="mailReplyLink">
                  <ForwardIcon />
                  <a href="#">Forward</a>
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const ReplyMails = ({ key, id, mail }) => {
  const user = useSelector(selectUser);
  return (
    <>
      <div className="repliedMail">
        <div className="repliedMailContainer">
          <div className="repliedMailTop">
            <h5>{`<replied mail>`}</h5>
          </div>

          <div className="repliedMailMid">
            <p
              style={{
                margin: "0px 10px",
                paddingBottom: "10px",
                fontWeight: "500",
              }}
            >
              {mail.subject}
            </p>
            <div className="accordDetailsInfo">
              <Avatar src={mail.user.photo} />
              <div className="sendersInfo">
                <h4>
                  {mail.user.displayName}
                  <small>{mail.from}</small>
                </h4>
                <small>{`To ${mail.to === user.email ? "me" : mail.to}`}</small>
              </div>
              <div className="sendersInfoDate">
                <div className="sendersInfoDateOption">
                  <small>
                    {new Date(mail.timestamp?.toDate()).toLocaleString()}
                  </small>
                  <StarIcon />
                  <ReplyIcon />
                  <MoreVertIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mailContent">
          <div className="mailContentAccord">
            {ReactHtmlParser(mail.content)}
          </div>
        </div>
      </div>
    </>
  );
};

const ForwardMails = ({ key, id, mail }) => {
  const user = useSelector(selectUser);
  return (
    <>
      <div className="repliedMail">
        <div className="repliedMailContainer">
          <div className="repliedMailTop">
            <h5>{`<forwarded mail>`}</h5>
          </div>
          <div className="repliedMailMid">
            <div className="accordDetailsInfo">
              <Avatar src={mail.user.photo} />
              <div className="sendersInfo">
                <h4>
                  {mail.user.displayName}
                  <small>{mail.from}</small>
                </h4>
                <small>{`To ${mail.to === user.email ? "me" : mail.to}`}</small>
              </div>
              <div className="sendersInfoDate">
                <div className="sendersInfoDateOption">
                  <small>
                    {new Date(mail.timestamp?.toDate()).toLocaleString()}
                  </small>
                  <StarIcon />
                  <ReplyIcon />
                  <MoreVertIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mailContent">
          <div className="mailContentAccord">
            {ReactHtmlParser(mail.content)}
          </div>
        </div>
      </div>
    </>
  );
};
function MailCards() {
  const [mails, setMails] = useState([]);
  const [userMails, setuserMails] = useState([]);
  const [show, setShow] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("sentMails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            mail: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    if (mails.length !== 0) {
      mails.map(({ id, mail }) => {
        if (user.email === mail.to || user.email === mail.from) {
          setShow(true);
          setuserMails(mail);
        }
      });
    }
  }, [mails, user.email]);

  return (
    <div className="mailCards">
      {show &&
        mails.map(({ id, mail }) => {
          if (user.email === mail.to || user.email === mail.from) {
            return (
              <>
                <SimpleAccordion key={id} Id={id} mail={mail} />
              </>
            );
          }
        })}
    </div>
  );
}

export default MailCards;
