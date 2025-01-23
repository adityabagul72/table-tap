const express =require('express');
const { registerOwner, loginOwner} = require('../controllers/owner.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

//Register api for cafe owner/admin
router.post('/register', registerOwner)

//Login api for cafe owner/admin
router.post('/login', loginOwner)

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ msg: 'Welcome to the admin dashboard', owner: req.owner,ownerName: req.owner.name });
});

module.exports = router