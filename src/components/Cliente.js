import React from "react";
import Swal from "sweetalert2";
import moment from "moment";

const Cliente = ({ cliente, deleteData, editComment }) => {
  const { id, titulo, creador, fechaCreacion, texto } = cliente;

  // Elimina un cliente
  const confirmarEliminarCliente = () => {
    Swal.fire({
      title: "¿Deseas eliminar este comentario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.value) {
        await deleteData(id);
        Swal.fire("Eliminado!", titulo, "success");
      }
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">{titulo}</td>
      <td className="border px-4 py-2">{creador}</td>
      <td className="border px-4 py-2">{moment(fechaCreacion).format("DD/MM/YYYY")}</td>
      <td className="border px-4 py-2">{texto}</td>

      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => editComment(cliente)}
        >
          Editar
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4 ml-2"
          >
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmarEliminarCliente()}
        >
          Eliminar
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4 ml-2"
          >
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
