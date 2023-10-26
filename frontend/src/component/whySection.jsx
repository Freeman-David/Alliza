import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from '../styles/muiClasses';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

function WhySection() {
    const navigate = useNavigate();

    const companyRegister = () => {
        navigate('/business-register');
    }

    return(
        <Box sx={{backgroundColor: 'primary.light', padding: '30px 0', display: 'flex', justifyContent: 'center'}}>
                <Grid container direction='row' rowSpacing={3} sx={{mt: 0, mx: 2}} maxWidth={'lg'}>
                    <Grid item md={5} xs={12} sx={useStyles.whyPicture}></Grid>
                    <Grid item md={7} xs={12} display='flex' flexDirection='column' justifyContent='center' sx={useStyles.whyText}>
                        <Typography variant='h2' sx={{...useStyles.sectionHeader, mb: '12px'}}>
                            Why should you hire autistic talent today? 
                        </Typography>

                        <Typography variant='body1'>
                            Our pool of autistic professionals possess an extraordinary range of cognitive abilities that offer unparalleled value in the tech industry.<br /> <br /> Their exceptional skills encompass areas such as logic, speed, precision, sustained concentration, and an innate ability to intuitively detect errors.<br /> <br />These unique attributes not only provide a fresh and distinctive perspective but also make a significant impact on the dynamics and the performance of your team.
                        </Typography>

                        <Button onClick={companyRegister} variant="contained" color='secondary' sx={{color: '#fff', alignSelf: 'center', width: '200px', mt: 4}}>
                            Let's connect
                        </Button>
                    </Grid>
                </Grid>
        </Box>
    );
}

export default WhySection;