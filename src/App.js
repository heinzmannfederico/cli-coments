import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Cliente from "./components/Cliente";
import NuevoCliente from "./nuevocliente";
import axios from "axios";

function App() {
  const URI = "https://localhost:44335/api/comentario";
  const [data, setData] = useState([]);
  const [newClient, setNewClient] = useState(false);
  const [editClient, setEditClient] = useState(false);
  const [commentsUpdate, setCommentsUpdate] = useState({
    id: "",
    titulo: "",
    creador: "",
    texto: "",
    fechaCreacion: "",
  });

  const getData = async () => {
    await axios
      .get(URI)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postData = async (val) => {
    delete val.id;
    await axios
      .post(URI, val)
      .then((response) => {
        setData(data.concat(response.data));
      })
      .catch((err) => {
        console.log("err", err);
      });
    returnTable();
  };
  const putData = async (val) => {
    await axios
      .put(URI + "/" + val.id, val)
      .then((response) => {
        const resp = response.data;
        data.map((cd) => {
          if (cd.id === val.id) {
            cd.titulo = resp.titulo;
            cd.creador = resp.creador;
            cd.texto = resp.texto;
            cd.fechaCreacion = resp.fechaCreacion;
          }
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
    returnTable();
  };

  const deleteData = async (val) => {
    await axios
      .delete(URI + "/" + val)
      .then((response) => {
        setData(data.filter((c) => c.id !== response.data.id));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const editComment = (c) => {
    setEditClient(true);
    setCommentsUpdate({
      id: c.id,
      titulo: c.titulo,
      creador: c.creador,
      texto: c.texto,
      fechaCreacion: c.fechaCreacion,
    });
  };
  const returnTable = () => {
    setNewClient(false);
    setEditClient(false);
  };

  if (newClient || editClient) {
    return (
      <NuevoCliente
        postData={postData}
        putData={putData}
        returnTable={returnTable}
        editClient={editClient}
        commentsUpdate={commentsUpdate}
      />
    );
  } else {
    return (
      <div>
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Comentarios</h1>
          <div>
            <button
              onClick={() => setNewClient(true)}
              className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center"
            >
              Nuevo Comentario
            </button>
          </div>

          <div className="overflow-x-scroll">
            <table className="table-auto shadow-md mt-10 w-full w-lg">
              <thead className="bg-gray-800">
                <tr className="text-white">
                  <th className="w-1/6 py-2">Nombre</th>
                  <th className="w-1/6 py-2">Creador</th>
                  <th className="w-1/6 py-2">Fecha Creacion</th>
                  <th className="w-1/6 py-2">Texto</th>
                  <th className="w-1/6 py-2">Editar</th>
                  <th className="w-1/6 py-2">Eliminar</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {data.map((cliente, idx) => (
                  <Cliente
                    key={idx}
                    cliente={cliente}
                    deleteData={deleteData}
                    editComment={editComment}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Layout>
      </div>
    );
  }
}

export default App;
