import { cn } from "@/lib/utils";

interface LogoIconProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "minimal" | "glow";
}

const LogoIcon = ({ className, size = "md", variant = "default" }: LogoIconProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
    xl: "text-xl"
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return "bg-gradient-to-br from-primary to-accent shadow-md";
      case "glow":
        return "bg-gradient-to-br from-primary to-accent shadow-glow";
      default:
        return "bg-gradient-to-br from-primary via-accent to-primary shadow-lg";
    }
  };

  return (
    <div className={cn(
      "relative rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105",
      sizeClasses[size],
      getVariantStyles(),
      className
    )}>
      {/* Main Letters */}
      <span className={cn(
        "text-primary-foreground font-bold",
        textSizes[size]
      )}>
        ON
      </span>

      {/* Decorative Elements */}
      {variant !== "minimal" && (
        <>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary/60 rounded-full" />
          {variant === "glow" && (
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
          )}
        </>
      )}
    </div>
  );
};

export default LogoIcon;