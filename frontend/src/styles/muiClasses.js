import allizaToWorkPictuer from '../images/2.png';
import communityPictuer from '../images/3.jpeg';
import mentorshipPicture from '../images/3.png';
import whyPicture from '../images/4.png';
import missionPictuer from '../images/1.jpeg';
import drivingPictuer from '../images/1.png';
import approachPictuer from '../images/2.jpeg';
import cover from '../images/hero.png';

const useStyles = {
    heroCover: {
        backgroundImage: `url(${cover})`,
        backgroundPosition: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: {xs: '200px', sm: '300px', md: 'auto'},
        borderRadius: '8px'
    },
    header1Props: {
        margin: '0.5em 0',
        typography: {
            sm: {fontSize: '38px', textAlign: 'left'},
            xs: {fontSize: '24px', textAlign:'center'}}
    },
    header2Props: {
        marginBottom: {xs: 4, md: 4}, 
        marginLeft: 'auto',
        marginRight: 'auto', 
        typography: {
            sm: {textAlign: 'left'},
            xs: {textAlign:'center'}
        }
    },
    sectionHeader: {
        marginBottom: '24px',
        fontWeight: 600,
        textAlign: 'center',
        typography: {
            sm: {fontSize: '24px'},
            xs: {fontSize: '20px'}
        }
    },
    pillarBoxProps: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        padding: 2
    },
    heading5: {
        marginTop: '10px',
        fontSize: '20px',
        lineHeight: '24px',
        marginBottom: '10px',
        fontWeight: 'bold'
    },
    picturePosition: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '280px',
        paddingLeft: '0px',
        borderRadius: '6px'
    },
    AllizaToWorkPicture: {
        backgroundImage: `url(${allizaToWorkPictuer})`, 
        margin: {xs: '0 16px', sm: 0}
    },
    communityPicture: {
        backgroundImage: `url(${communityPictuer})`,
        margin: {xs: '0 16px', sm: 0}
    },
    missionPicture: {
        backgroundImage: `url(${missionPictuer})`,
    },
    drivingPicture: {
        backgroundImage: `url(${drivingPictuer})`,
    },
    approachPicture: {
        backgroundImage: `url(${approachPictuer})`,
    },
    mentorshipPicture: {
        backgroundImage: `url(${mentorshipPicture})`,
        margin: {xs: '0 16px', sm: 0}
    },
    whyPicture: {
        backgroundImage: `url(${whyPicture})`,
        backgroundPosition: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: {md:'400px', xs: '250px'},
        borderRadius: '8px'
    },
    whyText: {
        px: '16px',
        pl: '28px',
        display: 'flex', 
        flexDirection: 'column',
        textAlign: 'center',
    },
    aboutPicture: {
       backgroundImage: `url(${allizaToWorkPictuer})`,
       backgroundPosition: '100%',
       backgroundRepeat: 'no-repeat',
       backgroundSize: 'cover',
       height: {xs: '280px', sm: 'auto'},
       borderRadius: '6px',
       mb: {xs: 2, md: 0}
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'primary.light',
        border: '2px solid',
        borderColor: 'secondary.main',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,   
    },
    iconButton: {
        display: 'flex',
        flexDirection: 'column'
    }
  };

  export default useStyles;