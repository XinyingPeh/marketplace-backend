const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const authMiddleware = require('../middlewares/auth_middleware')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.patch('/edit/personalinfo', authMiddleware, userController.editpersonalinfo)

module.exports = router
