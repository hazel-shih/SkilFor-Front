import Nav from "../Nav";
import Footer from "../Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../../contexts";
import { getMyUserData } from "../../WebAPI";
import { getAuthToken } from "../../utils";
import TeacherManagePage from "../../pages/TeacherManagePage";
import TeacherProfilePage from "../../pages/TeacherProfilePage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import TeacherCalendarPage from "../../pages/TeacherCalendarPage";
import FilterPage from "../../pages/FilterPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      return;
    }
    getMyUserData().then((response) => {
      if (response.success === true) {
        setUser(response.user);
      }
    });
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <>
          <Nav />
          <Routes>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/register" element={<RegisterPage />}></Route>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/filter" element={<FilterPage />}></Route>
            <Route
              path="/teacher/manage/:teacherId"
              element={<TeacherManagePage />}
            />
            <Route
              path="/teacher/profile/:teacherId"
              element={<TeacherProfilePage />}
            />
            <Route
              path="/teacher/calendar/:teacherId"
              element={<TeacherCalendarPage />}
            />
          </Routes>
          <Footer />
        </>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
