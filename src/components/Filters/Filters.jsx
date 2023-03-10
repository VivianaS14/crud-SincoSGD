import React, { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../../features/search/searchSlice";
import useDocuments from "../../hooks/useDocuments";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { addDocument } from "../../features/documents/documentsSlice";

const Filters = () => {
  const { docData } = useDocuments();
  const [ext, setExt] = useState([]);
  const searchValue = useSelector((state) => state.search.search);
  const dispatch = useDispatch();

  useEffect(() => {
    setExt([...new Set(docData.map((doc) => doc.ext))]);
  }, [docData]);

  const handelChange = (e) => {
    dispatch(addSearch(e.target.value));
  };

  const handleFilter = (param, search) => {
    console.log(param, search);
    const q = query(collection(db, "documents"), where(param, "==", search));
    onSnapshot(q, (snapshot) =>
      dispatch(addDocument(snapshot.docs.map((doc) => doc.data())))
    );
    dispatch(addSearch(""));
  };

  const getAll = () => {
    dispatch(addDocument(docData));
  };

  return (
    <>
      <div className="row g-3 d-flex justify-content-center">
        <div className="col-auto">
          <input
            type="text"
            id="searchName"
            className="form-control"
            placeholder="Buscar por nombre..."
            onChange={(e) => handelChange(e)}
            value={searchValue}
          />
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-info"
            onClick={() => handleFilter("docName", searchValue)}
          >
            Buscar
          </button>
        </div>
        <div className="dropdown col-auto">
          <button
            className="btn btn-info dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filtrar Tipo
          </button>
          <ul className="dropdown-menu">
            {ext ? (
              ext.map((e, i) => (
                <li
                  key={i}
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFilter("ext", e)}
                >
                  {e}
                </li>
              ))
            ) : (
              <li className="dropdown-item" style={{ cursor: "pointer" }}>
                Tipo de Documento
              </li>
            )}
          </ul>
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-light" onClick={getAll}>
            Todos <IoReload />
          </button>
        </div>
      </div>
    </>
  );
};

export default Filters;
