import styled from "styled-components";
import Nav from "../Nav";
import Footer from "../Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  AuthContext,
  AuthLoadingContext,
  AuthBurgerContext,
} from "../../contexts";
import { getMyUserData } from "../../WebAPI";
import { getAuthToken } from "../../utils";
import TeacherManagePage from "../../pages/TeacherManagePage";
import TeacherProfilePage from "../../pages/TeacherProfilePage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import TeacherCalendarPage from "../../pages/TeacherCalendarPage";
import FilterPage from "../../pages/FilterPage";

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-align: center;
  z-index: 10;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const token = getAuthToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    getMyUserData().then((response) => {
      setIsLoading(false);
      if (response.success === true) {
        setUser(response.user);
      }
    });
  }, []);

  const [burgerContent, setBurgerContent] = useState(false);
  const burgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (burgerRef.current && !burgerRef.current.contains(e.target)) {
        setBurgerContent(false);
      }
    };
    document
      .querySelector("#Outside")
      .addEventListener("click", handleClickOutside);
    return () => {
      document
        .querySelector("#Outside")
        .removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AuthLoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <AuthBurgerContext.Provider
          value={{ burgerRef, burgerContent, setBurgerContent }}
        >
          <Router>
            <div id="Outside">
              {!isLoading && <Nav />}
              {isLoading && <Loading>載入中...</Loading>}
              <Routes>
                <Route exact path="/login" element={<LoginPage />}></Route>
                <Route
                  exact
                  path="/register"
                  element={<RegisterPage />}
                ></Route>
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
            </div>
          </Router>
        </AuthBurgerContext.Provider>
      </AuthLoadingContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
