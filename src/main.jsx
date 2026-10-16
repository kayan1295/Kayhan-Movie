import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Login.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Dashboard from "./components/Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/watching" element={<Dashboard />} />
      <Route path="/dashboard/my-list" element={<Dashboard />} />
      <Route path="/dashboard/history" element={<Dashboard />} />
      <Route path="/dashboard/favorites" element={<Dashboard />} />
      <Route path="/dashboard/subscription" element={<Dashboard />} />
      <Route path="/dashboard/devices" element={<Dashboard />} />
      <Route path="/dashboard/notifications" element={<Dashboard />} />
      <Route path="/dashboard/settings" element={<Dashboard />} />
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-black text-red-500"> 404 </h1>
              <p className="mt-4 text-zinc-400"> Page not found </p>
            </div>
          </div>
        }
      />
    </Routes>
  </BrowserRouter>,
);
