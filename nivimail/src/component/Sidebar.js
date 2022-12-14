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
import './css/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarOptionsTop">
        <div className="sidebarOption">
          <img
            src={process.env.PUBLIC_URL + "/images/plus.PNG"}
            width="30"
            alt="compose"
          />
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
              <Avatar />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
