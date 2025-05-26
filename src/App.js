import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import JobApplication from './pages/JobApplication';
import JobReferral from './pages/JobReferral';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content" style={{ paddingTop: 150 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/jobs/:id/apply" element={<JobApplication />} />
            <Route path="/jobs/:id/refer" element={<JobReferral />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 