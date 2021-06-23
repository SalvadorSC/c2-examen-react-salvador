import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { Cabecera } from "./componentes/Cabecera";
import { useState, useEffect } from "react";
import { PaginaPrincipal } from "./paginas/PaginaPrincipal";
import { DatosAmigosContext } from "./contexts/DatosAmigosContext";
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
          <DatosAmigosContext.Provider
            value={{
              urlAPI,
              amigos,
              editarAmigo,
              llamadaListaAmigos,
              setShowFormulario,
              showFormulario,
            }}
          >
            <Cabecera
              nAmigos={nAmigos}
              setAmigos={setAmigos}
              amigoParaEditar={amigoParaEditar}
              setAmigoParaEditar={setAmigoParaEditar}
            />
            <Switch>
              <Route path="/" exact>
                <Redirect to="/principal" />
              </Route>
              <Route path="/principal" exact>
                <PaginaPrincipal />
              </Route>
            </Switch>
          </DatosAmigosContext.Provider>
        </div>
      </Router>
    </>
  );
}

export default App;
