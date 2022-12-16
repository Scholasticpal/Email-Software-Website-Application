import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { Avatar } from "@material-ui/core";
import HelpOutlinedIcon from "@material-ui/icons/HelpOutlined";
import DialpadOutlinedIcon from "@material-ui/icons/DialpadOutlined";
import "./css/Header.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/UserSlice";
import { auth } from "../firebase";

function Header() {
  const user = useSelector(selectUser);

  return (
    <div className="header">
      <div className="headerLeft">
        <MenuIcon />
        <img
          src={process.env.PUBLIC_URL + "/images/darklogo2.PNG"}
          width="200"
          alt="niviMail"
        />
      </div>
      <div className="headerMiddle">
        <div className="header_SearchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search Mail" />
          <ArrowDropDownIcon />
        </div>
      </div>
      <div className="headerRight">
        <div className="headerRightIcons">
          <HelpOutlinedIcon />
          <SettingsOutlinedIcon />
          <DialpadOutlinedIcon />
        </div>
        <div
          className="headerAvatar"
          style={{
            cursor: "pointer",
          }}
        >
          <Avatar onClick={() => auth.signOut()} src={user.photo} />
        </div>
      </div>
    </div>
  );
}

export default Header;
