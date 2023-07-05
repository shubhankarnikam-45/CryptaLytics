import React from 'react';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TemporaryDrawer() {

    let [open, setOpen] = useState(false);

    return (
        <div>


            <IconButton onClick={() => setOpen(true)}>
                <MenuRoundedIcon className='nav-link' />
            </IconButton>
            <Drawer
                anchor={"right"}
                open={open}
                onClose={() => setOpen(true)}
            >
                <div className='drawer-div'>
                    <Link to="/">
                        <p className='nav-link'>Home</p>
                    </Link>

                    <Link to="/compare">
                        <p className='nav-link'>Compare</p>
                    </Link>

                    <Link to="/watchlist">
                        <p className='nav-link'>Watchlist</p>
                    </Link>


                    <Link to="/dashboard">
                        <p className='nav-link'>Dashboard</p>
                    </Link>
                </div>
            </Drawer>

        </div>
    );
}