import { useEffect, useState } from "react"
import CardMateria from "../components/CardMateria"
import { getUser } from "../utils/GOLOBALS"
function Curso() {
  const [data,setData]=useState([])
  const obtenerCursos = async () => {
    try {
      const {IdUser} = getUser()
      const res = await fetch(`http://localhost:3000/api/curso/${IdUser}`)
      const respuesta = await res.json()
      setData(respuesta.data)
      console.log(respuesta)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    obtenerCursos()
  },[])
    return (
        <>
          {/* <!-- Contenido de la página --> */}
          <h1 className="text-3xl font-bold mb-4">Cursos</h1>
          <div className="container mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* <!-- ... (Repite la estructura similar para las demás tarjetas) --> */}
                {
                  data != undefined && data.map((v,i)=>{
                    console.log(v)
                    return <CardMateria key={v.IdCurso} curso={v}/>
                  })
                }
            </div>
          </div>
        </>
    )
  }
  
  export default Curso