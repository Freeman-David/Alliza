import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { FetchArticles } from "../app/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function TalentTrainer({setLayout, isDesktop}) {
    const {articles} = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {    
        dispatch(FetchArticles());
    }, []);

    return (
        <Container maxWidth={'md'} sx={{height: '100vh', pt: 4}}>
            <Stack 
                direction={'row'} 
                alignItems={'center'} 
                justifyContent={isDesktop ? 'center' : 'flex-start'} 
                spacing={10} 
                width={'100%'} 
                mb={2}
            >
                {!isDesktop && <ChevronLeftIcon color='secondary' fontSize='large' onClick={() => setLayout(10)} />}
                <Typography variant={'h2'} fontWeight={'bold'}>
                    Talent Trainer
                </Typography>
            </Stack>

            <Typography variant="body1" textAlign={'center'} mb={4}>
                Read a selection of opinion pieces from our community members.
            </Typography>

            <Grid container spacing={2}>
                {articles.map((article, index) => {
                    const oneDay = 24 * 60 * 60 * 1000;
                    const daysPast = Math.floor((Date.now() - new Date(article.createdAt).getTime()) / oneDay);
                    const published = daysPast === 0 ? 'Today' :  `${daysPast} days ago`;

                    return(
                        <Grid key={index} item md={4} sm={6} xs={12} onClick={() => window.open(article.link, '_blank')} >
                            <img
                                src={`${article.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${article.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={article.header}
                                style={{width: '100%', height: 200}}
                            />
                            <Breadcrumbs separator={"|"} aria-label="article data">
                                <Typography color="text.primary">{article.header}</Typography>
                                <Typography color="text.primary">{article.author}</Typography>
                            </Breadcrumbs>

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
            
        </Container>  
    )
}

export default TalentTrainer