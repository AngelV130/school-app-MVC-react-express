import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
// import { css } from "tailwindcss";

const Calificaciones = () => {
  const [statModificar,setStatModificar] = useState(false)
  const [text,setText] = useState("")
  const [validacion,setValidaion] = useState(false)
  const [calificaciones, setCalificaciones] = useState([
    // {
    //     id:1,
    //   nombre: "Alice Johnson",
    //   curso: "CursoProfesor1",
    //   estado: "Activo",
    //   calificacion: 1,
    // },
    // {
    //     id:2,
    //   nombre: "Bob Williams",
    //   curso: "CursoProfesor1",
    //   estado: "Activo",
    //   calificacion: 1,
    // },
    // ...
  ]);

    // Estado para el array de inputs
    // const [inputs, setInputs] = useState([]);
    const {id} = useParams()


    // Función para manejar cambios en las calificaciones
  const handleCalificacionChange = (index, event) => {
    const newCalificaciones = [...calificaciones];
    newCalificaciones[index].CalificacionAlumno = event.target.value;
    setCalificaciones(newCalificaciones);
  };


    const obtenerData =  async (f="") =>{
        try {
        const res = await fetch("http://localhost:3000/api/calificaciones/"+id,{method:"GET",
        headers:{
            'Content-Type': 'application/json',
            }})
        const result = await res.json()
        setCalificaciones(result.data)
        console.log(result)
        console.log("result")
        } catch (error) {
            console.log(error)
        }
    }

    const guardarCalificaciones =  async () =>{
        // console.log(calificaciones,calificaciones.length)
        // return
        if (calificaciones == null || calificaciones.length == 0){
        console.log("No hay data")
        return 
        }
        try {
        const res = await fetch("http://localhost:3000/api/calificaciones/"+id,{method:"POST",
        body:JSON.stringify({data:calificaciones}),
        headers:{
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            }})
        const result = await res.json()
        obtenerData(result)
        // setCalificaciones(result.data)
        console.log(result)
        console.log("result")
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        obtenerData()
    },[])



    function validarCalificacion(input) {
        const valor = input.value;

        // Expresión regular para validar números con hasta 2 decimales
        const regex = /^\d+(\.\d{0,2})?$/;

        if (!regex.test(valor)) {
            setText('Ingrese un número válido con hasta 2 decimales.');
            setValidaion(true)
            // input.setCustomValidity(''); // Limpiar la validación personalizada
        } else {
            const numero = parseFloat(valor);
            if (isNaN(numero) || numero < 0 || numero > 100) {
                setText('La calificación debe estar entre 0 y 100.');
                // input.setCustomValidity(''); // Limpiar la validación personalizada
                setValidaion(true)
            } else {
                // document.getElementById('mensajeError').textContent = '';
                // input.setCustomValidity(''); // Limpiar la validación personalizada
                setValidaion(false)
                return false
            }
        }
        return true
    }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between bg-blue-100 p-3">
        <h1 className="text-3xl font-bold">
            Calificaciones
        </h1>
        <div className="flex justify-end mt-4 flex-col">
            
          {
            !statModificar ? 
              <button onClick={(e)=>{
                setStatModificar(true)
              }} className="mr-1 ml-1 flex items-center bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-yellow flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              Modificar
            </button>
            :
            <button disabled={validacion} onClick={(e)=>{
                guardarCalificaciones()
                setStatModificar(false)
              }} className="mr-1 ml-1 flex items-center bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-yellow flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
              </svg>
              Guardar
            </button>
          }
          {validacion &&  <small className="text-red-600">{text}</small>}
        </div>
      </div>
      <table className="w-full table-auto rounded-lg shadow-md bg-blue-100">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Nombre</th>
            <th className="px-4 py-2 text-left font-medium">Curso</th>
            <th className="px-4 py-2 text-left font-medium">Estado</th>
            <th className="px-4 py-2 text-left font-medium">Calificación</th>
          </tr>
        </thead>
        <tbody>
        {calificaciones.map((calificacion, i) => (
          <tr key={calificacion.IdUsers} className="border-b border-gray-200">
            <td className="px-4 py-2">{calificacion.NombreAlumno}</td>
            <td className="px-4 py-2">{calificacion.NombreCurso}</td>
            <td className="px-4 py-2">{"Activo"}</td>
            <td className="flex flex-col px-4 py-2">
              <input disabled={!statModificar}
                onChange={(e) => {
                    if(validarCalificacion(e.target)){
                    }
                    handleCalificacionChange(i, e)
                }}
                className="text-center bg-transparent border border-black"
                type="text"
                value={calificacion.CalificacionAlumno}
              />
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
};

export default Calificaciones;