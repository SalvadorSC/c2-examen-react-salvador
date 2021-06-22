import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Cabecera } from "./componentes/Cabecera";
import { useState } from "react";
import { PaginaFormulario } from "./paginas/PaginaFormulario";
import { PaginaNotFound } from "./paginas/PaginaNotFound";
import { PaginaPrincipal } from "./paginas/PaginaPrincipal";

function App() {
  const [amigos, setAmigos] = useState([
    { id: 1, numero: "1000" },
    { id: 2, numero: "1001" },
  ]);
  return (
    <>
      <Router>
        <Cabecera />
        <Switch>
          <Route path="/" exact>
            <PaginaPrincipal amigos={amigos} />
          </Route>
          <Route path="/nuevo-amigo" exact>
            <PaginaFormulario amigos={amigos} />
          </Route>
          <Route path="/editar-amigo" exact>
            <PaginaFormulario amigos={amigos} />
          </Route>
          <Route path="/editar-amigo/:idAmigo" exact>
            <PaginaFormulario amigos={amigos} />
          </Route>
          <Route path="**" exact>
            <PaginaNotFound amigos={amigos} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
