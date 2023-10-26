import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactComponent as TaskAssesmentIcon } from '../../images/taskAssessment.svg';
import { ReactComponent as EducationIcon } from '../../images/education.svg';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { FetchArticles } from "../../app/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import article1Img from '../../images/article1.png';
import article2Img from '../../images/article2.png';
import article3Img from '../../images/article3.png';
import article4Img from '../../images/article4.png';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

const menu = [
    {
        name: 'Task Assessment',
        icon: <TaskAssesmentIcon height={40} width={40} />,
    },
    {
        name: 'Report',
        icon: <EducationIcon height={40} width={40} />,
    },
];

const assignments = [
    {text: 'Self-Exploration and Strengths'},
    {text: 'Networking and Communication Skills'},
    {text: 'Goal Setting and Action Plan'},
];

const images = [article1Img, article2Img, article3Img, article4Img];

function Portal({user, setLayout}) {
    const {articles} = useSelector(state => state.app);
    const dispatch = useDispatch();
    const avatarURL = 'https://alliza.s3.us-east-1.amazonaws.com/';

    useEffect(() => {    
        dispatch(FetchArticles());
    }, [dispatch]);

    return (
        <Stack spacing={8} pt={6}>
            <Grid container>
                <Grid item sm={6}>
                    <Stack direction={'row'} spacing={1} width={'100%'} alignItems={'center'}>
                        <Avatar src={avatarURL + user.careerAdvisor.id} alt='career advisor' 
                        sx={{height: 90, width: 90}} />

                        <Stack spacing={.5}>
                            <Box>
                                <Typography variant='body1' fontWeight={'bold'}>Lara Croft</Typography>
                                <Typography variant='body2'>Career Advisor</Typography>
                            </Box>
                        
                            <Link color='secondary'>Schedule a meeting</Link>
                            <Link color='secondary'>Send a message</Link>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item sm={6}>
                    <Stack direction={'row'} spacing={1} width={'100%'} alignItems={'center'}>
                        <Avatar src={avatarURL + user.therapist.id} alt='therapist' sx={{height: 90, width: 90}} />

                        <Stack spacing={.5}>
                            <Box>
                                <Typography variant='body1' fontWeight={'bold'}>Jake K.</Typography>
                                <Typography variant='body2'>Alliza's Therapist</Typography>
                            </Box>
                        
                            <Link color='secondary'>Schedule a meeting</Link>
                            <Link color='secondary'>Send a message</Link>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>

            <Box>
                <Divider textAlign="left" sx={{
                    color: 'secondary.main', 
                    fontWeight: 'bold', 
                    mb: 3,
                    '&::before': {width: 0},
                    '&::after': {width: '100%'},
                    '& .css-qywfm8-MuiDivider-wrapper': {paddingLeft: 0, paddingRight: 2}
                }}>
                    My Tasks
                </Divider>

                <Stack spacing={2}>
                    {user.meetings.map(meeting => (
                        <Typography key={meeting} variant='body1'>{meeting}</Typography>
                    ))}
                </Stack>
            </Box>

            <Box>
                <Divider textAlign="left" sx={{
                    color: 'secondary.main', 
                    fontWeight: 'bold', 
                    mb: 3,
                    '&::before': {width: 0},
                    '&::after': {width: '100%'},
                    '& .css-qywfm8-MuiDivider-wrapper': {paddingLeft: 0, paddingRight: 2}
                }}>
                    My Latest Activity
                </Divider>

                <Stack spacing={2}>
                    <Typography variant='body1' fontWeight={'bold'} sx={{color: 'primary.dark'}}>
                        Blog - <Link color={'secondary'} fontWeight={400}>"How to meet new people"</Link>
                    </Typography>
                </Stack>
            </Box>
            
            <Box>
                <Divider textAlign="left" sx={{
                    color: 'secondary.main', 
                    fontWeight: 'bold', 
                    mb: 3,
                    '&::before': {width: 0},
                    '&::after': {width: '100%'},
                    '& .css-qywfm8-MuiDivider-wrapper': {paddingLeft: 0, paddingRight: 2}
                }}>
                    Recomended For Me
                </Divider>

                <Grid container maxWidth={'md'} gap={5} mb={4} px={5}>
                    {articles.map((article, index) => {
                        const oneDay = 24 * 60 * 60 * 1000;
                        const daysPast = Math.floor((Date.now() - new Date(article.createdAt).getTime()) / oneDay);
                        const published = daysPast === 0 ? 'Today' :  `${daysPast} days ago`;

                        return(
                            <Grid 
                                key={index} 
                                item 
                                lg={5.7}
                                md={5.5} 
                                xs={12} 
                                onClick={() => window.open(article.link, '_blank')} 
                                sx={{border: '1px solid', borderColor: 'secondary.main', padding: 2}}
                            >
                                <img
                                    src={images[index]}
                                    alt={article.header}
                                    style={{width: '100%', height: 180}}
                                />

                                <Typography variant='body2' fontWeight={'bold'} color="text.primary" mb={2}>
                                    {article.header}
                                </Typography>
                                <Typography variant='body2' fontWeight={'bold'} color="text.primary">
                                {article.author}
                                </Typography>

                                <Breadcrumbs separator={"|"} aria-label="article data">
                                    <Typography variant="body2" >
                                        {published}
                                    </Typography>
                                    <Typography variant="body2" >
                                        {`${article.readingTime} min read`}
                                    </Typography>
                                </Breadcrumbs>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Stack>
    )
}

export default Portal;