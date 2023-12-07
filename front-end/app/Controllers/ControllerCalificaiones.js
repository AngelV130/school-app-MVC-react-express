import ModeloCalificacion from "../Models/Calificacion.js"

export default class ControllerCalificaciones {
    constructor(){}

    static async index(req,res) {
        const {id} = req.params
        try {
            const sqlRes = await ModeloCalificacion.select(Number(id))
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