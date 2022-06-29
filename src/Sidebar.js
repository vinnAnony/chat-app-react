import React from "react";
import "./Sidebar.css";
import { DonutLarge } from "@mui/icons-material";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerRight">
          <DonutLarge />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
