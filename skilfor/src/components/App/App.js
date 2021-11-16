import Nav from "../Nav";
import Footer from "../Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/login"></Route>
          <Route path="/register"></Route>
          <Route path="/"></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
