import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-red-600 text-white p-4 z-50 shadow-md flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-white text-red-600 hover:bg-gray-100 px-4 py-2 rounded-md font-bold flex items-center gap-2">
            <MenuIcon className="h-5 w-5" />
            MENU
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/vehicules">Véhicules</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/materiels">Matériels</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/personnel">Personnel</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <h1 className="text-xl font-bold hidden sm:block">Véhicules d'Intervention</h1>
      <div className="w-24"></div> {/* Placeholder for balance */}
    </header>
  );
}
