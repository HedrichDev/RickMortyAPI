import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function SearchBar({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  return (
    <div className="relative max-w-md w-full mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search characters..."
        className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50 transition-all h-12 text-lg"
      />
    </div>
  );
}
