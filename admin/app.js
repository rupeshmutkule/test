const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// ✅ Routes with /store prefix
const authRoutes  = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use('/store', authRoutes);           // /store/login, /store/logout
app.use('/store/admin', adminRoutes);    // /store/admin/dashboard

// ✅ Redirect root to /store/admin/login
app.get('/', (req, res) => res.redirect('/store/admin/login'));
app.get('/store', (req, res) => res.redirect('/store/admin/login'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});