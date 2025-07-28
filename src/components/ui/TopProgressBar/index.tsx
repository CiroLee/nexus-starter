import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function TopProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    let isCompleted = false;

    const calculateProgress = () => {
      try {
        // get all resources
        const resources = performance.getEntriesByType('resource');
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        if (!resources.length && !navigation) {
          setProgress(100);
          return;
        }

        // calculate loaded resources
        const loadedResources = resources.filter((r) => r.duration > 0).length;
        const totalResources = resources.length;

        // calculate progress percentage
        let currentProgress = 0;

        if (totalResources > 0) {
          currentProgress = Math.round((loadedResources / totalResources) * 100);
        }

        // if the page is loading, add some buffer to the progress
        if (document.readyState !== 'complete') {
          currentProgress = Math.min(currentProgress + 10, 95);
        } else {
          currentProgress = 100;
        }

        setProgress(currentProgress);

        // show progress bar
        if (!isVisible && currentProgress < 100) {
          setIsVisible(true);
        }

        // hidden when completed
        if (currentProgress >= 100 && !isCompleted) {
          isCompleted = true;
          timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            setProgress(0);
          }, 500);
        }
      } catch (error) {
        console.error('Error calculating progress:', error);
        setProgress(100);
      }
    };

    // init
    calculateProgress();

    const observer = new PerformanceObserver(calculateProgress);
    observer.observe({ type: 'resource', buffered: true });
    const handleLoad = () => {
      setTimeout(calculateProgress, 100);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', calculateProgress);
    }

    window.addEventListener('load', handleLoad);

    // update progress per 100ms
    const interval = setInterval(calculateProgress, 100);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', calculateProgress);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div
      className={cn('fixed top-0 left-0 z-[9999] h-0.5 w-screen transition-opacity duration-300', isVisible ? 'opacity-100' : 'pointer-events-none opacity-0')}
      aria-label="Page loading progress"
      role="progressbar">
      <div
        className="bg-primary size-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${progress - 100}%)`
        }}
      />
    </div>
  );
}
