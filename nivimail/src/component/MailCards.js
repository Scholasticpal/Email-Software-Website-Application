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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ForwardIcon from '@mui/icons-material/Forward';
import './css/MailCards.css';
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

function SimpleAccordion() {
  const [modalOpen, setModalOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [recipient, setRecipient] = useState("");

  const [forward, setForward] = useState(false);

  const handleReply = () => {
    setModalOpen(true)
    setForward(false)
  }

  const handleForward = () => {
    setModalOpen(true)
    setForward(true)
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <div className="accordMid">
            <div className="accordLeft">
              <CheckBox />
              <Star />
              <Typography className="heading">userName</Typography>
            </div>
            <div className="accordMidMain">
              <Typography className="heading">Subject</Typography>
              <p className="heading">Click here to see Mail Content</p>
            </div>
            <div className="accordMidDate">
              <Typography className="heading">TimeStamp</Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordDetails">
            <div className="accordDetailsTop">
              <p>Subject</p>
              <div className="accordDetailsTopRight">
                <Print />
                <Launch />
              </div>
            </div>
            <div className="accordDetailsInfo">
              <Avatar />
              <div className="sendersInfo">
                <h4>
                  Name of the Sender
                  <small>Email</small>
                </h4>
                <small>To whom the mail is sent</small>
              </div>
              <div className="sendersInfoDate ">
                <div className="sendersInfoDateOption">
                  <small>TimeStamp</small>
                  <StarIcon />
                  <ReplyIcon />
                  <MoreVertIcon />
                </div>
              </div>
            </div>
            <div className="mailContent">
              <div className="mailContentAccord">content</div>
              <ReplyMails/>
              <ForwardMails/>
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
                  <p>{ forward ? 'Forward' : "Reply"}</p>
                  <div className="modalHeaderIcons">
                    <IconButton onClick={() => setModalOpen(false)}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                </div>
                <div onClick={() => setFocus(true)} className="modalRecipient">
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
                    placeholder= { forward ? "Add content here then forward mail ..." : "Add reply to this mail..."}
                  />
                </div>
              </div>
              <div className="modalContainerBottom">
                <div className="modalBottom">
                  <button>{forward ? "Forward" : "Reply"}</button>
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
              <div className="mailReplyLinks">
                <div onClick = {handleReply} className="mailReplyLink">
                <ReplyIcon/>
                  <a href="#">Reply</a>
                </div>
                
                <div onClick = {handleForward} className="mailReplyLink">
                <ForwardIcon/>
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

const ReplyMails = () => {
  return <h1>Reply Mails</h1>
};

const ForwardMails = () => {
  return <h1>Forward Mails</h1>
};
function MailCards() {
  return (
    <div className="mailCards">
      <SimpleAccordion />
    </div>
  );
}

export default MailCards;
