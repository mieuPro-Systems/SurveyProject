import React from 'react';
import "../components/card.css";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


const Card = () => {
    return (
        <div className="cardcontainer" >
            <div className='card1'>
                <div className='text'>
                    Login as Admin
                </div>
                <div className='icon' >
                    <AdminPanelSettingsIcon style={{ width: '80px', height: '80px' }} />
                    <button type="button" class="btn btn-outline-success button ">Sign in</button>
                </div>
            </div>
            <div className='card2'>
                <div className='text'>
                    Login as Employee
                </div>
                <div className='icon' >
                    <SupervisorAccountIcon style={{ width: '80px', height: '80px' }} />
                    <button type="button" class="btn btn-outline-success button ">Sign in</button>
                </div>
            </div>
        </div >
    )
}

export default Card