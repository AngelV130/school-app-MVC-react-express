import { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Estado para manejar datos del formulario
    // Puedes agregar más campos según tus necesidades
    // Ejemplo:
    // field1: '',
    // field2: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    // Puedes enviar formData a tu backend o realizar acciones locales
    console.log('Formulario enviado:', formData);
    // Cerrar el modal después de enviar el formulario
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-container bg-white w-96 mx-auto  p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
        {/* <button
          onClick={onClose}
          className="modal-close absolute top-0 right-0 px-4 py-2 mt-2"
        >
          &times;
        </button> */}
        <form onSubmit={handleSubmit}>
          {/* Formulario dentro del modal */}
          {/* Ejemplo de campo de entrada */}
          <div className="mb-4">
            <label htmlFor="field1" className="block text-gray-700 text-sm font-bold mb-2">
              Campo 1:
            </label>
            <input
              type="text"
              id="field1"
              name="field1"
              value={formData.field1 || ''}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Agregar más campos según sea necesario */}
          <div className='flex justify-between'>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Enviar
          </button>

          <button
            onClick={onClose}
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Cerrar
          </button>
          </div>
        </form>
      </div>

      {/* <div className="modal-overlay inset-20 z-0 bg-black opacity-50"></div> */}
    </div>
  );
};

export default Modal;
