import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AddCustomer from "./components/AddCustomer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllCustomer from "./components/AllCustomer";
import EditCustomer from "./components/EditCustomer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Home />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AllCustomer />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/customer" element={<EditCustomer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
