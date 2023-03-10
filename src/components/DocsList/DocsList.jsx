import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDocument } from "../../features/documents/documentsSlice";
import useDocuments from "../../hooks/useDocuments";
import DocsItem from "../DocsItem/DocsItem";

const DocsList = () => {
  const { docData } = useDocuments();
  const [documents, setDocuments] = useState([]);
  const docu = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addDocument(docData));
  }, []);

  useEffect(() => {
    setDocuments(docu);
  }, [docu]);

  return (
    <div className="container-md d-flex flex-wrap justify-content-center mt-5">
      {documents.map((doc) =>
        doc.map((e) => <DocsItem key={e.id} document={e} />)
      )}
    </div>
  );
};

export default DocsList;
