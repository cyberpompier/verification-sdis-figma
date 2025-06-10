import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { MenuIcon, XIcon } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);

    // Fermer le menu mobile lors de la navigation
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

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
  }, [location.pathname, isMobileMenuOpen]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } else {
      navigate('/login');
    }
  };

  const navLinks = [
    { path: '/vehicules', name: 'Véhicules' },
    { path: '/materiels', name: 'Matériels' },
    { path: '/personnel', name: 'Personnel' },
    { path: '/scan', name: 'Scan' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/vehicules" className="text-2xl font-bold text-red-600">SDIS</Link>
        {/* Navigation pour les écrans de bureau */}
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

      {/* Boutons de connexion/déconnexion et icône de menu pour mobile */}
      <div className="flex items-center space-x-4">
        {/* Bouton de connexion/déconnexion pour mobile (visible sur mobile, caché sur desktop) */}
        <div className="md:hidden">
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
        </div>
        {/* Icône de bascule du menu mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log('Hamburger button clicked!'); // Log pour le débogage
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          className="md:hidden text-gray-700 hover:bg-gray-100 bg-gray-200 border border-gray-300" // Ajout de bg-gray-200 et border pour la visibilité
        >
          {isMobileMenuOpen ? <XIcon className="h-6 w-6 text-gray-800" /> : <MenuIcon className="h-6 w-6 text-gray-800" />} {/* Couleur d'icône plus contrastée */}
        </Button>
      </div>

      {/* Bouton de connexion/déconnexion pour desktop (visible sur desktop, caché sur mobile) */}
      <div className="hidden md:block">
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
      </div>

      {/* Menu mobile en superposition */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }} // Commence à droite, glisse vers la gauche
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }} // Glisse vers la droite pour sortir
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 bg-white z-[51] flex flex-col items-center justify-center space-y-8 md:hidden" // Z-index augmenté à z-[51]
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-700 hover:bg-gray-100"
            >
              <XIcon className="h-8 w-8" /> {/* Icône X plus grande pour fermer le menu mobile */}
            </Button>

            <nav className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-3xl font-bold transition-colors ${
                    activeLink === link.path ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // Fermer le menu au clic sur un lien
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              {isLoggedIn ? (
                <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 text-xl px-6 py-3">
                  Déconnexion
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="default" className="bg-red-600 hover:bg-red-700 text-xl px-6 py-3">
                    Connexion
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
