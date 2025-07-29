import { useState, useEffect, useCallback, useRef } from 'react';

interface ValueOptions {
  duration?: number;
  precision?: number;
  delay?: number;
}

export function useCountUp(from: number, to: number, options: ValueOptions = {}): number {
  const { duration = 1000, precision = 0, delay = 0 } = options;

  if (duration <= 0) {
    throw new Error('useCountUp: duration must be greater than 0');
  }

  const [value, setValue] = useState(from);

  const startTimeRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const timeoutId = useRef<number | null>(null);

  const roundToPrecision = useCallback(
    (num: number) => {
      const multiplier = Math.pow(10, precision);
      return Math.round(num * multiplier) / multiplier;
    },
    [precision]
  );

  const animate = useCallback(
    (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }
      const elapsedTime = currentTime - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = from + (to - from) * easeOutCubic(progress);

      setValue(roundToPrecision(currentValue));

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else if (progress >= 1) {
        setValue(roundToPrecision(to));
      }
    },
    [from, to, duration, roundToPrecision]
  );

  useEffect(() => {
    if (delay > 0) {
      timeoutId.current = window.setTimeout(() => {
        animationFrameId.current = requestAnimationFrame(animate);
      }, delay);
    } else {
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [animate, delay]);

  return value;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}
