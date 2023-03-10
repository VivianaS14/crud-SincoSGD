import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  ref,
  deleteObject,
  getMetadata,
  updateMetadata,
} from "firebase/storage";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { storage, db } from "../../firebase";

const DocsItem = ({ document }) => {
  const { docName, ext, lastModified, name, path, type, id } = document;
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const forestRef = ref(storage, docName);
    getMetadata(forestRef).then((metadata) => setFile(metadata));
    setNewName(docName);
  }, []);

  const handleDelete = async () => {
    const desertRef = ref(storage, docName);
    const res = await deleteObject(desertRef);
    const resDatabase = await deleteDoc(doc(db, "documents", id));
    console.log(res, resDatabase);
    Swal.fire("Documento Eliminado!", "Haz click para continuar!", "success");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const storageRef = ref(storage, docName);
    const newMetadata = {
      fullPath: newName,
      name: newName,
    };
    const newData = await updateMetadata(storageRef, newMetadata);
    console.log(newData);
    const docsRef = await updateDoc(doc(db, "documents", id), {
      docName: newData.name,
      name: newData.fullPath,
      lastModified: newData.updated,
    });
    console.log(docsRef);
    setIsEdit(false);
    setLoading(false);
    Swal.fire("Documento Modificado!", "Haz click para continuar", "success");
  };

  return (
    <>
      <div className="card w-75 m-2 text-center">
        <h5 className="card-header">{docName}</h5>
        <div className="card-body">
          <p className="card-text">{path}</p>
          <p className="card-text">Extensión: {ext}</p>
          <div className="d-flex justify-content-evenly flex-wrap">
            <p className="card-text text-muted">{lastModified}</p>
            <p className="card-text text-muted">Tipo: {type}</p>
          </div>
          <div className="d-flex justify-content-evenly flex-wrap">
            <button
              type="button"
              className={`btn ${
                isEdit ? "btn-danger" : "btn-success"
              } w-25 mb-3`}
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "Cerrar" : "Editar"}
            </button>

            {isEdit && (
              <form key={id} className="Form w-100" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Nombre
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Calculo - Actividad 1"
                    aria-label="Nombre"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
                  />
                </div>

                <div className="container d-flex gap-3 ">
                  <p>📂</p>
                  <p className="text-muted">{file.name}</p>
                  <p className="text-muted">{file.contentType}</p>
                </div>

                <button
                  type="submit"
                  className="btn btn-success container mb-3"
                >
                  Modificar
                </button>
              </form>
            )}

            <button
              type="button"
              className="btn btn-danger w-25 mb-3"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocsItem;
