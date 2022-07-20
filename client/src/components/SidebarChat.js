import { Avatar } from '@mui/material'
import React from 'react'
import "./css/SidebarChat.css"

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat__info">
                <h2>Room Name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    )
}

export default SidebarChat

// https://www.youtube.com/watch?v=ktjafK4SgWM
// 9:17:35