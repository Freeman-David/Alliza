import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

function JoinUsSection() {
    const navigate = useNavigate();

    return (
        <Box sx={{backgroundColor: 'primary.light', padding: '60px 24px'}}>
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                
                <Typography variant='h2' textAlign='center' sx={{mb: 2, fontWeight: 'bold', lineHeight: 1.4}}>
                    Unlock the untapped potential of autistic talent and elevate your organization to new heights. 
                </Typography>
                <Typography variant='body1' textAlign='center' sx={{mb: 2}}>
                    Let's discover together the incredible opportunities ahead of us.
                </Typography>
            
                <Button onClick={() => navigate('/business-register')} variant='contained' color='secondary' sx={{color: '#fff'}}>Connect with us</Button>
                    
            </Container>
        </Box>
    );
}

export default JoinUsSection;