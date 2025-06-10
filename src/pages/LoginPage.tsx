import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({
        title: 'Erreur de connexion',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Connexion réussie',
        description: 'Vous êtes maintenant connecté.',
      });
      navigate('/vehicules'); // Rediriger vers la page des véhicules après connexion
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Désactiver la confirmation par email pour simplifier
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin, // Rediriger vers l'origine après inscription
        data: {
          // Vous pouvez ajouter des données supplémentaires ici si nécessaire
        }
      }
    });

    if (error) {
      toast({
        title: 'Erreur d\'inscription',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Inscription réussie',
        description: 'Votre compte a été créé. Vous pouvez maintenant vous connecter.',
      });
      // Après l'inscription, l'utilisateur doit se connecter
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Connexion / Inscription</h2>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button type="submit" onClick={handleLogin} disabled={loading} className="w-full">
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
            <Button type="submit" onClick={handleSignUp} disabled={loading} variant="outline" className="w-full">
              {loading ? 'Inscription en cours...' : 'S\'inscrire'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
