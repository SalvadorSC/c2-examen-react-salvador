import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { Cabecera } from "./componentes/Cabecera";
import { useState, useEffect } from "react";
import { PaginaFormulario } from "./paginas/PaginaFormulario";
import { PaginaNotFound } from "./paginas/PaginaNotFound";
import { PaginaPrincipal } from "./paginas/PaginaPrincipal";

function App() {
  const [amigos, setAmigos] = useState([]);
  const urlAPI = "http://localhost:3001/amigos";
  const [nAmigos, setNAmigos] = useState(amigos.length);

  const [amigoParaEditar, setAmigoParaEditar] = useState({});

  const llamadaListaAmigos = async (urlAPI) => {
    const response = await fetch(urlAPI);
    const amigos = await response.json();
    setAmigos(amigos);
  };
  useEffect(() => {
    llamadaListaAmigos(urlAPI);
  }, []);

  useEffect(() => {
    setNAmigos(amigos.length);
  }, [amigos]);
  const [showFormulario, setShowFormulario] = useState(false);

  const editarAmigo = (id) => {
    setShowFormulario(true);
    setAmigoParaEditar(
      amigos.find((amigo) => {
        return amigo.id === parseInt(id);
      })
    );
  };

  return (
    <>
      <Router>
        <div className="container">
          <Cabecera
            nAmigos={nAmigos}
            showFormulario={showFormulario}
            setShowFormulario={setShowFormulario}
            urlAPI={urlAPI}
            amigos={amigos}
            setAmigos={setAmigos}
            editarAmigo={editarAmigo}
            amigoParaEditar={amigoParaEditar}
            setAmigoParaEditar={setAmigoParaEditar}
            llamadaListaAmigos={llamadaListaAmigos}
          />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/principal" />
            </Route>
            <Route path="/principal" exact>
              <PaginaPrincipal
                amigos={amigos}
                showFormulario={showFormulario}
                setShowFormulario={setShowFormulario}
                urlAPI={urlAPI}
                llamadaListaAmigos={llamadaListaAmigos}
                editarAmigo={editarAmigo}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
