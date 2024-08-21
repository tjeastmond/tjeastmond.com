"use client";

import React, { useEffect, useRef, useState, forwardRef } from "react";
import ScrambleText from "./scrambler/scrambler";
import { OptionalOptions } from "./scrambler/types";

interface ScrambleTextProps {
  text: string;
  as: keyof JSX.IntrinsicElements;
  options?: OptionalOptions;
  onHover?: boolean;
  onHoverOnly?: boolean;
}

interface WrapperComponentProps extends React.HTMLAttributes<HTMLElement> {
  as: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

const WrapperComponent = forwardRef<HTMLElement, WrapperComponentProps>(
  ({ as: Tag = "div", children, ...props }, ref) => {
    return React.createElement(Tag, { ref, ...props }, children);
  },
);

WrapperComponent.displayName = "WrapperComponent";

export default function Scrambler({ text, as, options, onHover, ...props }: ScrambleTextProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [scrambler, setScrambler] = useState<ScrambleText | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      const scramblerInstance = new ScrambleText(elementRef.current, options);

      if (onHover) {
        elementRef.current.addEventListener("mouseenter", () => {
          scramblerInstance.start();
        });
        elementRef.current.addEventListener("mouseleave", () => {
          scramblerInstance.restoreNow();
        });
      }

      setScrambler(scramblerInstance);
    }
  }, [options]);

  useEffect(() => {
    if (scrambler) scrambler.start();
    return () => {
      if (scrambler) scrambler.restoreNow();
    };
  }, [scrambler, text]);

  return (
    <WrapperComponent as={as} {...props} ref={elementRef}>
      {text}
    </WrapperComponent>
  );
}
