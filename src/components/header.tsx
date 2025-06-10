import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } else {
      navigate('/login'); // Rediriger vers la page de connexion après déconnexion
    }
  };

  const navLinks = [
    { path: '/vehicules', name: 'Véhicules' },
    { path: '/materiels', name: 'Matériels' },
    { path: '/personnel', name: 'Personnel' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/vehicules" className="text-2xl font-bold text-red-600">SDIS</Link>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-lg font-medium transition-colors hover:text-red-600 ${
                activeLink === link.path ? 'text-red-600' : 'text-gray-700'
              }`}
            >
              {link.name}
              {activeLink === link.path && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-0.5 bg-red-600 w-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
      {isLoggedIn ? (
        <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
          Déconnexion
        </Button>
      ) : (
        <Link to="/login">
          <Button variant="default" className="bg-red-600 hover:bg-red-700">
            Connexion
          </Button>
        </Link>
      )}
    </header>
  );
}
