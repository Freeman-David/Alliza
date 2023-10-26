import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from '../styles/muiClasses';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useSelector} from 'react-redux';

function About() {
    const navigate = useNavigate();

    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            navigate('/');
          }
    }, [user, navigate]);

    return (
        <>
            <Container sx={{padding: {  xs: '16px'}}}>
                <Typography variant='h5' mb={4} mt={{md: 2, xs: 0}}>
                    About Us
                </Typography>

                <Grid container direction={'row-reverse'} >
                    <Grid item xs={12} md={6} sx={useStyles.aboutPicture}></Grid>
                    <Grid item xs={12} md={6} sx={{pr: {sm: 4, xs: 0}}}>
                        <Typography variant='h2' lineHeight={1.4} sx={{...useStyles.sectionHeader, mb: '12px',}}>
                            Alliza: Guiding your journey, every step of the way 
                        </Typography>
                        
                        <Typography variant='body1' sx={{mb: 2}}>
                            Alliza is a New York-based, end-to-end employment service exclusively for autistic adults. We are creating opportunities by matching talented autistic individuals with the organizations that need them, fostering a mutually beneficial partnership that benefits both individuals and companies. 
                        </Typography>

                        <Typography variant='body1'>
                            We provide <strong>ongoing services</strong> that support autistic adults through every step of their employment process and beyond. Our ultimate mission is to create a supportive community where talented individuals can thrive and showcase their unique abilities.
                        </Typography>
                    </Grid>
                </Grid>

                <Typography variant='h2' textAlign='left' sx={{...useStyles.sectionHeader, mb: '12px', mt: 6, textAlign: 'left'}}>
                    Neorodiversity Insight: Embracing the Strength of Every Mind 
                </Typography>

                <Typography variant='body1' sx={{mb: 2}}>
                    We founded Alliza in response to an untapped resource in the employment landscape. In New York alone, over <strong>70,000</strong> tech positions remain unfilled, yet at least <strong>84%</strong> of college-educated autistic individuals with exceptional technical skills are unemployed.
                </Typography>

                <Typography variant='body1' sx={{mb: 6}}>
                    <strong>We are here to change that.</strong> Alliza bridges the gap by <strong>matching</strong> talented Autistic individuals with the organizations that need them, and providing the <strong>ongoing support</strong> needed for <strong>success</strong>.
                </Typography>

                <Box sx={{backgroundColor: 'primary.light', padding: 4, borderRadius: '6px'}}>
                    <Typography variant='h2' sx={{...useStyles.sectionHeader, mb: '18px'}}>
                        At Alliza, we do more than just make the match 
                    </Typography>

                    <Typography variant='body1'  sx={{mb: 2}}>
                        Our diverse team of experts is involved with every stage of the process, creating an effective and long-term partnership. 
                    </Typography>

                    <Typography variant='body1' sx={{mb: 2}}>
                        <strong style={{color: 'primary.dark'}}>Guidance:</strong> Through workshops, seminars, and one-on-one coaching, Aliza provides education for both autistic adults and their future colleagues at the companies in a holistic, individualized manner.
                    </Typography>
                
                    <Typography variant='body1' sx={{mb: 2}}>
                    <strong style={{color: 'primary.dark'}}>Therapy:</strong> Licensed therapists to assist the autistic individuals on a on-call basis through CBT (Cognitive Behavioral Therapy) & Behavioral Management Therapy practices.
                    </Typography>
                
                    <Typography variant='body1' sx={{mb: 6}}>
                    <strong style={{color: 'primary.dark'}}>Community:</strong> Building a supportive and safe space for autistic adults, colleagues, friends, and family to share their experiences and create lasting friendships.
                    </Typography>    

                    <Typography variant='body1' textAlign='center' fontWeight='bold' sx={{mb: 4}}>
                        We are committed to empowering autistic talent and building a brighter future, hand in hand.
                    </Typography>
                
                    <Box display='flex' direction='column' alignItems='center' justifyContent='center'>
                        <Button onClick={() => navigate('/business-register')} variant='contained' color='secondary' sx={{color: '#fff'}}>Connect with us</Button>
                    </Box>
                </Box>  
            </Container>       
        </>
    );
}

export default About;