import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  repeat?: boolean;
  delay?: number;
}

const TypingText = ({ 
  text, 
  speed = 120, 
  className = "", 
  showCursor = true,
  repeat = false,
  delay = 1000
}: TypingTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length) {
      setIsTyping(false);
      
      // إذا كان التكرار مطلوب
      if (repeat) {
        setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
          setIsTyping(true);
        }, delay);
      }
    }
  }, [currentIndex, text, isTyping, speed, repeat, delay]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <span 
          className={`ml-1 w-0.5 h-6 md:h-8 bg-primary transition-all duration-200 ${
            isTyping ? 'animate-pulse' : 'animate-pulse'
          }`}
        />
      )}
    </div>
  );
};

export default TypingText;