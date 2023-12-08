import { useEffect, useState } from "react"
import CardMateria from "../components/CardMateria"
import { getUser } from "../utils/GOLOBALS"
import Modal from "../components/Modal"

function Curso() {
  const [isOpen, setIsOpen] = useState(false)
  const [data,setData]=useState([])

  const onOpen = () =>{ setIsOpen(true)}
  const onClose = () =>{ setIsOpen(false)}

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
          <div className="">
            <div className="flex flex-row">
              <h1 className="text-3xl font-bold mb-4">Cursos</h1>
              <button class="h-8 w-8 ml-3" 
              onClick={onOpen}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>                    
              </button>
            </div>
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
          </div>
        </>
    )
  }
  
  export default Curso