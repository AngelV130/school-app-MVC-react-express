import User from "../Models/User.js"

export default class ControllerSesion {
    constructor(){}

    static async loging(req,res) {
        const {user,password} = req.body
        console.log(req.body)
        try {
            const sqlRes = await User.selectSesion({user,password})
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

    static async register(req,res) {
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