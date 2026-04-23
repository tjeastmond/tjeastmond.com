/* Archived, unused by the live site. */

import type { JSX } from "react";
import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import ScrambleText, { type OptionalOptions } from "./scrambler";

type ScrambleTextProps<T extends keyof JSX.IntrinsicElements> = {
  as: T;
  options?: OptionalOptions;
  children: React.ReactNode;
  useHover?: boolean;
} & React.ComponentPropsWithoutRef<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WrapperComponent = forwardRef<HTMLElement, ScrambleTextProps<any>>(
  ({ as: Tag = "div", children, ...props }, ref) => {
    return React.createElement(Tag, { ref, ...props } as never, children);
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
  const elementRef = useRef<HTMLElement | null>(null);
  const [scrambler, setScrambler] = useState<ScrambleText | null>(null);

  const start = useCallback(() => {
    scrambler?.start();
  }, [scrambler]);

  const restoreNow = useCallback(() => {
    scrambler?.restoreNow();
  }, [scrambler]);

  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    if (elementRef.current) {
      const scramblerInstance = new ScrambleText(elementRef.current, options);
      setScrambler(scramblerInstance);
    }
  }, [optionsKey]);

  useEffect(() => {
    if (scrambler) scrambler.start();
    return () => {
      if (scrambler) scrambler.cleanup();
    };
  }, [scrambler]);

  useEffect(() => {
    if (!useHover) return;
    const element = elementRef.current;

    if (scrambler && element) {
      element.addEventListener("mouseenter", start);
      element.addEventListener("mouseleave", restoreNow);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", start);
        element.removeEventListener("mouseleave", restoreNow);
      }
    };
  }, [scrambler, useHover, start, restoreNow]);

  return (
    <WrapperComponent as={as} {...props} ref={elementRef}>
      {children}
    </WrapperComponent>
  );
}
