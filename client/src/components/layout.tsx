import { Link, useLocation } from "wouter";
import { Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/Logo.png" alt="Project Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              『HZ』┊ RICK AND MORTY
            </h1>
          </Link>

          <nav className="flex items-center gap-2">
            <Link href="/">
              <Button 
                variant={location === "/" ? "secondary" : "ghost"} 
                size="sm"
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Link href="/favorites">
              <Button 
                variant={location === "/favorites" ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Heart className="w-4 h-4 text-destructive" fill={location === "/favorites" ? "currentColor" : "none"} />
                <span className="hidden sm:inline">Favorites</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-border/40 py-8 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Rick and Morty Explorer. HΞDЯICHDΞV </p>

      </footer>
    </div>
  );
}
