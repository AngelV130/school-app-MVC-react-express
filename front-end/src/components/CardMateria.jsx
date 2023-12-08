import { useRef } from "react"
import {useNavigate} from 'react-router-dom'

export default function CardMeteria({curso}) {
    const menu = useRef()
    const nav = useNavigate()
    const {IdCurso,Nombre,Descripcion,IdProfesorCreador} = curso
    return (
        <>
            {/* <!-- Tarjeta 1 --> */}
          <div className="bg-white rounded-lg shadow-md relative cursor-pointer">
            <div className="mb-1 bg-pink-300">
              <img src="imagen1.jpg" alt="" className="w-full h-32 object-cover rounded-md"/>
            </div>
            <div className="p-2 pt-0"
            onMouseLeave={(e)=>{
              menu.current.classList.add("hidden")
            }}
            >
              <h3 className="text-xl font-semibold mb-2">{Nombre}</h3>
              <p className="text-gray-600 mb-4">{Descripcion}</p>
              <div className="flex items-center justify-end">
                <div className="relative group"
                >
                  <div className="text-gray-400 cursor-pointer" onClick={(e)=>{
                      const clas = "absolute hidden bg-white shadow-md mt-2 w-32 py-2 rounded-md"
                      menu.current.classList.remove("hidden")
                  }}
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 18h18"></path>
                        </svg>
                  </div>
                  <div ref={menu} className="absolute hidden bg-white shadow-md mt-2 w-32 py-2 rounded-md z-10">
                    <p className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={(e)=>{
                      nav(`${IdCurso}/calificaciones`)
                    }}>Calificaciones</p>
                    <p className="px-4 py-2 cursor-pointer hover:bg-gray-100">Asistencias</p>
                    <p className="px-4 py-2 cursor-pointer hover:bg-gray-100">Fijar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}