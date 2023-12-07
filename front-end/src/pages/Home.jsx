import LinuxSentado from '../assets/img/Linux_Logo_sentado.png'

function Home() {
  return (
      <>
        {/* <!-- Contenido de la página --> */}
        <h1 className="text-3xl font-bold mb-4">Bienvenido a tu Página Principal</h1>
        <p>Contenido principal de la página...</p>

        {/* <!-- Imagen en el lado derecho inferior --> */}
        <img src={LinuxSentado} alt="Linux_Logo_sentado.png" className="absolute bottom-0 right-0 mb-4 mr-0 w-auto h-2/5"/> 
      </>
  )
}

export default Home
