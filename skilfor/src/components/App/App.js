import Nav from "../Nav";
import Footer from "../Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherManagePage from "../../pages/TeacherManagePage";

function App() {
  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route exact path="/login"></Route>
          <Route exact path="/register"></Route>
          <Route exact path="/"></Route>
          <Route
            path="/teacher/manage/:teacherId"
            element={<TeacherManagePage />}
          />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
