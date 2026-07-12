# About this project

## Product Requirements

- Must meet accessability requirements for https://www.w3.org/WAI/standards-guidelines/
- Must have consistency in padding, margins, border widthss, typography for h1, h2, h3, h4, h5
- All inputs should have labels (hidden or otherwise)
- Icons must all be dark and filled. Using the Free and Classic Icons from [font-awesome](https://fontawesome.com/search?ip=classic&ic=free-collection)

## Decisions

### Design

### Programming

> Why do `export * from "./components` and `export type { Props } from './components`?

Because typescript and bunlders will omit the types during build time for the types and shring bundle sizing

```typescript
// ❌ This re-exports everything — types AND values
export * from "./types";

// ✅ This only re-exports types (removed at compile time)
export type { Type1, Type2, Type3 } from "./types";

// ✅ This only re-exports values
export { Component } from "./Component";
```
