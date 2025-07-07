
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const SplitTextReveal = ({ text, className = '', delay = 0 }: SplitTextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(' ');
    textRef.current.innerHTML = words
      .map(word => `<span class="word">${word}</span>`)
      .join(' ');

    const wordElements = textRef.current.querySelectorAll('.word');
    
    gsap.set(wordElements, { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      transformPerspective: 1000
    });

    const tl = gsap.timeline({ delay });
    
    wordElements.forEach((word, index) => {
      tl.to(word, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, index * 0.1);
    });

    return () => {
      tl.kill();
    };
  }, [text, delay]);

  return <div ref={textRef} className={className} />;
};

export default SplitTextReveal;
