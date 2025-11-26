import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assess from "./pages/Assess";
import Doctors from "./pages/Doctors";
import Consult from "./pages/Consult";
import Ambulance from "./pages/Ambulance";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/assess" element={<Assess />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/consult" element={<Consult />} />
      <Route path="/ambulance" element={<Ambulance />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
