import DB from '../../conf/db.js';

const conexionDB = DB

export default class ModeloCalificacion {
    static table_name = 'Calificaciones'
    constructor(){}

    static async select(id) {
        try {
            const sqlRes = await conexionDB.query(`
            SELECT
                Cursos.Nombre AS NombreCurso,
                Users.Nombre AS NombreAlumno,
                Calificaciones.Calificacion AS CalificacionAlumno
            FROM
                Calificaciones
                JOIN Alumnos ON Calificaciones.IdAlumno = Alumnos.IdAlumno
                JOIN Users ON Alumnos.IdUser = Users.IdUser
                JOIN Cursos ON Calificaciones.IdCurso = Cursos.IdCurso
            WHERE
                Calificaciones.IdCurso = ?;
            `,[id])
            return sqlRes[0]
        } catch (error) {
            return error
        }
    }
}