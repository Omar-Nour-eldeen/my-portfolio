import { cn } from "@/lib/utils";

interface LogoSimpleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  clickable?: boolean;
}

const LogoSimple = ({ className, size = "md", showTagline = true, clickable = false }: LogoSimpleProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  const handleClick = () => {
    if (clickable) {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-3 transition-all duration-300",
        clickable && "hover:scale-105 cursor-pointer hover:opacity-80",
        sizeClasses[size],
        className
      )}
      onClick={handleClick}
    >
      {/* Logo Icon */}
      <div className={cn(
        "relative bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-glow transition-all duration-300",
        clickable && "hover:shadow-glow-lg hover:scale-110",
        iconSizes[size]
      )}>
        <span className="text-primary-foreground font-bold text-xs">ON</span>
        
        {/* Decorative dots */}
        <div
          className={cn(
            "absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full animate-pulse transition-all duration-300",
            clickable && "hover:scale-125 hover:bg-accent/80"
          )}
          style={{ animationDuration: '1s' }}
        />
        <div
          className={cn(
            "absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse transition-all duration-300",
            clickable && "hover:scale-125 hover:bg-primary/80"
          )}
          style={{ animationDuration: '1s' }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className={cn(
          "font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-300",
          clickable && "hover:from-primary/80 hover:to-accent/80"
        )}>
          Omar Nour
        </span>
        {showTagline && (
          <span className={cn(
            "text-xs text-muted-foreground font-medium leading-tight transition-all duration-300",
            clickable && "hover:text-primary/80"
          )}>
            Fullstack .NET Web Developer
          </span>
        )}
      </div>
    </div>
  );
};

export default LogoSimple;