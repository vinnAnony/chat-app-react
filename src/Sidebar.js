import React from "react";
import "./Sidebar.css";
import { DonutLarge, SearchOutlined } from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {Avatar,IconButton} from "@mui/material"
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src=""/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>      
          <IconButton>
            <ChatIcon />
          </IconButton>      
          <IconButton>
            <MoreVertIcon />
          </IconButton>      
        </div>
      </div>

      <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlined/>
            <input placeholder="Search or start new chat" type="text"/>
          </div>
        </div>

        <div className="sidebar__chats">
          <SidebarChat/>
        </div>
    </div>
  );
}

export default Sidebar;
