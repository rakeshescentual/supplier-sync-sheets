
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "@/pages/Index";
import NewProduct from "@/pages/NewProduct";
import NewLineForm from "@/pages/NewLineForm";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1 min-h-[calc(100vh-7rem)]">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/new-line-form" element={<NewLineForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
