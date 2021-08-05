const { ConfirmEvent, Event, User } = require('../models')

class ConfirmEventController {
    static showAllForHR(req, res, next) {
        ConfirmEvent.findAll({
            include: [
                { model: Event },
                { 
                  model: User,
                  attributes: [ 'id', 'username']
                 }
                
            ],
            order: [['eventID', 'ASC']]
        })
            .then((ConfirmEvent) => {
                res.status(200).json(ConfirmEvent)
            })
            .catch((err) => {
                next({
                    code: 500,
                    message: "Internal server error"
                })
            })
    }

    static showAllForVendor(req, res, next) {
        ConfirmEvent.findAll({
            where: { userID: req.currentUser.id },
            include: [{ model: Event }],
            order: [['eventID', 'ASC']]
        })
            .then((ConfirmEvent) => {
                res.status(200).json(ConfirmEvent)
            })
            .catch((err) => {
                next({
                    code: 500,
                    message: "Internal server error"
                })
            })
    }

    static createConfirmEvent(req, res, next) {
        const { eventID } = req.params
        // const { id } = req.params
        const userID = req.currentUser.id

        ConfirmEvent.findOne({ where: { eventID, userID }, include: [{ model: Event }] })
            .then(data => {
                if (data !== null) {
                    return ConfirmEvent.update(req.body, {
                        where: {
                            eventID
                        },
                        returning: true,
                    })
                } else {
                    const addConfirmEvent = {
                        userID: req.currentUser.id,
                        eventID,
                        confirmDate: req.body.confirmDate,
                        isApprove: req.body.isApprove,
                        remark: req.body.remark,
                    }
                    return ConfirmEvent.create(addConfirmEvent)
                }
            })
            .then(Event => {
                res.status(201).json(Event)
            })
            .catch(err => {
                console.log(err)
                if (err.message) {
                    next({
                        code: 400,
                        message: err
                    })
                } else {
                    next({
                        code: 500,
                        message: "Internal server error"
                    })
                }
            })
    }

    static deleteConfirmEvent(req, res, next) {
        ConfirmEvent.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(Event => {
                res.status(200).json({ message: "Event has been delete from the list" })
            })
            .catch(err => {
                next({
                    code: 404,
                    message: "Data not found"
                })
            })
    }
}

module.exports = ConfirmEventController