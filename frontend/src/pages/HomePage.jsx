import HeroSection from '../component/heroSection';
import PillarsSection from '../component/pillarsSection';
import AllizaDifferenceSection from '../component/allizaDifferenceSection';
import PowerSection from '../component/powerSection';
import WhySection from '../component/whySection';
import AchieveSection from '../component/achieveSection';
import JoinUsSection from '../component/joinUsSection';
import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LandinPage() {
    const navigate = useNavigate();

    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            navigate('/');
          }
    }, [user, navigate]);

    return(
        <>
            <HeroSection />

            <PowerSection />

            <WhySection />

            <PillarsSection />
                
            <AllizaDifferenceSection />

            <AchieveSection />

            <JoinUsSection />
            
        </>
    );
}

export default LandinPage;