import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Typography } from "@/components/ui/typography";
import { PreferenceForm } from "@/components/preference-form";
import { CoffeeCard } from "@/components/coffee-card";
import { RecommendationSkeleton } from "@/components/recommendation-skeleton";
import { Coffee } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock data for demonstration
const mockRecommendations = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "A bright, complex coffee with floral notes and citrus undertones. Perfect for those who appreciate a lighter, more nuanced cup.",
    roastLevel: "Light",
    origin: "Ethiopia",
    flavorNotes: ["Floral", "Citrus", "Bergamot"],
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "A well-balanced coffee with caramel sweetness and nutty undertones. Medium roasted to perfection.",
    roastLevel: "Medium",
    origin: "Colombia",
    flavorNotes: ["Caramel", "Nutty", "Chocolate"],
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    description: "A full-bodied, dark roasted coffee with earthy notes and a smooth finish. Ideal for those who love bold flavors.",
    roastLevel: "Dark",
    origin: "Indonesia",
    flavorNotes: ["Earthy", "Spicy", "Dark Chocolate"],
  },
];

export function Home() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<typeof mockRecommendations>([]);

  const handlePreferenceSubmit = async (values: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRecommendations(mockRecommendations);
    setLoading(false);
  };

  const handleSelectCoffee = (coffee: typeof mockRecommendations[0]) => {
    toast({
      title: "Coffee Selected!",
      description: `You've selected ${coffee.name}. Great choice!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-accent" />
            <Typography.H3>AI Coffee Recommender</Typography.H3>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <Typography.H1 className="mb-4">
            Find Your Perfect Coffee Match
          </Typography.H1>
          <Typography.Lead className="mb-8">
            Tell us your preferences, and our AI will recommend the perfect coffee for you.
          </Typography.Lead>
        </div>

        <div className="mx-auto mb-12 max-w-xl">
          <PreferenceForm onSubmit={handlePreferenceSubmit} />
        </div>

        {loading ? (
          <RecommendationSkeleton />
        ) : recommendations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                {...coffee}
                onSelect={() => handleSelectCoffee(coffee)}
              />
            ))}
          </div>
        ) : null}
      </main>

      <footer className="mt-auto border-t">
        <div className="container mx-auto px-4 py-6 text-center">
          <Typography.Small className="text-muted-foreground">
            © 2024 AI Coffee Recommender. All rights reserved.
          </Typography.Small>
        </div>
      </footer>
    </div>
  );
}