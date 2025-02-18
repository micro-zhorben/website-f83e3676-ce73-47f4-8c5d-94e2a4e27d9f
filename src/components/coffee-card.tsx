import { Coffee } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CoffeeCardProps {
  name: string;
  description: string;
  roastLevel: string;
  origin: string;
  flavorNotes: string[];
  onSelect?: () => void;
}

export function CoffeeCard({
  name,
  description,
  roastLevel,
  origin,
  flavorNotes,
  onSelect,
}: CoffeeCardProps) {
  return (
    <Card className="group transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <Coffee className="h-6 w-6 text-accent" />
        </div>
        <CardDescription className="text-muted-foreground">
          {origin}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Typography.P>{description}</Typography.P>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{roastLevel} Roast</Badge>
            {flavorNotes.map((note) => (
              <Badge key={note} variant="outline" className="text-foreground">
                {note}
              </Badge>
            ))}
          </div>

          <Button
            onClick={onSelect}
            className="w-full"
            variant="default"
          >
            Select This Coffee
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}