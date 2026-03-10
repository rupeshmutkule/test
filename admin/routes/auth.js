const express = require('express');
const router = express.Router();
const { showLogin, login, logout } = require('../controllers/authController');

// ✅ Now accessible at /store/login
router.get('/admin/login', showLogin);
router.post('/admin/login', login);
router.get('/admin/logout', logout);

module.exports = router;