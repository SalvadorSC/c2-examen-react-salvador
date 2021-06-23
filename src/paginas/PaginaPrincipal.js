import { useFetch } from "../hooks/useFetch";
import { useContext } from "react";
import { DatosAmigosContext } from "../contexts/DatosAmigosContext";

import { FaStar, FaPencilAlt, FaTimes } from "react-icons/fa";

export const PaginaPrincipal = () => {
  const { urlAPI, amigos, editarAmigo, llamadaListaAmigos } =
    useContext(DatosAmigosContext);
  const { fetchGlobal, error } = useFetch();

  const valoracionEstrellas = (valoracion) => {
    const estrellas = [];
    for (let i = 0; i < valoracion; i++) {
      estrellas.push(<FaStar />);
    }
    return estrellas;
  };
  const borrar = async (id) => {
    const response = await fetchGlobal(`${urlAPI}/${id}`, {
      method: "DELETE",
    });
    if (response) {
      llamadaListaAmigos(urlAPI);
    }
  };
  return (
    <>
      <ul className="pl-0 row">
        {amigos.map((amigo) => (
          <li key={amigo.id} className="col-4 list-unstyled">
            <ul className="list-unstyled targeta-amigo mb-3 p-4 d-flex justify-content-between">
              <div className="d-flex flex-column justify-content-around">
                <li>Nombre: {amigo.nombre}</li>
                <li>Apellido: {amigo.apellido}</li>
                <li>
                  Valoracion:{" "}
                  {valoracionEstrellas(amigo.valoracion).map(
                    (estrella) => estrella
                  )}
                </li>
              </div>
              <div className="btns-control-amigo">
                <FaPencilAlt
                  className="mr-2 btn-control-amigo "
                  onClick={() => editarAmigo(amigo.id)}
                />
                <FaTimes onClick={() => borrar(amigo.id)} />
              </div>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};
