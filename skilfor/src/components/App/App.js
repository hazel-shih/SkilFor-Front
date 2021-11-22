import Nav from "../Nav";
import Footer from "../Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherManagePage from "../../pages/TeacherManagePage";
import TeacherProfilePage from "../../pages/TeacherProfilePage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

function App() {
  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/register"></Route>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route
            path="/teacher/manage/:teacherId"
            element={<TeacherManagePage />}
          />
          <Route
            path="/teacher/profile/:teacherId"
            element={<TeacherProfilePage />}
          />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
