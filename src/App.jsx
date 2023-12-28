import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";
import DashboardPage from "./pages/DashboardPage";
import LocationsPage from "./components/LocationsComponent/LocationsPage";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard/:sub_page?" element={<DashboardPage />} />
            <Route
              path="/dashboard/:sub_page/:action"
              element={<DashboardPage />}
            />
            <Route
              path="/dashboard/locations/:id"
              element={<LocationsPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
