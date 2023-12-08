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
                Calificaciones.Calificacion AS CalificacionAlumno,
                Alumnos.IdAlumno AS IdUsers
            FROM
                Calificaciones
                JOIN Alumnos ON Calificaciones.IdAlumno = Alumnos.IdAlumno
                JOIN Users ON Alumnos.IdUser = Users.IdUser
                JOIN Cursos ON Calificaciones.IdCurso = Cursos.IdCurso
            WHERE
                Calificaciones.IdCurso = ?
            `,[id])
            return sqlRes[0]
        } catch (error) {
            return error
        }
    }

    static async insert({IdCurso,data}) {
        try {
            await data.map(async(v,i)=>{
                const sqlRes = await conexionDB.query(`
                SELECT
                Calificaciones.IdAlumno 
                FROM
                    Calificaciones
                WHERE
                    Calificaciones.IdCurso = ? AND
                    Calificaciones.IdAlumno = ?
                `,[IdCurso,v.IdUsers])
                if(sqlRes.length > 0){
                    await conexionDB.query(`
                    UPDATE Calificaciones
                        SET Calificacion = ?
                        WHERE IdCurso = ? AND IdAlumno = ?;
                    `,[v.CalificacionAlumno,IdCurso,v.IdUsers,v.CalificacionAlumno])
                }else{
                    await conexionDB.query(`
                    INSERT INTO Calificaciones (IdCurso, IdAlumno, Calificacion) VALUES
                        (?, ?, ?);`,[IdCurso,v.IdUsers,v.CalificacionAlumno])
                }
            })
            return sqlRes[0]
        } catch (error) {
            return error
        }
    }
}