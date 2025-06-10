import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { LandingPage } from './components/landing-page';
import { VehiculesPage } from './pages/VehiculesPage';
import { MaterielsPage } from './pages/MaterielsPage';
import { PersonnelPage } from './pages/PersonnelPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { MaterialDetailPage } from './pages/MaterialDetailPage'; // Import the new MaterialDetailPage
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from './components/ui/toaster';

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLandingPage(false);
    }, 5000); // 5 seconds for landing page

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
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/vehicules" replace />} />
                <Route path="/vehicules" element={<VehiculesPage />} />
                <Route path="/vehicules/:id" element={<VehicleDetailPage />} />
                <Route path="/materiels" element={<MaterielsPage />} />
                <Route path="/materiels/:id" element={<MaterialDetailPage />} /> {/* Add new route for material details */}
                <Route path="/personnel" element={<PersonnelPage />} />
              </Route>
            </Routes>
            <Footer />
          </div>
          <Toaster />
        </Router>
      )}
    </>
  );
}

export default App;
