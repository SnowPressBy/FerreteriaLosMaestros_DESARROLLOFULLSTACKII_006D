import './App.css';

function App() {
  const nombre = 'Camila Rojas';
  const carrera = 'Analista Programador';
  const anioIngreso = 2024;

  return (
    <div className="biografia">
      <h1>Hola, soy {nombre}</h1>
      <p>Estudio {carrera} en Duoc UC desde el {anioIngreso}.</p>
    </div>
  );
}

export default App;