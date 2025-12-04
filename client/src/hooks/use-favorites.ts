import { useState, useEffect } from 'react';
import { Character } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('rick-morty-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  const toggleFavorite = (character: Character) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.id === character.id);
      let newFavs;
      if (isFav) {
        newFavs = prev.filter(f => f.id !== character.id);
        toast({
          title: "Removed from favorites",
          description: `${character.name} has been removed from your favorites.`
        });
      } else {
        newFavs = [...prev, character];
        toast({
          title: "Added to favorites",
          description: `${character.name} has been added to your favorites.`
        });
      }
      localStorage.setItem('rick-morty-favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (id: number) => favorites.some(f => f.id === id);

  return { favorites, toggleFavorite, isFavorite };
}
