import {  createBrowserRouter } from "react-router-dom";

// Paginas
import Home from "../pages/Home";
import Loging from "../pages/Loging";
import Perfil from '../pages/Perfil'
import Curso from "../pages/Curso";
import Notificaciones from "../pages/Notificaciones";
import Mensajes from "../pages/Mensajes";
import Configuracion from "../pages/Configuracion";
// import Calificaciones from "../pages/Calificaciones";
import Calificaciones from "../pages/Calificaciones2";
import Register from "../pages/Register";

// Layouts
import NavBar from "../layout/NavBar";

const router = createBrowserRouter([
  {
    path: "/logging",
    element: <Loging />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <NavBar/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/perfil",
        element: <Perfil/>
      },
      {
        path: "/curces",
        children: [
          {
            index: true,
            element: <Curso />
          },
          {
            path:":id/calificaciones",
            element: <Calificaciones />
          }
        ]
      },
      {
        path: "/notificaciones",
        element: <Notificaciones/>
      },
      {
        path: "/messages",
        element: <Mensajes/>
      },
      {
        path: "/setings",
        element: <Configuracion/>
      }
    ]
  },
  
]);

export default router
