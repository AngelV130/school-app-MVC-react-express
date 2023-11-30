import '../styles/style.css'
import ImgGraduationLinux from '../assets/img/p.png'

function Loging() {
  return (
    <div className="flex items-center justify-center h-screen">
        <div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
                {/* <!-- Mitad del logo dentro del formulario --> */}
                <div className="rounded-full overflow-hidden mx-auto -mt-16 mb-6 bg-white w-24 h-24 border-4 border-blue-500">
                    <img src={ImgGraduationLinux} alt="Logo de la escuela" className="w-full h-full object-cover"/>
                </div>

                {/* <!-- Formulario de inicio de sesión --> */}
                <form className="flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Usuario:</label>
                    <input type="text" id="username" name="username" className="shadow appearance-none border rounded py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline" required/>

                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
                    <input type="password" id="password" name="password" className="shadow appearance-none border rounded py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline" required/>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Loging