const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/loginController');

router.post('/register', ctrlUser.register);
router.post('/validate', ctrlUser.validate);
module.exports = router;
