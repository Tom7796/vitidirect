import {
  Shield,
  Car,
  FileSearch,
  Users,
  Siren,
  Scale,
  BookOpen,
  type LucideProps,
} from "lucide-react";

// `Handcuffs` is not available in all lucide versions, so map it to a safe
// fallback. Keep this map in sync with the `icon` field in police-data.ts.
const icons: Record<string, React.ComponentType<LucideProps>> = {
  Shield,
  Car,
  Handcuffs: Scale,
  FileSearch,
  Users,
  Siren,
  Scale,
};

export function CategoryIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = icons[name] ?? BookOpen;
  return <Icon {...props} />;
}
