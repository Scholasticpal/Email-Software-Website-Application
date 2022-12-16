import React from "react";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import SendIcon from "@mui/icons-material/Send";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import VideocamIcon from "@mui/icons-material/Videocam";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { Avatar } from "@material-ui/core";
import "./css/Sidebar.css";
import Modal from "react-modal";
import { useState } from "react";
import zIndex from "@mui/material/styles/zIndex";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectUser } from "../features/UserSlice";

function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [recipient, setRecipient] = useState("");

  const user = useSelector(selectUser)

  return (
    <div className="sidebar">
      <div className="sidebarOptionsTop">
        <div className="sidebarOption">
          <img
            onClick={() => setModalOpen(true)}
            src={process.env.PUBLIC_URL + "/images/plus.PNG"}
            width="30"
            alt="compose"
          />

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
                  <p>New Message</p>
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
                    placeholder="Compose Your Mail..."
                  />
                </div>
              </div>
              <div className="modalContainerBottom">
                <div className="modalBottom">
                  <button>Send</button>
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
        </div>
        <div className="sidebarOptionIcon">
          <InboxOutlinedIcon />
        </div>
        <div className="sidebarOptionIcon">
          <StarOutlinedIcon />
        </div>
        <div className="sidebarOptionIcon">
          <WatchLaterIcon />
        </div>
        <div className="sidebarOptionIcon">
          <SendIcon />
        </div>
        <div className="sidebarOptionIcon">
          <InsertDriveFileIcon />
        </div>
        <div className="sidebarOptionIcon">
          <LabelImportantIcon />
        </div>
      </div>

      <div className="sidebarOptionsBottom">
        <div className="sidebarOptions">
          <div className="sidebarOptionIcon">
            <img
              src={process.env.PUBLIC_URL + "/images/meet.png"}
              width="20"
              alt="meet"
            />
          </div>
          <div className="sidebarOptionIcon">
            <VideocamIcon />
          </div>
          <div className="sidebarOptionIcon">
            <KeyboardIcon />
          </div>
        </div>

        <div className="sidebarBottomLast">
          <div className="sidebarOptions">
            <div className="sidebarOptionIcon">
              <img
                src={process.env.PUBLIC_URL + "/images/hangouts.png"}
                width="20"
                alt="hangout"
              />
            </div>
            <div className="sidebarOption">
              <Avatar 
                src = {user.photo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
