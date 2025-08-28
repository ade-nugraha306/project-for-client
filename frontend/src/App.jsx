import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Review from "./Components/Review";
import Footer from "./Components/Footer";
import AdminDashboard from "./Components/AdminDashboard"; // pastikan path sesuai
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
        <Header setSearchTerm={setSearchTerm} />
      <Routes>
        {/* Halaman utama */}
        <Route
          path="/"
          element={
            <>
              <Hero searchTerm={searchTerm} />
              <Review />
              <Footer />
            </>
          }
        />

        {/* Halaman admin dashboard */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* Halaman review */}
        <Route
          path="/reviews"
          element={<Review />}
        />
      </Routes>
    </Router>
  );
}

export default App;
