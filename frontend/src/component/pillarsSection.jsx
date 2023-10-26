import { ReactComponent as AdvocacyIcon } from '../images/advocacy.svg';
import { ReactComponent as SupportIcon } from '../images/support.svg';
import { ReactComponent as MatchingIcon } from '../images/matching.svg';
import { ReactComponent as GuidanceIcon } from '../images/guidance.svg';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from '../styles/muiClasses';
import SvgIcon from '@mui/material/SvgIcon';
import Container from '@mui/material/Container';

function PillarsSection() {
    return(
        <Container sx={{mt: 10, mb: 10}}>
            <Typography variant='h2' sx={useStyles.sectionHeader}>Our Pillars</Typography>
            <Grid container>
                <Grid item md={1}>
                </Grid>
                <Grid item md={5} sm={6} xs={12} sx={useStyles.pillarBoxProps}>
                    <SvgIcon component={AdvocacyIcon} inheritViewBox sx={{fontSize: '100px'}}/>
                    <Typography variant='h4' sx={useStyles.heading5}>{'Advocacy'}</Typography>
                    <Typography variant='body1' sx={{textAlign: 'center'}}>
                        We’re here to educate and spread the world about these talented individuals and the amazing abilities they have to share.
                    </Typography>
                </Grid>
                <Grid item md={5} sm={6} xs={12} sx={useStyles.pillarBoxProps}>
                    <SvgIcon component={GuidanceIcon} inheritViewBox sx={{fontSize: '100px'}}/>
                    <Typography variant='h4' sx={useStyles.heading5}>{'Guidance'}</Typography>
                    <Typography variant='body1' sx={{textAlign: 'center'}}>
                        Training for individuals and the organizations hiring them, creating an understanding, and laying the groundwork for success.
                    </Typography>
                </Grid>
                <Grid item md={1}>
                </Grid>

                <Grid item md={1}>
                </Grid>
                <Grid item md={5} sm={6} xs={12} sx={useStyles.pillarBoxProps}>
                    <SvgIcon component={MatchingIcon} inheritViewBox sx={{fontSize: '100px'}}/>
                    <Typography variant='h4' sx={useStyles.heading5}>{'Matching'}</Typography>
                    <Typography variant='body1' sx={{textAlign: 'center'}}>
                        We specialize in putting all the pieces together, matching each individual with a position that perfectly matches their unique strengths. 
                    </Typography>
                </Grid>
                <Grid item md={5} sm={6} xs={12} sx={useStyles.pillarBoxProps}>
                    <SvgIcon component={SupportIcon} inheritViewBox sx={{fontSize: '100px'}}/>
                    <Typography variant='h4' sx={useStyles.heading5}>{'Support'}</Typography>
                    <Typography variant='body1' sx={{textAlign: 'center'}}>
                        Our ongoing support provides mentorship, expert therapist support, and a thriving community of peers.
                    </Typography>
                </Grid>
                <Grid item md={1}>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PillarsSection;