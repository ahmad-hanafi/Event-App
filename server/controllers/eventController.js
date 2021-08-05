const { Event } = require('../models')

class eventController {
    static showAll(req, res, next) { // get all Event
        Event.findAll({
            order: [['createdAt', 'ASC']]
        })
            .then(Event => {
                res.status(200).json(Event)
            })
            .catch(err => {
                next({
                    code: 500,
                    message: "Internal server error"
                })
            })
    }

    static findbyId(req, res, next) { //get Event by id
        Event.findOne({
            where: {
                id: +req.params.id
            }
        })
            .then(Event => {
                res.status(200).json(Event)
            })
            .catch(err => {
                next({
                    code: 404,
                    message: "Data not found"
                })
            })
    }
    static addEvent(req, res, next) {
        const newEvent = {
            name: req.body.name,
            date1: req.body.date1,
            date2: req.body.date2,
            date3: req.body.date3,
            location: req.body.location,
            eventStatus: 'Pending',
        }
        Event.create(newEvent)
            .then(Event => {
                res.status(201).json(Event)
            })
            .catch(err => {
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

    static update(req, res, next) {
        Event.update(req.body, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
            .then(data => {
                res.status(200).json({ message: "Update success !" })
            })
            .catch(err => {
                next(err)
            })
    }

    static updateOne(req, res, next) {
        Event.update({ eventStatus: req.body.eventStatus }, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
            .then(Event => {
                res.status(200).json(Event)

            })
            .catch(err => {
                next({
                    code: 404,
                    message: "Data not found"
                })
            })
    }

    static delete(req, res, next) {
        Event.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(Event => {
                res.status(200).json({ message: "Event has been deleted" })
            })
            .catch(err => {
                next({
                    code: 404,
                    message: "Data not found"
                })
            })
    }

}

module.exports = eventController