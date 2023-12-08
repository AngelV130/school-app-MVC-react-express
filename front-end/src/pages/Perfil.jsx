import React, { useState } from 'react';

const Perfil = () => {
  // Estado para la información del usuario
  const [userInfo, setUserInfo] = useState({
    nombre: 'John Doe',
    edad: 25,
    correo: 'john.doe@example.com',
    userName: 'john_doe',
  });

  // Estado para los campos del formulario de edición
  const [editForm, setEditForm] = useState({
    nombre: '',
    edad: '',
    correo: '',
    userName: '',
  });

  // Función para manejar los cambios en los campos del formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Función para manejar la actualización de la información del usuario
  const handleUpdateInfo = (e) => {
    e.preventDefault();
    setUserInfo({
      nombre: editForm.nombre || userInfo.nombre,
      edad: editForm.edad || userInfo.edad,
      correo: editForm.correo || userInfo.correo,
      userName: editForm.userName || userInfo.userName,
    });
    // Puedes enviar esta información actualizada al servidor si es necesario
  };

  return (
    <div className="flex justify-between items-center px-44 ">
      {/* Parte derecha: Información del usuario */}
      <div className="text-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <div className="text-left">
          <p>
            <strong>Nombre:</strong> {userInfo.nombre}
          </p>
          <p>
            <strong>Edad:</strong> {userInfo.edad}
          </p>
          <p>
            <strong>Correo:</strong> {userInfo.correo}
          </p>
          <p>
            <strong>UserName:</strong> {userInfo.userName}
          </p>
        </div>
      </div>

      {/* Parte izquierda: Formulario de edición */}
      <div className="ml-8">
        <h2 className="text-2xl font-bold mb-4">Editar Información</h2>
        <form onSubmit={handleUpdateInfo}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={editForm.nombre}
              onChange={handleInputChange}
              className="border rounded w-64 py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="edad" className="block text-sm font-bold mb-2">
              Edad:
            </label>
            <input
              type="text"
              id="edad"
              name="edad"
              value={editForm.edad}
              onChange={handleInputChange}
              className="border rounded w-64 py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-sm font-bold mb-2">
              Correo:
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={editForm.correo}
              onChange={handleInputChange}
              className="border rounded w-64 py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-bold mb-2">
              UserName:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={editForm.userName}
              onChange={handleInputChange}
              className="border rounded w-64 py-2 px-3"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
