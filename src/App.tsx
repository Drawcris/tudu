import TodoApp from "./components/TodoApp";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Credits from "./pages/Credits.tsx";

function App() {
  return (
  <>
    

    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}


export default App;