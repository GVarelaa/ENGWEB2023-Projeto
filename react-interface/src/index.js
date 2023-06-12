import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import RouterGuard from "./components/RouterGuard"
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<RouterGuard> <NavBar></NavBar> </RouterGuard>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NoPage/>}/>  // Proteger esta merda
        </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);