import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PredictionForm from './pages/PredictionForm';
import Results from './pages/Results';
import History from './pages/History';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<PredictionForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
