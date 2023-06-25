import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NoPage from "./pages/NoPage"
import Home from "./pages/Home"
import Record from "./pages/Record"
import Insert from "./pages/Insert"
import Profile from "./pages/Profile"
import Favorites from "./pages/Favorites"
import Descricao from "./pages/Descricao"
import RouterGuard from "./components/RouterGuard"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<RouterGuard> <Profile/> </RouterGuard>}/>
          <Route path="/favorites" element={<RouterGuard> <Favorites/> </RouterGuard>}/>
          <Route path="/" element={<RouterGuard> <Home/> </RouterGuard>}/>
          <Route path="/descricoes" element={<RouterGuard> <Descricao/> </RouterGuard>}/>
          <Route path="/:id" element={<RouterGuard> <Record/> </RouterGuard>}/>
          <Route path="/insert" element={<RouterGuard> <Insert/> </RouterGuard>}/>
          <Route path="*" element={<NoPage/>}/>  // Proteger esta merda
        </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)