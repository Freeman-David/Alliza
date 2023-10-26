const express = require('express');
const router = express.Router();
const {
    userRequest,
    companyRequest,
    registerUser, 
    loginUser, 
    getMe,
    forgotPassword,
    resetPassword,
    updateMe,
    getUsers,
    getMentors,
    startAudioCall,
    startVideoCall,
    generateZegoToken,
    getArticles,
    getEvents,
    registerEvent,
    updateAvatar,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', userRequest);
router.post('/company-register', companyRequest);
router.post('/register', registerUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/login', loginUser);
router.post('/start-audio-call', protect, startAudioCall);
router.post('/start-video-call', protect, startVideoCall);
router.post('/generate-zego-token', protect, generateZegoToken);
router.post('/update-me', protect, updateMe);
router.post('/update-avatar', protect, updateAvatar);
router.post('/register-event', protect, registerEvent);

router.get('/userData', protect, getMe);
router.get('/get-users', protect, getUsers);
router.get('/get-mentors', protect, getMentors);
router.get('/get-articles', protect, getArticles);
router.get('/get-events', protect, getEvents);

module.exports = router;