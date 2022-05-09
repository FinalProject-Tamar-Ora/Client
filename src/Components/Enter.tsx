import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import LogIn from './LogIn';
import SignUp from './SignUp';
import './Enter.css';
import Logo from './Logo';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button id="b1" onClick={handleOpen}>Don't have an account?</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                {/* <Box sx={{ ...style, width: 200 }}>
           <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p> 
           
        </Box> */}
                <div >
                    <SignUp />
                    <Button onClick={handleClose}>Exit</Button>
                </div>

            </Modal>
        </React.Fragment>
    );
}

export function Enter() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Logo />
            <Button onClick={handleOpen}>Enter</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                {/* <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
         
        </Box> */}
                <div>

                    <LogIn />
                    <ChildModal />
                </div>

            </Modal>

            <Stack direction="row" >
                <IconButton ><ArrowBackTwoToneIcon />My Previous Purchases </IconButton>
                <IconButton >Make me a purchase <ArrowForwardIcon /></IconButton>
            </Stack >

        </div >
    );
}
export default Enter;