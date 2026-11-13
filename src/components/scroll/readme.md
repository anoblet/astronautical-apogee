# Scroll component

[index.ts](index.ts) supplies the Lit carousel, keyboard controls and scroll-snap
index tracking. Snap events are checked for an element target with a parent
before updating the index and directional controls; null targets are ignored.

```mermaid
flowchart LR
  Input[Pointer, keyboard and scroll-snap events] --> Component[index.ts]
  Component --> Target[Validate snap target and parent]
  Target --> State[Active index and directional controls]
```
