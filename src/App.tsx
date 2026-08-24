import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home";
import Map from "./pages/map";
import About from "./pages/about/About";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="map" element={<Map />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
