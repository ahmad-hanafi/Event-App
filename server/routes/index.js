const router = require('express').Router()
const userController = require('../controllers/userController')
const eventController = require('../controllers/eventController')
const confirmEventController = require('../controllers/confirmEventController')
const {authenticate, hrAuthorize, vendorAuthorize} = require('../middlewares/auth.js')

router.post('/login', userController.login) // done

router.use(authenticate)

router.get('/events', eventController.showAll) // done
router.get('/events/:id', eventController.findbyId) // done
router.post('/events', hrAuthorize, eventController.addEvent)  // done
router.put('/events/:id', hrAuthorize, eventController.update) // done
router.patch('/events/:id', hrAuthorize, eventController.updateOne) // done
router.delete('/events/:id', hrAuthorize, eventController.delete) // done

router.get('/events/confirmation/hr', hrAuthorize, confirmEventController.showAllForHR)  // done
router.get('/events/confirmation/vendor', vendorAuthorize, confirmEventController.showAllForVendor) // done
router.post('/events/confirmation/:eventID', vendorAuthorize, confirmEventController.createConfirmEvent) // done 
router.delete('/events/confirmation/vendor/:id', vendorAuthorize, confirmEventController.deleteConfirmEvent) // done

module.exports = router