
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes.jsx";
import Whatsapp from "@/Components/Contacts/WhatsappLogo.jsx"


function App() {
  return (
    <>
    <Router>
      <AppRoutes />
      <Whatsapp/>
    </Router>
    </>
  )
}

export default App
