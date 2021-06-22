import { useState } from "react";
import { useHistory } from "react-router-dom";

export const PaginaPrincipal = (props) => {
  const history = useHistory();
  const { amigos } = props;

  const editarAmigo = (id) => {
    history.push(`/editar-amigo/${id}`);
  };
  return (
    <>
      <h2>Listado de facturas</h2>
      <ul>
        {amigos.map((amigo) => (
          <li key={amigo.id} onClick={() => editarAmigo(amigo.id)}>
            {amigo.numero}
          </li>
        ))}
      </ul>
    </>
  );
};
