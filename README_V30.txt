V30 GitHub visual fix

- Removes the white background from .real-nav so the centered Subte logo is no longer covered by a white bar.
- Keeps only left/right white masks, leaving the logo center untouched.
- Forces every non-carousel section to white.
- Forces lower_v29.webp (Tarifas + Horarios) and its wrapper to white.
- Adds ?v=30 to header/mid/lower/styles references so the browser requests fresh files instead of cached copies.
