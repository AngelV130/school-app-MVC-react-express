import DB from '../../conf/db.js';

const conexionDB = DB

export default async function createTable(){
    try {
        await conexionDB.query(`DROP TABLE IF EXISTS Calificaciones CASCADE;`)
        await conexionDB.query(`DROP TABLE IF EXISTS Alumnos CASCADE;`)
        await conexionDB.query(`DROP TABLE IF EXISTS Cursos CASCADE;`)
        await conexionDB.query(`DROP TABLE IF EXISTS Profesores CASCADE;`)
        await conexionDB.query(`DROP TABLE IF EXISTS Users CASCADE;`)

        await conexionDB.query(`
        CREATE TABLE Users (
            IdUser INT PRIMARY KEY AUTO_INCREMENT,
            Nombre VARCHAR(100) NOT NULL,
            Edad INT,
            UserName VARCHAR(50) UNIQUE NOT NULL,
            Password VARCHAR(50) NOT NULL
        );
        `)
        await conexionDB.query(`
        CREATE TABLE Profesores (
            IdProfesor INT PRIMARY KEY AUTO_INCREMENT,
            IdUser INT UNIQUE,
            DiaAlta DATE,
            FOREIGN KEY (IdUser) REFERENCES Users(IdUser)
        );
        `)
        await conexionDB.query(`
        CREATE TABLE Cursos (
            IdCurso INT PRIMARY KEY AUTO_INCREMENT,
            Nombre VARCHAR(100) NOT NULL,
            Descripcion TEXT,
            IdProfesorCreador INT,
            FOREIGN KEY (IdProfesorCreador) REFERENCES Profesores(IdProfesor)
        );
        `)
        await conexionDB.query(`
        CREATE TABLE Alumnos (
            IdAlumno INT PRIMARY KEY AUTO_INCREMENT,
            IdUser INT UNIQUE,
            DiaAlta DATE,
            IDCurso INT,
            FOREIGN KEY (IdUser) REFERENCES Users(IdUser),
            FOREIGN KEY (IDCurso) REFERENCES Cursos(IdCurso)
        );
        `)
        await conexionDB.query(`
        CREATE TABLE Calificaciones (
            IdCalificacion INT PRIMARY KEY AUTO_INCREMENT,
            IdCurso INT,
            IdAlumno INT,
            Calificacion DECIMAL(5, 2), -- Cambiado a DECIMAL(5, 2)
            FOREIGN KEY (IdCurso) REFERENCES Cursos(IdCurso),
            FOREIGN KEY (IdAlumno) REFERENCES Alumnos(IdAlumno)
        );
        `)
        await conexionDB.query(`
        INSERT INTO Users (Nombre, Edad, UserName, Password) VALUES
        ('John Doe', 35, 'prof1', 'password1'),
        ('Jane Smith', 40, 'prof2', 'password2'),
        ('Alice Johnson', 20, 'alumno1', 'password3'),
        ('Bob Williams', 22, 'alumno2', 'password4'),
        ('Charlie Brown', 21, 'alumno3', 'password5'),
        ('David Davis', 23, 'alumno4', 'password6'),
        ('Eva Evans', 19, 'alumno5', 'password7'),
        ('Frank Fisher', 20, 'alumno6', 'password8'),
        ('Grace Green', 22, 'alumno7', 'password9'),
        ('Harry Harris', 21, 'alumno8', 'password10');
        `)
        await conexionDB.query(`
        INSERT INTO Profesores (IdUser, DiaAlta) VALUES
        (1, '2023-01-01'),
        (2, '2023-01-02');
        `)
        await conexionDB.query(`
        INSERT INTO Cursos (Nombre, Descripcion, IdProfesorCreador) VALUES
        ('CursoProfesor1', 'Descripción del Curso 1', 1),
        ('CursoProfesor2', 'Descripción del Curso 2', 2);
        `)
        await conexionDB.query(`
        INSERT INTO Alumnos (IdUser, DiaAlta, IDCurso) VALUES
        (3, '2023-01-03', 1),
        (4, '2023-01-04', 1),
        (5, '2023-01-05', 1),
        (6, '2023-01-06', 1),
        (7, '2023-01-07', 1),
        (8, '2023-01-08', 2);
        `)
        await conexionDB.query(`
        INSERT INTO Calificaciones (IdCurso, IdAlumno, Calificacion) VALUES
        (1, 1, 90.50),
        (1, 2, 85.75),
        (1, 3, 92.00),
        (1, 4, 88.25),
        (1, 5, 95.50),
        (2, 6, 87.00);
        `)
    } catch (error) {
        console.error(error)
    }
}