import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';

const workShops = [
    {
        label: 'Social Skills Development:',
        content: 'Enhance social interactions, communication, and non-verbal cues. Build positive relationships with peers, superiors, and clients through effective communication strategies.',
        icon: <Diversity3Icon color='secondary' sx={{height: 64, width: 64}}/>
    },
    {
        label: 'Workplace Etiquette:',
        content: 'Discover professional conduct, attire, time management, and communication norms through etiquette workshops tailored for the workplace.',
        icon: <HandshakeOutlinedIcon color='secondary' sx={{height: 64, width: 64}}/>
    },
    {
        label: 'Problem-Solving & Decision-Making:',
        content: 'Develop skills to analyze, solve problems, and make informed choices. Valuable for diverse job roles, these skills foster effective decision-making in professional settings.',
        icon: <SensorOccupiedOutlinedIcon color='secondary' sx={{height: 64, width: 64}}/>
    },
    {
        label: 'Stress Management & Resilience:',
        content: 'Equip individuals with coping strategies for workplace challenges. Learn to manage stress and build resilience to handle professional pressures effectively.',
        icon: <SelfImprovementOutlinedIcon color='secondary' sx={{height: 64, width: 64}}/>
    },
    {
        label: 'Workplace Accommodations & Self-Advocacy:',
        content: 'Empower individuals with the skills to communicate needs, access support systems, and create a more inclusive work environment. Gain insights into self-advocacy and workplace accommodations.',
        icon: <AccessibilityNewIcon color='secondary' sx={{height: 64, width: 64}}/>
    },
    {
        label: 'Emotional Intelligence/ Nurturing Heart-Centered Intelligence',
        content: 'Enhance emotional intelligence and empathy through workshops designed to manage personal emotions and understand others. Strengthen relationships, teamwork, and collaboration in the workplace.',
        icon: <Diversity1OutlinedIcon color='secondary' sx={{height: 64, width: 64}}/>
    },
]

function AllizaWorkshop({isDesktop, setLayout}) {
    return (
        <Container maxWidth={'sm'} sx={{
            height: '100vh', pt: 4, overflowY: 'scroll', '&::-webkit-scrollbar': {display: 'none'}
        }}>
                <Stack 
                    direction={'row'} 
                    alignItems={'center'} 
                    justifyContent={isDesktop ? 'center' : 'flex-start'} 
                    spacing={10} 
                    width={'100%'} 
                    mb={2}
                >
                    {!isDesktop && <ChevronLeftIcon color='secondary' fontSize='large' 
                    onClick={() => setLayout(prev => {
                        prev.set('layout', 'nav');
                        return prev;
                    })} />}
                    <Typography variant={'h2'} fontWeight={'bold'}>
                        Alliza Workshops
                    </Typography>
                </Stack>

                {workShops.map((workshop, index) => (
                    <Stack key={workshop.label} spacing={6} width={'100%'}>
                        <Divider sx={{display: index === 0 ? 'none' : 'block'}} />

                        <Stack direction={'row'} alignItems={'center'} spacing={4} width={'100%'}>
                            {workshop.icon}
                            <Stack spacing={2}>
                                <Typography variant='body1' fontWeight={'bold'}>
                                    {workshop.label}
                                </Typography>
                                <Typography variant='body1'>
                                    {workshop.content}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Divider />
                    </Stack>
                ))}
            </Container>
    )
}

export default AllizaWorkshop;