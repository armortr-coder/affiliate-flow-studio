# Run Guide for Mac

## 1. Install Node.js

Go to nodejs.org and install LTS version.
Then check:

```bash
node -v
npm -v
```

## 2. Create Next.js project

```bash
npx create-next-app@latest affiliate-flow-studio
```

Recommended answers:
- TypeScript: Yes
- ESLint: Yes
- Tailwind: Yes
- src directory: No
- App Router: Yes
- Turbopack: Yes
- Import alias: Yes

## 3. Move this pack into the project

Put these documents into:

```bash
affiliate-flow-studio/docs/
```

Also put CODEX.md in the root of the project.

## 4. Enter project

```bash
cd affiliate-flow-studio
```

## 5. Run dev server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 6. Open Codex in project folder

```bash
codex
```

Then paste the first command from 08_CODEX_COMMANDS.md.
