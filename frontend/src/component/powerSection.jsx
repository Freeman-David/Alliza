import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from '../styles/muiClasses';
import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as JPMIcon } from '../images/JPM.svg';
import { ReactComponent as SapIcon } from '../images/SAP.svg';

function PowerSection() {
    return(
        <Container maxWidth={'md'} sx={{mb: 10}}>
            <Typography variant='h2' sx={useStyles.sectionHeader}>
                Empowering Success Through Case Studies
            </Typography>

            <Grid container direction='row' spacing={{xs: 2}}>
                <Grid item sm={6} xs={12} sx={{...useStyles.pillarBoxProps, padding: 0}}>
                    <SvgIcon id='a' component={JPMIcon} inheritViewBox sx={{fontSize: '120px'}}/>
                    <Typography variant='body1' sx={{ mb: '8px'}}>
                        After 6 months, JP Morgan Chase reported that their newly hired autistic employees were performing at the same level of quality as typical peers with up to <strong>15 years</strong> of experience and were found to be almost <strong>50% more</strong> productive.
                        <br />
                    </Typography>
                </Grid>

                <Grid item sm={6} xs={12} sx={{...useStyles.pillarBoxProps, padding: 0}}>
                    <SvgIcon id='b' fontSize='large' component={SapIcon} inheritViewBox sx={{fontSize: '120px'}}/>
                    <Typography variant='body1' sx={{ mb: '8px'}}>
                        After reforming their processes to be inclusive of neurodiverse individuals, SAP reported <strong>productivity gains, quality improvement,</strong> and boosts in <strong>innovation and engagement.</strong>
                        <br />
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PowerSection;