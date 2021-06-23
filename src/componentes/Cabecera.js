import { useContext } from "react";
import { DatosAmigosContext } from "../contexts/DatosAmigosContext";
import { FormularioAmigos } from "./FormularioAmigos";

export const Cabecera = (props) => {
  const { nAmigos, setAmigos, amigoParaEditar, setAmigoParaEditar } = props;
  const {
    urlAPI,
    amigos,
    editarAmigo,
    llamadaListaAmigos,
    setShowFormulario,
    showFormulario,
  } = useContext(DatosAmigosContext);
  return (
    <>
      <header className="cabecera d-flex justify-content-between align-items-center my-5">
        <h1>Gestión de mis {nAmigos} amigos</h1>
      </header>
      {showFormulario ? (
        <FormularioAmigos
          showFormulario={showFormulario}
          setShowFormulario={setShowFormulario}
          urlAPI={urlAPI}
          amigos={amigos}
          amigoParaEditar={amigoParaEditar}
          setAmigos={setAmigos}
          editarAmigo={editarAmigo}
          setAmigoParaEditar={setAmigoParaEditar}
          llamadaListaAmigos={llamadaListaAmigos}
        />
      ) : (
        <button
          className="btn boton mb-5"
          onClick={() => setShowFormulario(!showFormulario)}
        >
          Crear Amigo
        </button>
      )}
    </>
  );
};
