import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDocuments from "../../hooks/useDocuments";
import DocsItem from "../DocsItem/DocsItem";

const DocsList = () => {
  const { docData } = useDocuments();
  const [documents, setDocuments] = useState([]);
  const docu = useSelector((state) => state.documents);

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
