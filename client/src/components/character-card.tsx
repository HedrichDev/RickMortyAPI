import { Character } from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (char: Character) => void;
}

export function CharacterCard({ character, isFavorite, onToggleFavorite }: CharacterCardProps) {
  const statusColor = {
    Alive: "bg-green-500/20 text-green-400 border-green-500/50",
    Dead: "bg-red-500/20 text-red-400 border-red-500/50",
    unknown: "bg-gray-500/20 text-gray-400 border-gray-500/50",
  }[character.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)] bg-card/50 backdrop-blur-sm border-border/50">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={character.image} 
            alt={character.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full backdrop-blur-md border-none shadow-lg hover:bg-background/80 ${isFavorite ? 'text-red-500 bg-background/80' : 'text-white/70 bg-black/30'}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(character);
              }}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
        
        <Link href={`/character/${character.id}`} className="block h-full">
          <CardContent className="p-3 md:p-4 space-y-1.5 md:space-y-2">
            <div className="flex items-center gap-2">
              <img src="/LogoOriginal.png" alt="Rick and Morty Logo" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
              <h3 className="font-display font-bold text-base md:text-lg leading-tight group-hover:text-primary transition-colors truncate">
                {character.name}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={statusColor}>
                {character.status}
              </Badge>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">
                {character.species}
              </Badge>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
