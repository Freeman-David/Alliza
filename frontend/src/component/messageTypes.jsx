import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Message_options } from '../chatData';
import { useState } from 'react';

function TimeLine({msg}) {
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Divider width='46%' />
        <Typography variant='caption' sx={{color: 'secondary.main'}}>
            {msg.text}
        </Typography>
        <Divider width='46%' />
    </Stack>
  )
}

function TextMsg({msg, menu}) {
    return (
        <Stack 
            direction={'row'} 
            justifyContent={msg.incoming ? 'start' : 'end'}
        >
           <Box p={1.5} sx={{
                backgroundColor: msg.incoming ? 'secondary.light' : '#fff', 
                borderRadius: 1.5,
                width: 'max-content',
            }}>
                <Typography variant='body2'>
                    {msg.message}
                </Typography>
           </Box>
           
           {menu && <MsgOptions />}
        </Stack>
    )
}

function ReplyMsg ({msg, menu}) {
    return(
        <Stack 
            direction={'row'} 
            justifyContent={msg.incoming ? 'start' : 'end'}
        >
            <Box p={1.5} sx={{
                backgroundColor: msg.incoming ? 'secondary.light' : '#fff', 
                borderRadius: 1.5,
                width: 'max-content',
            }}>
                <Stack spacing={2}>
                    <Stack p={2} direction={'column'} spacing={3} alignItems={'center'} sx={{backgroundColor: 'primary.light', borderRadius: 1}}>
                        <Typography variant='body2'>
                            {msg.message}
                        </Typography>
                    </Stack>
                    <Typography variant='body2'>
                        {msg.reply}
                    </Typography>
                </Stack>
            </Box>

            {menu && <MsgOptions />}
        </Stack>
    );
}

const MsgOptions = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <MoreVertIcon 
                fontSize='x-small' 
                color={'secondary'}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
             />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <Stack spacing={1} px={1}>
                    {Message_options.map((option, index) => {
                        return <MenuItem key={index} onClick={handleClick}>{option.title}</MenuItem>
                    })}
                </Stack>
            </Menu>
        </>
    );
}

export {TimeLine, TextMsg, ReplyMsg,}