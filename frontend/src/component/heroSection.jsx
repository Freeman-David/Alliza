import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useStyles from '../styles/muiClasses';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const navigate = useNavigate();

    const companyRegister = () => {
        navigate('/business-register');
    }

    const userRegister = () => {
        navigate('/user-register');
    }

    return(
        <Box mb={{md: 0, xs: 10}} height={'91vh'} display={'flex'} flexDirection={'row'} alignItems={{md: 'center', xs: 'center'}} justifyContent={'center'} px={{lg: 0, xs: 2}}>
            <Grid container direction='row-reverse' maxWidth={'lg'}>
                <Grid item xs={12} md={5.5} sx={useStyles.heroCover}></Grid>
                <Grid item xs={12} md={6.5} display='flex' flexDirection='column' justifyContent='center' 
                sx={{pb: {md: 2, xs: 0}, pr: {md: 3, xs: 0}, pt: {md: 0, xs: 4}}}>
                    <Typography variant='h1' sx={useStyles.header1Props}>
                        Creating Opportunities: Discovering a New World of Talent in Autism
                    </Typography>
                    <Typography variant='body1' sx={useStyles.header2Props}>
                        We match talented Autistic individuals with companies who need their unique skills and provide the ongoing support needed for success.   
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} display='flex' alignItems='center'>
                        <Button fullWidth onClick={companyRegister} variant="contained" color='secondary' sx={{color: '#fff'}}>
                            I'm Interested in Hiring
                        </Button>

                        <Button variant='outlined' fullWidth sx={{cursor: 'pointer'}} onClick={userRegister} color='secondary'>
                            I'm Looking for a New Job
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HeroSection;