## Introduction copy loses spacing on narrow screens

The responsive stylesheet hides the explicit line break in the introduction below 480px. Without an adjacent JSX
space, “help” and “engineering” were rendered as one word. An explicit text space now preserves the sentence when
the break is hidden.

- [x] Preserve spacing around the responsive line break
- [x] Verify the corrected text at the mobile viewport

Date Reported: 2026-09-03 09:10 EDT
Date Fixed: 2026-09-03 09:10 EDT

---
