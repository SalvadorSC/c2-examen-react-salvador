import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const FormularioAmigos = (props) => {
  const {
    setShowFormulario,
    urlAPI,
    amigos,
    setAmigos,
    amigoParaEditar,
    setAmigoParaEditar,
    llamadaListaAmigos,
  } = props;
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [valoracion, setValoracion] = useState();
  const { fetchGlobal } = useFetch();
  const [showMensajeError, setShowMensajeError] = useState(false);

  const tratarAmigo = async (e) => {
    e.preventDefault();

    if (amigoParaEditar.id) {
      if (nombre && apellido) {
        const response = await fetchGlobal(`${urlAPI}/${amigoParaEditar.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            valoracion: valoracion,
          }),
        });
        if (response) {
          llamadaListaAmigos(urlAPI);
          setAmigoParaEditar({});
          setShowFormulario(false);
        }
      } else {
        setShowMensajeError(true);
        setTimeout(() => {
          setShowMensajeError(false);
        }, 3000);
      }
    } else {
      if (nombre && apellido) {
        const response = await fetchGlobal(urlAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            valoracion: valoracion,
          }),
        });
        if (response) {
          setAmigos([...amigos, response]);
          setShowFormulario(false);
        }
      } else {
        setShowMensajeError(true);
        setTimeout(() => {
          setShowMensajeError(false);
        }, 3000);
      }
    }
  };
  return (
    <>
      <form onSubmit={tratarAmigo}>
        <div className="row">
          <div className="col-4 ">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control campo-form-amigo"
              id="nombre"
              placeholder={
                amigoParaEditar.id ? `${amigoParaEditar.nombre}` : "Nombre"
              }
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="col-4 ">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              className="form-control campo-form-amigo"
              id="apellido"
              placeholder={
                amigoParaEditar.id ? `${amigoParaEditar.apellido}` : "Apellido"
              }
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="col-2">
            <label name="valoracion" id="valoracion" htmlFor="valoracion">
              Valoración
            </label>
            <select
              value={valoracion}
              onChange={(e) => {
                setValoracion(e.target.value);
              }}
              className="custom-select campo-form-amigo"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-2 d-flex flex-column mb-5">
            <button type="submit" className="btn boton mb-1">
              {amigoParaEditar.id ? "Modificar" : "Crear"}
            </button>
            <button
              className="btn boton"
              onClick={() => {
                setShowFormulario(false);
                setAmigoParaEditar({});
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
      {showMensajeError && (
        <p className="mensaje-error mb-5">Porfa completa todos los campos!</p>
      )}
    </>
  );
};
