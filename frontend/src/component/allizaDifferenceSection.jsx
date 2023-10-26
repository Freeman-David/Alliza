import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useStyles from '../styles/muiClasses';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function AllizaDifferenceSection() {
    return(
        <Box sx={{backgroundColor: 'primary.light'}}>
            <Container sx={{py: 6}}>
                <Typography variant='h2' sx={useStyles.sectionHeader}>What makes Alliza different?</Typography>
                <Grid container direction='column' gap={4}>
                    <Grid container item xs={12}>
                        <Grid item sm={4.5} xs={12} sx={{...useStyles.AllizaToWorkPicture, ...useStyles.picturePosition}}></Grid>
                        <Grid item sm={7.5} display='flex' flexDirection='column' justifyContent='center' sx={{padding: '24px 24px 24px 48px'}}>
                            <Typography variant='h2' sx={{fontWeight: 'bold', mb: '10px'}}>Alliza to Work</Typography>
                            <Typography variant='body1'>
                                We provide expert end-to-end support, including our career development program, throughout job matching and beyond.
                            </Typography>    
                        </Grid>
                    </Grid>

                    <Grid container item direction="row-reverse" xs={12}>
                        <Grid item sm={4.5} xs={12} sx={{...useStyles.communityPicture, ...useStyles.picturePosition}}></Grid>
                        <Grid item sm={7.5} display='flex' flexDirection='column' justifyContent='center'
                            sx={{padding: {sm: '24px 48px 24px 0', xs: '24px 24px 24px 48px'}}}>
                            <Typography variant='h2' sx={{fontWeight: 'bold', mb: '10px'}}>Community</Typography>
                            <Typography variant='body1'>
                                We create vibrant and supportive communities, both through our online platform and in person. These communities are a safe space for autistic adults, colleagues, friends, and family to share their experiences and create lasting friendships.
                            </Typography>    
                        </Grid>
                    </Grid>

                    <Grid container item xs={12}>
                        <Grid item sm={4.5} xs={12} sx={{...useStyles.mentorshipPicture, ...useStyles.picturePosition}}></Grid>
                        <Grid item sm={7.5} display='flex' flexDirection='column' justifyContent='center' sx={{padding: '24px 24px 24px 48px'}}>
                            <Typography variant='h2' sx={{fontWeight: 'bold', mb: '10px'}}>Mentorship</Typography>
                            <Typography variant='body1'>
                                Each individual is matched with two exceptional mentors. Their On-Site Mentor is a current employee who provides guidance, advice, and companionship. Their Expert Mentor is an experienced individual with years of industry experience, who will be available to answer questions and provide advice when challenges arise.
                            </Typography>    
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default AllizaDifferenceSection;