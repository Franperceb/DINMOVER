import { Routes } from "../models/routes.models";
import { Navigator } from "../components";

function App() {
  return (
    <div>
      <h1>Sistema Administrativo DINMOVER</h1>
      <h1 className="m-2 text-4xl font-bold text-cyan-500">
        With Tailwind CSS
      </h1>

      <Navigator pathNames={[Routes.HOME, Routes.PROPERTIES, Routes.USERS]} />
    </div>
  );
}

export default App;
