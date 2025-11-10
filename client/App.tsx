import "./global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assess from "./pages/Assess";
import Doctors from "./pages/Doctors";
import Ambulance from "./pages/Ambulance";
import Consult from "./pages/Consult";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assess" element={<Assess />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/reports" element={<Reports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
