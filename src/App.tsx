import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
   <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <PublicRoute><LoginPage /></PublicRoute> } />
        <Route path="/" element={ <PrivateRoute><HomePage /></PrivateRoute> } />
      </Routes>
    </BrowserRouter>
   </AuthProvider>
  )
}

export default App
