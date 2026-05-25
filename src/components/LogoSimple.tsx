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
    {/* Logo Image */}
    <div
      onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
      className="flex items-center cursor-pointer hover:opacity-85 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      <img src="/logo2.png" alt="Logo" className="h-10" />
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