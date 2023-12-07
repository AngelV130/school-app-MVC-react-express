import {Router} from 'express';
import ControllerCursos from '../Controllers/ControllerCursos.js'
import ControllerSesion from '../Controllers/ControllerSesion.js';
import ControllerCalificaciones from '../Controllers/ControllerCalificaiones.js';
import PDFDocument from 'pdfkit-table'
import DB from '../../conf/db.js';

export const to_do = Router();
const app = to_do


// Función para obtener el nombre del curso y la fecha de hoy
async function obtenerDatosCurso(connection, idCurso) {
    const [rows] = await connection.execute('SELECT Nombre FROM Cursos WHERE IdCurso = ?', [idCurso]);
    return rows.length > 0 ? rows[0] : null;
  }
  
  // Función para obtener las calificaciones de los alumnos en un curso
  async function obtenerCalificaciones(connection, idCurso) {
    const [rows] = await connection.execute('SELECT u.Nombre AS Alumno, c.Calificacion FROM Calificaciones c JOIN Alumnos a ON c.IdAlumno = a.IdAlumno JOIN Users u ON a.IdUser = u.IdUser WHERE c.IdCurso = ?', [idCurso]);
    return rows;
  }



// Logging / Register
app.post('/loging', ControllerSesion.loging);
app.post('/register', ControllerSesion.register);

// Cursos
app.get('/curso/:id', ControllerCursos.index);
app.get('/curso/:idCurso', ControllerCursos.curso);



// Calificaciones
app.get('/calificaciones/:id?', ControllerCalificaciones.index);



// PDF
app.get('/generar-pdf/:idCurso', async (req, res) => {
    const { idCurso } = req.params;

    // Crear un nuevo documento PDF
    const doc = new PDFDocument();
  
    try {
      // Conectar a la base de datos usando mysql2/promises
      const connection = DB
  
      // Obtener datos del curso
      const curso = await obtenerDatosCurso(connection, idCurso);
  
      if (!curso) {
        res.status(404).send('Curso no encontrado');
        return;
      }
  
      // Configurar la respuesta HTTP para devolver un archivo PDF
      const namemArchivoPDF = `Calificaciones_del_Curso_${curso.Nombre}`
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename=${namemArchivoPDF}.pdf`);
  
        const fechaHoy = new Date();
        const FechaHoy = `${String(fechaHoy.getDate()).padStart(2, '0')}/${String(fechaHoy.getMonth() + 1).padStart(2, '0')}/${fechaHoy.getFullYear()}`;
      // Pipe the PDF content to the response
      doc.pipe(res);
  
      // Agregar el nombre del curso y la fecha de hoy al PDF
      doc.fontSize(14).text(`Calificaciones del Curso: ${curso.Nombre}`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Fecha de hoy: ${FechaHoy}`, { align: 'center' });
      doc.moveDown();
  
      // Obtener calificaciones de los alumnos
      const calificaciones = await obtenerCalificaciones(connection, idCurso);
  
      // Agregar las calificaciones al PDF en formato de tabla
      const table = {
        headers: ['Alumno', 'Calificación'],
        rows: calificaciones.map(calificacion => [calificacion.Alumno, calificacion.Calificacion]),
      };
  
      doc.table(table, {
        prepareHeader: () => doc.font('Helvetica-Bold'),
        prepareRow: row => doc.font('Helvetica').fontSize(10),
      });
  
      // Finalizar y enviar el PDF
      doc.end();
    } catch (error) {
      console.error('Error en la generación del PDF:', error);
      res.status(500).send('Error en la generación del PDF');
    } 
});