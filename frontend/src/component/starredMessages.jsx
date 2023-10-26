import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from "react-redux";
import { UpdateSidbarType } from "../app/slices/app";
import Messages from "./messages";

function StarredMessages() {
    const dispatch = useDispatch();

    return (
        <Box sx={{ height: '100vh', backgroundColor: '#f8faff'}}>
            <Stack direction={'column'} height={'100%'}>

                {/* Header */}
                <Box sx={{width: '100%', boxShadow: '0 0 2px rgba(0,0,0,.25)'}}>
                    <Stack direction={'row'} sx={{height: '100%', p: 2}} alignItems={'center'} spacing={3}>
                        <IconButton onClick={() => {dispatch(UpdateSidbarType('CONTACT'))}}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="subtitle2">
                            Starred Messages
                        </Typography>
                    </Stack>
                </Box>

                {/* Body */}
                <Stack sx={{height: '100%', position: 'relative', flexGrow: 1, overflowY: 'scroll'}} p={3} spacing={3}>

                    <Messages />

                </Stack>

            </Stack>
        </Box>
    )
}

export default StarredMessages;