import Grid from '@mui/material/Grid';
import Box from '@mui/material//Box';
import Typography from '@mui/material/Typography';
import useStyles from '../styles/muiClasses';
import Container from '@mui/material/Container';

function WhySection() {
    return(
        <Container sx={{mt: 10, mb: 10}}>
            <Typography variant='h2' sx={{...useStyles.sectionHeader, mb: 2}}>
                Achieve more with Alliza 
            </Typography>

            <Typography variant='body1' sx={{mb: 3, textAlign: 'center'}}>
                Alliza’s unique and comprehensive approach empowers Autistic individuals, tech organizations and financial organizations to succeed together. 
            </Typography>

            <Grid container direction='row' spacing={2}>
                <Grid item sm={4} xs={12}>
                    <Box sx={{'&:hover': {boxShadow: '0 0 6px #999'}, padding: 2, transition: '0.5s'}}>
                        <Box sx={{...useStyles.missionPicture, ...useStyles.picturePosition}}></Box>
                        <Typography variant='h2' fontSize={{lg: 18, xs: 16}} sx={{fontWeight: 'bold', mb: 1, mt: 2, textAlign: 'center'}} >
                            Our Mission  
                        </Typography>
                        <Typography variant='body1' textAlign='center'>
                            Our mission is to create a supportive community where talented Autistic individuals can thrive and add value to the organizations they become a part of.  
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Box sx={{'&:hover': {boxShadow: '0 0 6px #999'}, padding: 2, transition: '0.5s'}}>
                        <Box sx={{...useStyles.drivingPicture, ...useStyles.picturePosition}}></Box>
                        <Typography textAlign='center' variant='h2' fontSize={{lg: 18, xs: 16}} sx={{fontWeight: 'bold', mb: 1, mt: 2}} >
                            Our Driving Force 
                        </Typography>
                        <Typography textAlign='center' variant='body1'>
                            Our driving force stems from a deep-rooted commitment to transform how companies perceive human resources and foster a positive organizational culture.   
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Box sx={{'&:hover': {boxShadow: '0 0 6px #999'}, padding: 2, transition: '0.5s'}}>
                        <Box sx={{...useStyles.approachPicture, ...useStyles.picturePosition}}></Box>
                        <Typography textAlign='center' variant='h2' fontSize={{lg: 18, xs: 16}} sx={{fontWeight: 'bold', mb: 1, mt: 2}} >
                            Our Approach  
                        </Typography>
                        <Typography textAlign='center' variant='body1'>
                            Our approach extends beyond mere employment, encompassing the comprehensive well-being of individuals in our program.  
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default WhySection;