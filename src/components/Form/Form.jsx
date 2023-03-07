import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { storage, db } from "../../firebase";
import "./Form.scss";

const Form = () => {
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file.length > 0) {
      setLoading(true);
      const id = uuid();
      const storageRef = ref(storage, docName);
      const { metadata } = await uploadBytes(storageRef, file[0]);
      const docsRef = await setDoc(doc(db, "documents", id), {
        id,
        docName: metadata.name,
        name: metadata.fullPath,
        ext: file[0].name.split(".")[1],
        type: metadata.contentType,
        size: metadata.size,
        path: file[0].path,
        lastModified: metadata.updated,
        bucket: metadata.bucket,
        contentDisposition: metadata.contentDisposition,
        contentEncoding: metadata.contentEncoding,
        generation: metadata.generation,
        md5Hash: metadata.md5Hash,
        type2: metadata.type,
      });
      setDocName("");
      setFile([]);
      setLoading(false);
      Swal.fire("Documento Agregado!", "Haz click para continuar", "success");
    } else {
      Swal.fire(
        "No hay documento!",
        "Haz click para agregar un documento",
        "error"
      );
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <FaSpinner className="loader" />
        </div>
      ) : (
        <form className="Form" onSubmit={handleSubmit}>
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
              onChange={(e) => setDocName(e.target.value)}
              value={docName}
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="dropzone">
              <Dropzone
                className="dropzone"
                onDrop={(acceptedFile) => setFile(acceptedFile)}
                value={file}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <span>📂</span>
                      <p>
                        Arrastra los archivos aqui, o da click para seleccionar
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            {file.length === 1 ? (
              <div className="container d-flex gap-3">
                <p>📂</p>
                <p className="text-muted">{file[0].name}</p>
                <p className="text-muted">{file[0].type}</p>
              </div>
            ) : (
              <p>No hay archivos para subir...</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary container">
            Agregar
          </button>
        </form>
      )}
    </>
  );
};

export default Form;
