import User from "../Models/User.js"

export default class ControllerToDo {
    constructor(){}

    static async index(req,res) {
        const {id} = req.query
        try {
            res.status(200)
            res.json({
                data:sqlRes,
                status: res.statusCode
            })
        } catch (error) {
            res.status(500)
            res.json({
                error,
                status: res.statusCode
            })
        }
    }

    static async insert(req,res) {
        const todo = req.body
        try {
            res.status(200)
            res.json({
                data:sqlRes,
                status: res.statusCode
            })
        } catch (error) {
            res.status(500)
            res.json({
                error,
                status: res.statusCode
            })
        }
    }

    static async delete(req,res) {
        const {id} = req.body
        try {
            res.status(200)
            res.json({
                data:sqlRes,
                status: res.statusCode
            })
        } catch (error) {
            res.status(500)
            res.json({
                error,
                status: res.statusCode
            })
        }
    }

}