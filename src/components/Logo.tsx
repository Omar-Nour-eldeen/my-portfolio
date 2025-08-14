import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "animated";
}

const Logo = ({ className, size = "md", variant = "default" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  };

  const LogoContent = () => {
    if (variant === "minimal") {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">ON</span>
          </div>
          <span className="font-bold">Omar Nour</span>
        </div>
      );
    }

    if (variant === "animated") {
      return (
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-sm">ON</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Omar Nour
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              Creative Developer
            </span>
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-bold text-base">ON</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary/60 rounded-full" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Omar Nour
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            Creative Developer
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={cn(
      "flex items-center transition-all duration-300 hover:scale-105",
      sizeClasses[size],
      className
    )}>
      <LogoContent />
    </div>
  );
};

export default Logo;