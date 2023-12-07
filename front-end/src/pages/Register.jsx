import '../styles/style.css'
import ImgGraduationLinux from '../assets/img/p.png'
import {useNavigate} from 'react-router-dom'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const user = useRef()
    const password = useRef()
    const nombre = useRef()
    const edad = useRef()


    const iniciarSesion = async ()=>{
        try {
            const res = await fetch("http://localhost:3000/api/loging",{method:"POST",body:JSON.stringify({
                user:user.current.value,
                password:password.current.value
            }),
        headers:{
            'Content-Type': 'application/json',
            }})
            return await res.json()
        } catch (error) {
            
        }
    }
  return (
    <div className="flex items-center justify-center h-screen bodyLogging">
        <div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
                {/* <!-- Mitad del logo dentro del formulario --> */}
                <div className="rounded-full overflow-hidden mx-auto -mt-16 mb-6 bg-white w-24 h-24 border-4 border-blue-500">
                    <img src={ImgGraduationLinux} alt="Logo de la escuela" className="w-full h-full object-cover"/>
                </div>

                {/* <!-- Formulario de inicio de sesión --> */}
                <form className="flex flex-col mb-5">
                    <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
                    
                    <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo:</label>
                    <input ref={nombre} type="text" id="nombre" name="nombre" className="shadow appearance-none border rounded py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline" required/>
                    
                    <label htmlFor="edad" className="block text-gray-700 text-sm font-bold mb-2">Edad:</label>
                    <input ref={edad} type="text" id="edad" name="edad" className="shadow appearance-none border rounded py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline" required/>
                    
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Usuario:</label>
                    <input ref={user} type="text" id="username" name="username" className="shadow appearance-none border rounded py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline" required/>

                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
                    <input ref={password} type="password" id="password" name="password" className="shadow appearance-none border rounded py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline" required/>

                    <button onClick={async(e)=>{
                        const res = await iniciarSesion()
                       localStorage.setItem("user",JSON.stringify(
                        res.data[0]
                       ))
                       navigate('/')
                    }} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
                </form>
                <Link to="/logging">
                        <small className='text-blue-800 text-sm border-b border-blue-800 cursor-pointer'>Iniciar Sesion</small>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Register