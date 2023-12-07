import ModeloCursos from "../Models/Cursos.js"

export default class ControllerCursos {
    constructor(){}

    static async index(req,res) {
        const {id} = req.params
        try {
            const sqlRes = await ModeloCursos.select(Number(id))
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

    static async curso(req,res) {
        const {idCurso} = req.params
        const {idProf} = req.query
        try {
            const sqlRes = await ModeloCursos.infoCurso(Number(idProf),Number(idCurso))
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