import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

function Admin() {
    const navigate = useNavigate();
    const userData = useSelector(state => state.user.data);
    if(!userData?.isAdmin) {
        navigate("/profile");
        message.warning("You are a user not an admin");
    }
    return (
        <div>This is Admin Profile</div>
    )
}

export default Admin