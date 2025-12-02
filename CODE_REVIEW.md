# Code Review - tjeastmond.com

## Unused Files

### 1. `src/components/scrambler/types.ts` - **UNUSED**
**Status:** Completely commented out and unused

This file contains only commented-out code that duplicates what's already in `scrambler.ts`. The types, interfaces, and default options defined here are not imported anywhere.

**Recommendation:** Delete this file.

```bash
rm src/components/scrambler/types.ts
```

## Scrambler Implementation Analysis

The scrambler animation system is well-designed but has several areas for improvement:

### Issues & Improvements

#### 1. **Event Listener Memory Leak in `scramblerText.tsx`**
**Severity:** High

**Problem:** Lines 61-62 reference `elementRef.current` in the cleanup function, but this may be `null` when the cleanup runs if the component has unmounted.

```typescript
// Current (lines 60-63)
return () => {
  elementRef.current?.removeEventListener("mouseenter", start);
  elementRef.current?.removeEventListener("mouseleave", restoreNow);
};
```

**Fix:** Capture the element in a local variable:

```typescript
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
}, [scrambler, children, useHover, start, restoreNow]);
```

#### 2. **Missing Dependency in useEffect**
**Severity:** Medium

The hover effect useEffect (line 54) is missing `useHover`, `start`, and `restoreNow` from its dependency array, which could cause stale closures.

#### 3. **Redundant `children` Dependency**
**Severity:** Low

Lines 52 and 64 include `children` in the dependency array, which causes unnecessary re-renders when children change. The scrambler should only reinitialize when the element or options change, not when children change.

**Current:**
```typescript
useEffect(() => {
  if (scrambler) scrambler.start();
  return () => {
    if (scrambler) scrambler.restoreNow();
  };
}, [scrambler, children]); // children causes unnecessary re-runs
```

**Better:**
```typescript
useEffect(() => {
  if (scrambler) scrambler.start();
  return () => {
    if (scrambler) scrambler.restoreNow();
  };
}, [scrambler]); // Remove children
```

#### 4. **Options Dependency Creates New Scrambler Instance**
**Severity:** Medium

Line 45 has `options` as a dependency, which means passing a new options object on each render creates a new scrambler instance.

**Problem:**
```typescript
// Parent component
<Scrambler options={{ changes: 5 }} /> // New object every render!
```

**Fix:** Use `useMemo` for options or JSON.stringify for comparison:

```typescript
const optionsKey = JSON.stringify(options);

useEffect(() => {
  if (elementRef.current) {
    const scramblerInstance = new ScrambleText(elementRef.current, options);
    setScrambler(scramblerInstance);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [optionsKey]); // Compare stringified version
```

#### 5. **Animation Frame Not Canceled**
**Severity:** Medium

In `scrambler.ts`, the `animateFrame` function uses `requestAnimationFrame` but never stores the frame ID for cleanup. If the component unmounts during animation, the frame callback continues running.

**Current (lines 66-86):**
```typescript
private animateScrambling(): void {
  let frameCount = 0;

  const animateFrame = () => {
    if (!this.isScrambling) return;
    // ... animation logic
    requestAnimationFrame(animateFrame); // No way to cancel this!
  };

  requestAnimationFrame(animateFrame);
}
```

**Fix:**
```typescript
private frameId: number | null = null;

private animateScrambling(): void {
  let frameCount = 0;

  const animateFrame = () => {
    if (!this.isScrambling) {
      this.frameId = null;
      return;
    }
    
    frameCount++;
    if (frameCount % this.config.sfps === 0) {
      for (const idx of this.scrambledIndexes) {
        if (this.scrambleCounts[idx] === 0) {
          this.restoreCharacter(idx);
          continue;
        }

        this.setTextContent(idx, this.getRandomChar());
        this.scrambleCounts[idx]--;
      }
    }

    this.frameId = requestAnimationFrame(animateFrame);
  };

  this.frameId = requestAnimationFrame(animateFrame);
}

public cleanup(): void {
  if (this.frameId !== null) {
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }
  this.restoreNow();
}
```

Then call `scrambler.cleanup()` in the React component's cleanup:

```typescript
useEffect(() => {
  if (scrambler) scrambler.start();
  return () => {
    if (scrambler) scrambler.cleanup(); // Instead of restoreNow
  };
}, [scrambler]);
```

#### 6. **Shuffle Implementation**
**Severity:** Low - Performance

Line 48 uses `sort(() => Math.random() - 0.5)` which is not a proper shuffle algorithm and has bias.

**Better:** Use Fisher-Yates shuffle:

```typescript
private shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
```

#### 7. **Type Safety - Missing TypeScript Props**
**Severity:** Low

The `Social` component in `socials.tsx` (line 21) has no TypeScript types:

```typescript
// Current
function Social({ icon, label, link }) {

// Better
interface SocialProps {
  icon: string;
  label: string;
  link: string;
}

function Social({ icon, label, link }: SocialProps) {
```

## Summary

### Files to Delete
- `src/components/scrambler/types.ts` (unused, all commented out)

### Critical Issues
1. Event listener memory leak in hover effect
2. Missing animation frame cleanup
3. Options dependency causes unnecessary re-instantiation

### Minor Issues
1. Shuffle algorithm bias
2. Missing TypeScript types in Social component
3. Unnecessary children dependency

### Scrambler Architecture Strengths
- Clean separation of concerns (core logic vs React wrapper)
- Good use of TypeScript generics for polymorphism
- Configurable and reusable
- Uses requestAnimationFrame for smooth animations

The scrambler implementation is solid conceptually but needs cleanup around React lifecycle management and proper resource cleanup.
