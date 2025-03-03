const Router = require('express')
const router = new Router
const controller = require('./authContoller')

router.post('/registration', controller.registation)
router.post('/login', controller.login)
router.post('/sendLetter', controller.sendLetter)
router.get('/getLetter', controller.getLetter)
router.get('/getcontact', controller.getContact)
router.get('/getchat', controller.getChat)

module.exports = router 
