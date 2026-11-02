# AI Design Redesign — Remotion project

Vertical motion design video comparing an overloaded coffee advertisement with its approved redesign. The repository also contains the project's other Remotion compositions; their source files are kept intact.

## Requirements

- Node.js `^20.19.0`, `^22.13.0`, or `>=24`
- npm

The project uses Remotion 4, React 19, TypeScript, and the locally supplied Manrope font. All required poster images, extracted PNG layers, and the original voiceover are under `public/`.

## Install and preview

```sh
npm ci
npm run dev
```

Open the local URL printed by Remotion Studio and select **AIDesignRedesign**. The composition is 1080 × 1920 at 60 FPS and lasts 3704 frames (61.733 seconds of video for a 61.727313-second voiceover).

## Render

```sh
npx remotion render AIDesignRedesign out/AIDesignRedesign.mp4 --codec h264
```

The output directory is intentionally ignored by Git. The original `voiceover.mp3` plays at its native speed; no music or effects are added.

## Quality checks

```sh
npm run lint
npm run build
```

`npm run lint` checks ESLint and TypeScript. `npm run build` creates a production Remotion bundle in `build/`.

## Project layout

- `src/ai-design-redesign/` — AIDesignRedesign composition, layer placement, scene timing.
- `src/Root.tsx` — Remotion composition registration.
- `public/references/ai-design-redesign/` — approved before and after posters, extracted PNG elements, original voiceover.
- `public/fonts/` — Manrope font used for authored text.
- `src/cafe-launch/`, `src/digital-visibility/`, `src/Composition.tsx` — other existing compositions.

The approved `poster_before.png` and `poster_after.png` are used whole for the reference states and comparison. Timing adjustments can be made in `src/ai-design-redesign/timing.ts`.
