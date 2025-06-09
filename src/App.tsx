import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { LandingPage } from './components/landing-page';
import { VehiculesPage } from './pages/VehiculesPage';
import { MaterielsPage } from './pages/MaterielsPage';
import { PersonnelPage } from './pages/PersonnelPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage'; // Import the new page

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLandingPage(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLandingPage ? (
        <LandingPage />
      ) : (
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/vehicules" replace />} />
              <Route path="/vehicules" element={<VehiculesPage />} />
              <Route path="/materiels" element={<MaterielsPage />} />
              <Route path="/personnel" element={<PersonnelPage />} />
              <Route path="/vehicules/:id" element={<VehicleDetailPage />} /> {/* Add the new route with ID */}
            </Routes>
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
