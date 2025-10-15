import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WeatherApp from "./pages/Bai1/weather";
import StudentDetail from "./pages/Bai2/StudentDetail";
import StudentList from "./pages/Bai2/StudentList";
import NewsApp from "./pages/Bai3/NewsApp";
import "./App.css";
import TrangChu from "./Home";
import Navbar from "./Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<TrangChu />} />
          <Route path="/trangchu" element={<TrangChu />} />
          <Route path="/bai1" element={<WeatherApp />} />
          <Route path="/bai2" element={<StudentList />} />
          <Route path="/bai2/:id" element={<StudentDetail />} />
          <Route path="/bai3" element={<NewsApp />} />
        </Routes>
      </div>
    </Router>
  );
}
