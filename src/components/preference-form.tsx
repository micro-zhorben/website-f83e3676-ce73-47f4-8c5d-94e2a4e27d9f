import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Typography } from "@/components/ui/typography";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  roastLevel: z.string(),
  flavorIntensity: z.number().min(1).max(5),
  brewMethod: z.string(),
});

interface PreferenceFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export function PreferenceForm({ onSubmit }: PreferenceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roastLevel: "",
      flavorIntensity: 3,
      brewMethod: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Typography.H2>Coffee Preferences</Typography.H2>
        
        <FormField
          control={form.control}
          name="roastLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Roast Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roast level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose your preferred coffee roast level
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flavorIntensity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flavor Intensity</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="py-4"
                />
              </FormControl>
              <FormDescription>
                1 = Mild, 5 = Intense
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brewMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brewing Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brewing method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="drip">Drip Coffee</SelectItem>
                  <SelectItem value="espresso">Espresso</SelectItem>
                  <SelectItem value="french">French Press</SelectItem>
                  <SelectItem value="pourover">Pour Over</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select your usual brewing method
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Get Recommendations
        </Button>
      </form>
    </Form>
  );
}