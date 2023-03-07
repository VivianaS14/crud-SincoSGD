import React from "react";
import DocsList from "./components/DocsList/DocsList";
import Filters from "./components/Filters/Filters";
import Form from "./components/Form/Form";

const App = () => {
  return (
    <div className="App w-50 m-auto pt-5">
      <h2 className="text-center pb-4">Agrega un documento</h2>
      <Form />
      <h2 className="text-center pt-5 pb-5">Lista de Documentos</h2>
      <Filters />
      <DocsList />
    </div>
  );
};

export default App;
