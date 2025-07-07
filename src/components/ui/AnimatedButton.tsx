
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  magneticStrength?: number;
  glowEffect?: boolean;
}

const AnimatedButton = ({ 
  children, 
  className, 
  magneticStrength = 0.5,
  glowEffect = true,
  ...props 
}: AnimatedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * magneticStrength,
        y: y * magneticStrength,
        duration: 0.3,
        ease: 'power2.out'
      });

      if (glowRef.current && glowEffect) {
        gsap.to(glowRef.current, {
          opacity: 0.6,
          scale: 1.1,
          duration: 0.3
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });

      if (glowRef.current && glowEffect) {
        gsap.to(glowRef.current, {
          opacity: 0,
          scale: 1,
          duration: 0.3
        });
      }
    };

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [magneticStrength, glowEffect]);

  return (
    <div className="relative inline-block">
      {glowEffect && (
        <div
          ref={glowRef}
          className="absolute inset-0 bg-primary-400 rounded-md blur-lg opacity-0"
          style={{ zIndex: -1 }}
        />
      )}
      <Button
        ref={buttonRef}
        className={cn(
          "relative transition-all duration-200 hover:shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

export default AnimatedButton;
