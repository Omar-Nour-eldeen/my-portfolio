import Logo from './Logo';
import LogoSimple from './LogoSimple';
import LogoIcon from './LogoIcon';
import TypingText from './TypingText';

const LogoDemo = () => {
  return (
    <div className="p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Logo Showcase</h1>
        <p className="text-muted-foreground">All available logo variants for your portfolio</p>
      </div>

      {/* Typing Text Demo */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Typing Animation Demo</h2>
        
        <div className="grid gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Single Typing</h3>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              <TypingText text="Creative Developer" speed={100} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Repeating Typing</h3>
            <div className="text-xl font-semibold text-primary">
              <TypingText text="Full Stack Developer" speed={80} repeat={true} delay={2000} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Fast Typing</h3>
            <div className="text-lg text-accent">
              <TypingText text="React & TypeScript Expert" speed={50} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Logo Variants */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Main Logo Variants</h2>
        
        <div className="grid gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default Logo</h3>
            <Logo />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Minimal Logo</h3>
            <Logo variant="minimal" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Animated Logo</h3>
            <Logo variant="animated" />
          </div>
        </div>
      </div>

      {/* Logo Simple Variants */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Logo Simple Variants</h2>
        
        <div className="grid gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">With Tagline</h3>
            <LogoSimple />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Without Tagline</h3>
            <LogoSimple showTagline={false} />
          </div>
        </div>
      </div>

      {/* Logo Icon Variants */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Logo Icon Variants</h2>
        
        <div className="grid gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default Icon</h3>
            <LogoIcon />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Minimal Icon</h3>
            <LogoIcon variant="minimal" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Glow Icon</h3>
            <LogoIcon variant="glow" />
          </div>
        </div>
      </div>

      {/* Size Variations */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Size Variations</h2>
        
        <div className="grid gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Small</h3>
            <Logo size="sm" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Medium</h3>
            <Logo size="md" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Large</h3>
            <Logo size="lg" />
          </div>
        </div>
      </div>

      {/* Icon Size Variations */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Icon Size Variations</h2>
        
        <div className="flex items-center gap-8">
          <LogoIcon size="sm" />
          <LogoIcon size="md" />
          <LogoIcon size="lg" />
          <LogoIcon size="xl" />
        </div>
      </div>
    </div>
  );
};

export default LogoDemo;