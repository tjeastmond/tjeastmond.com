"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useCallback,
} from "react";
import ScrambleText, { OptionalOptions } from "./scrambler/scrambler";

// Use types instead of interfaces to allow proper extension
type ScrambleTextProps<T extends keyof JSX.IntrinsicElements> = {
  as: T;
  options?: OptionalOptions;
  children: React.ReactNode;
  useHover?: boolean;
} & React.ComponentPropsWithoutRef<T>;

const WrapperComponent = forwardRef<HTMLElement, ScrambleTextProps<any>>(
  ({ as: Tag = "div", children, ...props }, ref) => {
    return React.createElement(Tag, { ref, ...props }, children);
  },
);

WrapperComponent.displayName = "WrapperComponent";

export default function Scrambler<T extends keyof JSX.IntrinsicElements>({
  children,
  as,
  options,
  useHover = false,
  ...props
}: ScrambleTextProps<T>) {
  const elementRef = useRef<HTMLElement>(null);
  const [scrambler, setScrambler] = useState<ScrambleText | null>(null);

  const start = useCallback(() => {
    scrambler?.start();
  }, [scrambler]);

  const restoreNow = useCallback(() => {
    scrambler?.restoreNow();
  }, [scrambler]);

  useEffect(() => {
    if (elementRef.current) {
      const scramblerInstance = new ScrambleText(elementRef.current, options);
      setScrambler(scramblerInstance);
    }
  }, [options]);

  useEffect(() => {
    if (scrambler) scrambler.start();
    return () => {
      if (scrambler) scrambler.restoreNow();
    };
  }, [scrambler, children]);

  useEffect(() => {
    if (!useHover) return;
    if (scrambler) {
      elementRef.current?.addEventListener("mouseenter", start);
      elementRef.current?.addEventListener("mouseleave", restoreNow);
    }
    return () => {
      elementRef.current?.removeEventListener("mouseenter", start);
      elementRef.current?.removeEventListener("mouseleave", restoreNow);
    };
  }, [scrambler, children]);

  return (
    <WrapperComponent as={as} {...props} ref={elementRef}>
      {children}
    </WrapperComponent>
  );
}
