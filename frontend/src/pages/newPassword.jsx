import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { resetPassword } from "../app/slices/auth";
import { useDispatch } from "react-redux";

function NewPassword() {
    const [showPasswordA, setShowPasswordA] = useState(false);
    const [showPasswordB, setShowPasswordB] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {queryParameters} = useSearchParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const passwordA = data.get('passwordA');
        const passwordB = data.get('passwordB');

        if (passwordA !== passwordB) {
            // set Error
            return;
        }
          
        dispatch(resetPassword({passwordA, passwordB, token: queryParameters.get('token')}));
    }

    return (
        <Container maxWidth={'xs'} sx={{height: 'calc(100vh - 300px)'}}>
            <Stack spacing={2} sx={{mt: 5, position: 'relative'}}>
                <Typography textAlign={'center'} variant="h2">
                    Reset Password
                </Typography>

                <Typography textAlign={'center'} variant="body2" sx={{color: 'text.secondary', mb: 5}} >
                    Please set your new password
                </Typography>
            
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        color='secondary'
                        type={showPasswordA ? "text" : "password"}
                        id="passwordA"
                        label="New Password"
                        name="passwordA"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'> 
                                    <IconButton onClick={() => {setShowPasswordA(!showPasswordA)}}>
                                        {showPasswordA ? <VisibilityOffOutlinedIcon sx={{color: '#000'}}/> : <RemoveRedEyeOutlinedIcon sx={{color: '#000'}} />}
                                    </IconButton>
                                </InputAdornment>
                            )
                      }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        color='secondary'
                        type={showPasswordB ? "text" : "password"}
                        id="passwordB"
                        label="Confirm Password"
                        name="passwordB"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'> 
                                    <IconButton onClick={() => {setShowPasswordB(!showPasswordB)}}>
                                        {showPasswordB ? <VisibilityOffOutlinedIcon sx={{color: '#000'}}/> : <RemoveRedEyeOutlinedIcon sx={{color: '#000'}} />}
                                    </IconButton>
                                </InputAdornment>
                            )
                      }}
                    />
                    
                    <Stack mt={3} alignItems={'center'} justifyContent={'space-between'} direction={'row'} width={'100%'}>
                        <Link color={'secondary'} sx={{ fontSize: '15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center'}} onClick={() => {navigate('/login')}}>
                            <ChevronLeftOutlinedIcon />
                            Return to Sign in
                        </Link>

                        <Button
                            type="submit"
                            color='secondary'
                            variant="contained"
                        >
                            Reset Password
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export default NewPassword;