import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import UserRouter from "./Router/UserRouter";
import AdminRouter from "./Router/AdminRouter";
import VendorRouter from "./Router/VendorRouter";

function App() {
 
  return (
   <div>
    <Router>
      <Routes>
        <Route path="/*" element={<UserRouter/>} />
        <Route path="/admin/*" element={<AdminRouter/>}/>
        <Route path="/vendor/*" element={<VendorRouter/>}/>
      </Routes>
    </Router>
   </div>
  )
}

export default App
