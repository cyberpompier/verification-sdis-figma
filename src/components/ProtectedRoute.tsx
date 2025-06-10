import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Erreur lors de la récupération de la session:', error);
        setIsAuthenticated(false);
      } else if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login'); // Rediriger vers la page de connexion si non authentifié
      }
      setLoading(false);
    };

    checkSession();

    // Écouter les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-700 text-lg">Vérification de l'authentification...</p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : null; // Rendre les enfants si authentifié, sinon rien (la redirection est gérée par navigate)
}
