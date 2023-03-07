import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";

const useDocuments = () => {
  const [docData, setDocData] = useState([]);

  const getData = () =>
    onSnapshot(collection(db, "documents"), (snapshot) =>
      setDocData(snapshot.docs.map((doc) => doc.data()))
    );

  useEffect(() => {
    getData();
  }, []);

  return { docData, getData, setDocData };
};

export default useDocuments;
