import Nav from "../Nav";
import Footer from "../Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route exact path="/"></Route>
          <Route path="/login"></Route>
          <Route path="/register"></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
