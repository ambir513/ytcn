# Contributing to ytcn

Contributions are welcome. ytcn follows the same philosophy as shadcn/ui: components are meant to be read, understood, and modified.

## Development Setup

```bash
git clone https://github.com/your-org/ytcn.git
cd ytcn
npm install
npm run dev
```

## Adding a New Component

1. Create the component in `src/components/ytcn/ytcn-[name].tsx`
2. Add it to the barrel export in `src/components/ytcn/index.ts`
3. Add a docs/demo section in `src/app/page.tsx`
4. Open a PR — include a working demo and props table

## Code Style

- All non-obvious logic must have a block comment explaining **why**, not what
- No `any` outside the YT API boundary — wrap in typed accessor functions
- `useCallback` and `memo` only where measurably beneficial — add a comment if you use them
- Prefer `refs` over `state` for values consumed inside async YT callbacks
- All exports must not cause side effects on import

## Reporting Bugs

Open an issue with:
- Browser and version
- React / Next.js version
- Minimal reproduction (StackBlitz or CodeSandbox preferred)
- Description of expected vs actual behavior
