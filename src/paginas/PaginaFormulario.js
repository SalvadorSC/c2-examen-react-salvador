import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const PaginaFormulario = (props) => {
  const { amigos } = props;
  const { idAmigo } = useParams();
  const accion = idAmigo ? "editar" : "crear";
  const [amigoSelected, setAmigoSelected] = useState(
    amigos.find((amigo) => {
      return amigo.id === parseInt(idAmigo);
    })
  );
  useEffect(() => {
    console.log(amigoSelected);
  }, [amigoSelected]);
  const [numero, setNumero] = useState(idAmigo ? amigoSelected.numero : "");
  return (
    <>
      <h2>Formulario para {accion} amigo</h2>
      <form noValidate>
        <label htmlFor="numero">Número:</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </form>
    </>
  );
};
