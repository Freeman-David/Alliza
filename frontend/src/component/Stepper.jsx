import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/system';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const steps = [
  'Pick a mentor', 
  'Friends to Help You', 
  'Making Your Path', 
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 13,
      right: 'calc(50% + 10px)',
      left: 'calc(-50% + 10px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,#51459e,#8c83c9)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,#51459e, #8c83c9)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#ada6d8',
      borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: '#fff',
    zIndex: 1,
    color: '#6b5fb9',
    width: 30,
    height: 30,
    display: 'flex',
    border: '1px solid #51459e',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, #51459e, #6b5fb9)',
      color: '#fff',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, #51459e, #6b5fb9)',
        color: '#fff',
    }),
}));

function ColorlibStepIcon(props) {
const { active, completed, className } = props;

const icons = [0,1,2,3]

return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
    {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
);
}

function StyledStepper({activeStep}) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />} sx={{mb: 4}}>
        {[0,1,2].map((step, index) => (
        <Step key={step}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{steps[index]}</StepLabel>
        </Step>
        ))}
    </Stepper>
  )
}

export default StyledStepper;