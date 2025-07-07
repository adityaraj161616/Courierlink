
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export const useGSAP = () => {
  const timeline = useRef<gsap.core.Timeline>();
  
  useEffect(() => {
    timeline.current = gsap.timeline();
    return () => {
      timeline.current?.kill();
    };
  }, []);

  return {
    gsap,
    ScrollTrigger,
    timeline: timeline.current
  };
};

export default useGSAP;
