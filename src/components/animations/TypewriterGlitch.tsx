
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TypewriterGlitchProps {
  text: string;
  className?: string;
  delay?: number;
}

const TypewriterGlitch = ({ text, className = '', delay = 0 }: TypewriterGlitchProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      
      // Typewriter effect
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          
          // Start glitch effect
          setIsGlitching(true);
          
          // End glitch after 1.5s
          setTimeout(() => {
            setIsGlitching(false);
            if (textRef.current) {
              gsap.to(textRef.current, {
                filter: 'blur(0px)',
                duration: 0.3
              });
            }
          }, 1500);
        }
      }, 100);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    if (!textRef.current) return;

    if (isGlitching) {
      const glitchTl = gsap.timeline({ repeat: -1 });
      
      glitchTl
        .to(textRef.current, {
          x: gsap.utils.random(-3, 3),
          y: gsap.utils.random(-2, 2),
          filter: 'blur(1px) hue-rotate(90deg)',
          duration: 0.1
        })
        .to(textRef.current, {
          x: gsap.utils.random(-2, 2),
          y: gsap.utils.random(-1, 1),
          filter: 'blur(0px) hue-rotate(0deg)',
          duration: 0.1
        });

      return () => {
        glitchTl.kill();
      };
    }
  }, [isGlitching]);

  return (
    <span 
      ref={textRef} 
      className={`${className} ${isGlitching ? 'text-red-400' : ''}`}
    >
      {displayText}
      <span className={`${displayText.length < text.length ? 'animate-pulse' : 'opacity-0'}`}>|</span>
    </span>
  );
};

export default TypewriterGlitch;
