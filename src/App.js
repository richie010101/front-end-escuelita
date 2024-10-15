
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AltaAlumno from './views/altaAlumno';
import Baja from './views/baja';
import VerAlumno from './views/verAlumnos';
import Modificar from './views/ModificarDatos';
import Home from './views/home';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Alta" component={AltaAlumno} />
        <Route path="/Baja" component={Baja} />
        <Route path="/Ver" component={VerAlumno} />
        <Route path="/Modificar" component={Modificar} />
      </Switch>
    </Router>
  );
}

export default App;
