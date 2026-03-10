const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { showDashboard } = require('../controllers/dashboardController');

// All protected
router.use(isAuthenticated);

// ✅ Now accessible at /store/admin/dashboard
router.get('/dashboard', showDashboard);

module.exports = router;