import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { forgotPassword } from "../app/slices/auth";
import { useDispatch, useSelector } from "react-redux";

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isError, isSuccess, message} = useSelector(state => state.auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email');
          
        dispatch(forgotPassword(email));
    }

    return (
        <Container maxWidth={'xs'} sx={{height: 'calc(100vh - 300px)'}}>
            <Stack spacing={2} sx={{mt: 5, position: 'relative'}}>
                <Typography textAlign={'center'} variant="h2">
                    Forgot your Password?
                </Typography>

                <Typography textAlign={'center'} variant="body2" sx={{color: 'text.secondary', mb: 5}} >
                    Please enter the email address associated with your account and we will email you a link to reset your password.
                </Typography>

                {/* Reset password Form */}
            
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        color='secondary'
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        Send Request
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export default ResetPassword