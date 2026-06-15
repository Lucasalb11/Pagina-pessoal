import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "@/hooks/useLang";
import Index from "./pages/Index";
import ChainProjects from "./pages/ChainProjects";
import NotFound from "./pages/NotFound";

const App = () => (
  <LangProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chain/:slug" element={<ChainProjects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </LangProvider>
);

export default App;
