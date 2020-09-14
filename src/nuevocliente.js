import React, { useState } from "react";
import Layout from "./components/Layout";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import Swal from "sweetalert2";

function NuevoCliente({
  postData,
  putData,
  returnTable,
  editClient,
  commentsUpdate,
}) {
  const [mensaje, guardarMensaje] = useState(null);
  const [startDate, setStartDate] = useState(new Date());


  const formik = useFormik({
    initialValues: {
      id: editClient ? commentsUpdate.id : "",
      titulo: editClient ? commentsUpdate.titulo : "",
      creador: editClient ? commentsUpdate.creador : "",
      texto: editClient ? commentsUpdate.texto : "",
      fechaCreacion: editClient ? commentsUpdate.fechaCreacion : startDate
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required("El titulo es obligatorio"),
      creador: Yup.string().required("El creador es obligatorio"),
      texto: Yup.string().required("El campo texto  es obligatorio"),
    }),
    onSubmit: (valores) => {
      valores.fechaCreacion = startDate;
      if (editClient) {
        putData(valores);
        Swal.fire(
            'Actualizado',
            'El comentario se actualizó correctamente',
            'success'
        )
      } else {
        postData(valores);
        Swal.fire(
            'Registrado',
            'El comentario se registró correctamente',
            'success'
        )
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Comentario</h1>

      {mensaje && mostrarMensaje()}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="titulo"
              >
                Titulo
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="titulo"
                type="text"
                placeholder="Titulo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.titulo}
              />
            </div>

            {formik.touched.titulo && formik.errors.titulo ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.titulo}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="creador"
              >
                Creador
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="creador"
                type="text"
                placeholder="Creador"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.creador}
              />
            </div>

            {formik.touched.creador && formik.errors.creador ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.creador}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="texto"
              >
                Texto
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="texto"
                type="text"
                placeholder="Texto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.texto}
              />
            </div>

            {formik.touched.texto && formik.errors.texto ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.texto}</p>
              </div>
            ) : null}

            <div className="mb-4 border-black">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaCreacion">
                                    Fecha Creacion
                                </label>
                                <DatePicker
                                    className="border-black"
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value= {!editClient ? "Registrar Comentario" : "Editar Comentario"}
            />
            <button
              className="bg-red-500 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              onClick={() => returnTable()}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NuevoCliente;
