import React from "react";
import "./css/View.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import MailCards from "./MailCards";

function View() {
  return (
    <div className="view">
      <div className="mail_containerTop">
        <div className="mailTop">
          <CheckBoxIcon className="checkbox" />
          <ArrowDropDownIcon />
          <RefreshIcon />
          <MoreVertIcon />
        </div>

        <div className="mailTopRight">
          <ChevronLeftIcon />
          <ChevronRightIcon />
          <KeyboardIcon />
          <ArrowDropDownIcon />
        </div>
      </div>
      <div className="mail_containerMid">
        <div className="mail_containerMidOptions">
          <div className="mail_containerMidOption">
            <InboxIcon />
            <h3>Primary</h3>
          </div>
          <div className="mail_containerMidOption">
            <PeopleAltIcon />
            <h3>Social</h3>
          </div>
          <div className="mail_containerMidOption">
            <LocalOfferIcon />
            <h3>Promotions</h3>
          </div>
          <div className="mail_containerMidOption">
            <InfoIcon />
            <h3>Updates</h3>
          </div>
          <div className="mail_containerMidOption">
            <ForumIcon />
            <h3>Forums</h3>
          </div>
        </div>
      </div>
      <div className="mail_ContainerMain">
        <div className="mail_containerMainCards">
            <MailCards/>
        </div>
      </div>
    </div>
  );
}

export default View;
