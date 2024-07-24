const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
