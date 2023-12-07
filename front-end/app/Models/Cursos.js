import DB from '../../conf/db.js';

const conexionDB = DB

export default class ModeloCursos {
    static table_name = 'Calificaciones'
    constructor(){}

    static async select(id) {
        try {
            const sqlRes = await conexionDB.query(`
            SELECT
                *
            FROM
                Cursos
            WHERE
                Cursos.IdProfesorCreador = ?;
            `,[id])
            return sqlRes[0]
        } catch (error) {
            return error
        }
    }

    static async infoCurso(idProf,idCurso) {
        try {
            const sqlRes = await conexionDB.query(`
            SELECT
                *
            FROM
                Cursos
            WHERE
                Cursos.IdProfesorCreador = ?;
                Cursos.IdCurso = ?;
            `,[idProf,idCurso])
            return sqlRes[0]
        } catch (error) {
            return error
        }
    }
}