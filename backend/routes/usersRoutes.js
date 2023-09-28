const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserData } = require('../controllers/usersControllers')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getUserData)

module.exports = router