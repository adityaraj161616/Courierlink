
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface VideoMaskRevealProps {
  children: React.ReactNode;
  videoSrc?: string;
  imageSrc?: string;
}

const VideoMaskReveal = ({ children, videoSrc, imageSrc }: VideoMaskRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !maskRef.current || !contentRef.current) return;

    const tl = gsap.timeline();
    
    // Initial state
    gsap.set(maskRef.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(contentRef.current, { opacity: 0, y: 50 });

    // Animation sequence
    tl.to(maskRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: 'power4.out'
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div 
        ref={maskRef}
        className="absolute inset-0 z-10"
        style={{
          background: videoSrc 
            ? `url(${videoSrc})` 
            : imageSrc 
            ? `url(${imageSrc})` 
            : 'linear-gradient(135deg, #14B8A6, #0F766E)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div ref={contentRef} className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default VideoMaskReveal;
