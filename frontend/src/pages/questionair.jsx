import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import InterestsRoundedIcon from '@mui/icons-material/InterestsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import softSkills from '../softSkills.js';

const steps = [
  {
    label: 'Interests and Aspirations',
    requiredFields: [
      'industry',
      'role',
      'interests',
      'softSkills',
      'desireImprovment'
    ]
  }, 
  {
    label: 'Education and Employment',
    requiredFields: [
      'education',
      'skills'
    ]
  }, 
  {
    label: 'Mentorship and Expectations',
    requiredFields: [
      'goalFromAliza',
      'supportNeeds',
      'mentorFrequency',
      'mentorGenderPrefered',
    ]
  }, 
  {
    label: 'general',
    requiredFields: [
      'communicationPreferences'
    ]
  }
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,#3edad8,#3dcab1)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,#3edad8, #3dcab1)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, #3edad8, #3dcab1)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, #3edad8, #3dcab1)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <InterestsRoundedIcon />,
    2: <SchoolRoundedIcon />,
    3: <SupportRoundedIcon />,
    4: <InfoRoundedIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Questionair() {
  const initialFormData = Object.freeze({
    industry: '',
    role: '',
    interests: '',
    softSkills: [],
    desireImprovment: '',
    education: '',
    skills: [],
    prevWorkDescription: '',
    goalFromAliza: '',
    supportNeeds: '',
    mentorFrequency: '',
    mentorGenderPrefered: '',
    communicationPreferences: '',
    accessibilityNeeds: [],
    additionalSupportNeeds: '',
    communityEngagement: '',
    referral: '',
    additionalDiagnoseInformation: '',
  });

  const [openError, setOpenError] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {user} = useSelector(state => state.auth);
  const industries = ['Tech', 'Finance'];
  const roles = [
    'Software Developer/Engineer', 
    'Quality Assurance', 
    'Data Analyst/Scientist', 
    'Cybersecurity Analyst',
    'Financial Analyst',
    'Analyst/Quantitative',
    'Penetration Tester',
    'Accounting Specialist'
  ];
  const educationLevels = ['Associate Degree', 'Bachelor Degree', 'Master Degree', 'Doctorate/Ph.D'];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      
    }
  }, [user, navigate, dispatch]);

  const handleNext = () => {
    if (!validateStep(steps[activeStep].requiredFields)) {
      onError();
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateStep = requiredFields => {
    for (var i = 0; i < requiredFields.length; i++) {
      if (formData[requiredFields[i]] === '' || formData[requiredFields[i]].length <= 0) { 
        return false; 
      }; 
    };

    return true;
  }

  const onError = () => {
    setOpenError(true);
  };

  const handleCloseError = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }

      setOpenError(false);
  };

  const handleSubmit = event => {

  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container direction="column" alignItems="center" spacing={2}>

          <Grid item xs={12}>
            {activeStep === 0 && (
              <>
                <Typography variant="h5" sx={{textAlign: 'center', mt: 2, mb: 2}}>
                  Interests and Aspirations
                </Typography>

                <FormControl >
                  <Typography variant='body1'>What field are you in? *</Typography>
                  <TextField required id='industry' fullWidth onChange={handleChange} name="industry" 
                  variant="outlined" select value={formData.industry} defaultValue="Tech" > 
                    {industries.map((industry) => (
                        <MenuItem key={industry} value={industry}>
                          {industry}
                        </MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <FormControl>
                  <Typography variant='body1'>What job role are you intetested in pursuing? *</Typography>
                  <TextField fullWidth select onChange={handleChange} value={formData.role} name="role" variant="outlined">
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <FormControl>
                  <Typography variant='body1'>What are your hobbies and interests? (Please list only a few) *</Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.interests} name="interests" variant="outlined" />
                </FormControl>

                <FormControl>
                  <Typography variant='body1'>What are your strengths skills? *</Typography>
                  <Select input={<OutlinedInput fullWidth/>} name='softSkills' multiple onChange={handleChange} renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )} value={formData.softSkills}>
                    {softSkills.map((skill) => (
                      <MenuItem
                        key={skill}
                        value={skill}
                      >
                        {skill}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <Typography variant='body1'>What are some areas you would like to improve or develop further? *</Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.desireImprovment} name="desireImprovment" variant="outlined" />
                </FormControl>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Typography variant="h5" sx={{textAlign: 'center', mt: 2, mb: 2}}>
                  Education and Employment
                </Typography>

                <FormControl >
                  <Typography variant='body1'>Highest of education completed: *</Typography>
                  <TextField fullWidth select onChange={handleChange} value={formData.education} name="education" variant="outlined" >
                    {educationLevels.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <FormControl>
                  <Typography variant='body1'>Please list any relevant skills of qualifications you possess: *</Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.skills} name="skills" variant="outlined" />
                </FormControl>

                <FormControl >
                  <Typography variant='body1'>Have you had any previos work experience?</Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.workExperience} name="workExperience" variant="outlined" />
                </FormControl>

                <FormControl>
                  <Typography variant='body1'>If yes, please briefly describe your previos work experience:</Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.prevWorkDescription} name="prevWorkDescription" variant="outlined" />
                </FormControl>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Typography variant="h5" sx={{textAlign: 'center', mt: 2, mb: 2}}>
                  Mentorship and Expectations
                </Typography>

                <FormControl >
                  <Typography variant='body1'>What are your goals in joining the Aliza platform? *</Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.goalFromAliza} name="goalFromAliza" variant="outlined" />
                </FormControl>

                <FormControl>
                  <Typography variant='body1'>What specific support or services are you seeking from the Aliza platform? *</Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.supportNeeds} name="supportNeeds" variant="outlined" />
                </FormControl>

                <FormControl>
                  <Typography variant='body1'>How often would you prefer to have mentorship check-ins? *</Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.mentorFrequency} name="mentorFrequency" variant="outlined" />
                </FormControl>

                <FormControl>
                  <Typography variant='body1'>Which gender would you prefer to work with as a mentor? *</Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.mentorGenderPrefered} name="mentorGenderPrefered" variant="outlined" />
                </FormControl>

              </>
            )}
            {activeStep === 3 && (
              <>
                <Typography variant="h5" sx={{textAlign: 'center', mt: 2, mb: 2}}>
                  general
                </Typography>

                <FormControl >
                  <Typography variant='body1'>
                    Pleae provide any additional information you would like to share about your diagnosis:
                  </Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.additionalDiagnoseInformation} name="additionalDiagnoseInformation" variant="outlined" />
                </FormControl>

                <FormControl >
                  <Typography variant='body1'>
                    How would you like to receive communication from mentors and Aliza platform? *
                  </Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.communicationPreferences} name="communicationPreferences" variant="outlined" />
                </FormControl>

                <FormControl >
                  <Typography variant='body1'>
                    Do you have any specific accessibility needs or accommodations that you would like us to be aware of?
                  </Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.accessibilityNeeds} name="accessibilityNeeds" variant="outlined" />
                </FormControl>

                <FormControl >
                  <Typography variant='body1'>
                    Are you interested in accessing therapy or additional support services?
                  </Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.additionalSupportNeeds} name="additionalSupportNeeds" variant="outlined" />
                </FormControl>

                <FormControl >
                  <Typography variant='body1'>
                    Would you like to participate in the community forums to connect with other individuals, families, and friends?
                  </Typography>
                  <TextField fullWidth onChange={handleChange} value={formData.communityEngagement} name="communityEngagement" variant="outlined" />
                </FormControl>
              </>
            )}
          </Grid>

          <Grid item xs={12}>
            {activeStep > 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBack}
                sx={{ marginRight: 8 }}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Grid>
        </Grid>
        <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            Please fill all the required fields!
        </Alert>
        </Snackbar>
      </Container>
  )
}

export default Questionair;

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};