import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Pokemon from "./pages/Pokemon";
import ErrorPage from "./pages/ErrorPage";
import { PokemonProvider } from "./hooks/PokemonContext";
import PokemonContext from "./pages/PokemonContext";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Pokemon />} />
            <Route path="/context" element={<PokemonContext />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </PokemonProvider>
  );
}

export default App;
