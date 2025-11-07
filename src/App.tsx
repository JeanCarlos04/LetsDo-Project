import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import "./styles/animations.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Notifications = lazy(() => import("./components/Notifications"));
const SectionTasks = lazy(() => import("./components/SectionTasks"));

function App() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Let's Do | Home";
        break;
      case "/login":
        document.title = "Let's Do | Log in";
        break;
      case "/register":
        document.title = "Let's Do | Register";
        break;
      case "/notifications":
        document.title = "Let's Do | Notifications";
        break;
    }
  }, [location.pathname]);

  return (
    <Suspense fallback={<div>Error...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/section/:id" element={<SectionTasks />} />
      </Routes>
    </Suspense>
  );
}

export default App;
