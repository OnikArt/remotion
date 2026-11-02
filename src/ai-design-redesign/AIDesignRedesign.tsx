import React, {useEffect, useState} from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, cancelRender, continueRender, delayRender,
  interpolate, staticFile, useCurrentFrame,
} from 'remotion';
import {AssetLayer} from './AssetLayer';
import {DURATION_FRAMES, sceneFrames, transitionFrames} from './timing';

const src = (name: string) => staticFile(`references/ai-design-redesign/${name}`);
const wine = '#641812';
const cream = '#f3ddcb';
const ivory = '#fff3e8';
const ease = Easing.bezier(.28, .7, .32, 1);
const move = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
const linear = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const FontGate: React.FC = () => {
  const [handle] = useState(() => delayRender('Load supplied Manrope'));
  useEffect(() => {
    const font = new FontFace('Manrope', `url("${staticFile('fonts/Manrope-Variable.ttf')}")`, {weight: '200 800'});
    font.load().then((loaded) => {
      document.fonts.add(loaded);
      if (!document.fonts.check('800 80px Manrope', 'ДЁШЕВО')) throw new Error('Manrope did not load');
      continueRender(handle);
    }).catch((error: Error) => cancelRender(error));
  }, [handle]);
  return null;
};

const Stage: React.FC<{children: React.ReactNode; dark?: boolean}> = ({children, dark}) => <AbsoluteFill style={{overflow: 'hidden', background: dark ? 'radial-gradient(circle at 50% 47%, #552418, #1b0e0b 85%)' : 'radial-gradient(circle at 46% 36%, #fff0df, #c9a58f 90%)', fontFamily: 'Manrope', color: dark ? ivory : wine}}>{children}</AbsoluteFill>;

const Poster: React.FC<{after?: boolean; x?: number; y?: number; w?: number}> = ({after, x = beforePlacement.x, y = beforePlacement.y, w = 1199 * beforePlacement.scale}) => {
  const ratio = after ? 1448 / 1086 : 1312 / 1199;
  return <Img src={src(after ? 'poster_after.png' : 'poster_before.png')} style={{position: 'absolute', left: x, top: y, width: w, height: w * ratio, objectFit: 'contain', boxShadow: '0 26px 65px #2a0d0d50'}} />;
};

const Hook: React.FC<{f: number}> = ({f}) => <Stage dark>
  <div style={{position: 'absolute', left: 76, top: 460, fontSize: 75, fontWeight: 700, lineHeight: .96, letterSpacing: -3, opacity: move(f, 0, 18, .82, 1)}}>ТВОЙ ДИЗАЙН</div>
  <div style={{position: 'absolute', left: 68, top: 610, fontSize: 137, fontWeight: 800, lineHeight: .94, letterSpacing: -7, opacity: move(f, 8, 36, .75, 1)}}>ВЫГЛЯДИТ</div>
  <div style={{position: 'absolute', left: 60, top: 785, fontSize: 183, fontWeight: 800, lineHeight: .9, letterSpacing: -12, color: '#f3d8bb', opacity: move(f, 22, 54, .7, 1), translate: `0 ${move(f, 22, 54, 18, 0)}px`}}>ДЁШЕВО.</div>
  <div style={{position: 'absolute', left: 78, top: 1055, width: 780, height: 3, background: '#a86d55', scale: `${move(f, 35, 68)} 1`, transformOrigin: 'left center'}} />
  <div style={{position: 'absolute', left: 78, top: 1113, fontSize: 52, fontWeight: 600, letterSpacing: -1, opacity: move(f, 46, 74, .7, 1)}}>И ВОТ ПОЧЕМУ</div>
</Stage>;

// The rectangles use pixels in the approved 1199 × 1312 poster, measured on
// its actual raster. Both the poster and the focus use this one transform.
const beforePlacement = {x: 70, y: 365, scale: 940 / 1199};
const targets = {
  newBadge: {boxes: [{x: 760, y: 14, w: 412, h: 139}]},
  headline: {path: 'M48 100 H738 V183 H1075 V456 H75 V251 H48 Z'},
  features: {boxes: [{x: 60, y: 472, w: 480, h: 296}]},
  orderButton: {boxes: [{x: 222, y: 1136, w: 765, h: 123}]},
} as const;
type Target = keyof typeof targets;
const focus: {target: Target; start: number; end: number}[] = [
  {target: 'newBadge', start: 140, end: 280},
  {target: 'headline', start: 285, end: 450},
  {target: 'features', start: 460, end: 610},
  {target: 'orderButton', start: 615, end: 710},
];
const FocusHighlight: React.FC<{target: Target; opacity: number}> = ({target, opacity}) => {
  const {x, y, scale} = beforePlacement;
  const geometry = targets[target];
  if ('path' in geometry) return <svg viewBox="0 0 1199 1312" style={{position: 'absolute', left: x, top: y, width: 1199 * scale, height: 1312 * scale, opacity, overflow: 'visible', filter: 'drop-shadow(0 0 12px #fbe77b99)'}}><path d={geometry.path} fill="none" stroke="#fbe77b" strokeWidth="4" strokeLinejoin="round" /></svg>;
  return <>{geometry.boxes.map((box, index) => <div key={index} style={{position: 'absolute', left: x + box.x * scale, top: y + box.y * scale, width: box.w * scale, height: box.h * scale, border: '3px solid #fbe77b', borderRadius: 8, boxShadow: '0 0 0 4px #220a0955, 0 0 18px #fbe77b99', opacity, boxSizing: 'border-box'}} />)}</>;
};
const Before: React.FC<{f: number}> = ({f}) => {
  const selected = focus.find((item) => f >= item.start && f < item.end);
  const opacity = selected ? Math.min(move(f, selected.start, selected.start + 16), move(f, selected.end - 16, selected.end, 1, 0)) : 0;
  return <Stage dark>
    <Poster />
    {selected && <FocusHighlight target={selected.target} opacity={opacity} />}
  </Stage>;
};

const BeforeParts: React.FC<{f: number}> = ({f}) => <div style={{position: 'absolute', left: beforePlacement.x, top: beforePlacement.y, width: 1199, height: 1312, scale: beforePlacement.scale, transformOrigin: 'top left', opacity: move(f, 170, 200)}}>
  <AssetLayer name="logo_before.png" x={75} y={42} visibleWidth={385} />
  <AssetLayer name="headline_cold_before.png" x={50} y={110} visibleWidth={700} />
  <AssetLayer name="headline_latte_before.png" x={62} y={190} visibleWidth={1010} />
  <div style={{opacity: 1 - move(f, 82, 138), translate: `${move(f, 82, 138, 0, 300)}px 0`}}><AssetLayer name="badge_new_before.png" x={765} y={10} visibleWidth={410} /></div>
  <div style={{opacity: 1 - move(f, 140, 197), translate: `${move(f, 140, 197, 0, -260)}px 0`}}><AssetLayer name="label_gentle_taste_before.png" x={72} y={765} visibleWidth={500} /></div>
  <div style={{opacity: 1 - move(f, 220, 280), translate: `0 ${move(f, 220, 280, 0, 230)}px`}}><AssetLayer name="button_order.png" x={220} y={1128} visibleWidth={770} /></div>
  <div style={{position: 'absolute', left: 62, top: 474, width: 480, color: 'white', fontSize: 43, fontWeight: 750, lineHeight: 1.45, opacity: 1 - move(f, 215, 260), translate: `${move(f, 215, 260, 0, -65)}px 0`}}>
    {['Натуральный кофе', 'Освежающий вкус', 'Лёгкая текстура', 'Идеальный для лета'].map((line) => <div key={line} style={{display: 'flex', alignItems: 'start', gap: 22, whiteSpace: 'nowrap'}}><span style={{color: '#16ed08', fontSize: 62, fontWeight: 800, lineHeight: 1}}>✓</span><span>{line}</span></div>)}
  </div>
  <AssetLayer name="cup.png" x={560} y={205} visibleWidth={550} />
</div>;

const RemoveNoise: React.FC<{f: number}> = ({f}) => <Stage dark>
  <div style={{opacity: 1 - move(f, 150, 185)}}><Poster /></div>
  <BeforeParts f={f} />
  <div style={{position: 'absolute', left: 90, top: 1510, fontSize: 46, fontWeight: 700, opacity: move(f, 110, 155)}}>УБИРАЕМ ЛИШНЕЕ</div>
</Stage>;

const Hierarchy: React.FC<{f: number}> = ({f}) => <Stage>
  <div style={{position: 'absolute', left: 92, top: 340, fontSize: 42, fontWeight: 500, letterSpacing: 8, opacity: move(f, 10, 55)}}>ХОЛОДНЫЙ</div>
  <div style={{position: 'absolute', left: 70, top: 510, fontSize: 290, lineHeight: 1, fontWeight: 800, letterSpacing: -18, translate: `${move(f, 0, 120, 230, 0)}px 0`}}>АЙС</div>
  <div style={{position: 'absolute', left: 70, top: 930, fontSize: 235, lineHeight: 1, fontWeight: 800, letterSpacing: -14, translate: `${move(f, 70, 210, -350, 0)}px 0`}}>ЛАТТЕ</div>
  <div style={{position: 'absolute', left: 94, top: 1325, width: 650, fontSize: 35, lineHeight: 1.2, fontWeight: 500, opacity: move(f, 170, 240)}}>НЕЖНЫЙ ВКУС<br />И ОСВЕЖАЮЩАЯ ЛЁГКОСТЬ</div>
</Stage>;

// Individual approved cutouts assemble the hierarchy; the exact raster takes
// over before the scene ends because some provided mattes contain background residue.
const ComposeAfter: React.FC<{f: number}> = ({f}) => {
  const posterOpacity = move(f, 175, 270);
  return <Stage>
    <div style={{position: 'absolute', left: 60, top: 250, width: 1086, height: 1448, scale: .884, transformOrigin: 'top left', opacity: 1 - posterOpacity}}>
      <div style={{opacity: move(f, 10, 70)}}><AssetLayer name="logo_after.png" x={425} y={35} visibleWidth={235} /></div>
      <div style={{opacity: move(f, 50, 110)}}><AssetLayer name="headline_cold_after.png" x={150} y={170} visibleWidth={365} /></div>
      <div style={{opacity: move(f, 90, 155)}}><AssetLayer name="headline_ice.png" x={135} y={195} visibleWidth={835} /></div>
      <div style={{opacity: move(f, 120, 185)}}><AssetLayer name="text_refreshing_lightness.png" x={65} y={665} visibleWidth={245} /></div>
      <div style={{opacity: move(f, 155, 215)}}><AssetLayer name="headline_latte_after.png" x={55} y={735} visibleWidth={965} /></div>
      <div style={{opacity: move(f, 180, 260)}}><AssetLayer name="features_after.png" x={155} y={1225} visibleWidth={775} /></div>
      <div style={{opacity: move(f, 205, 275)}}><AssetLayer name="badge_new_after.png" x={840} y={82} visibleWidth={205} /></div>
      <div style={{opacity: move(f, 100, 220), translate: `0 ${move(f, 100, 220, 130, 0)}px`}}><AssetLayer name="cup.png" x={255} y={155} visibleWidth={535} /></div>
    </div>
    <div style={{opacity: posterOpacity}}><Poster after x={60} y={250} w={960} /></div>
  </Stage>;
};

const After: React.FC<{f: number}> = ({f}) => <Stage>
  <div style={{scale: move(f, 0, 500, 1.012, 1), transformOrigin: 'center 45%'}}><Poster after x={60} y={250} w={960} /></div>
</Stage>;

const Compare: React.FC<{f: number}> = ({f}) => {
  const left = 65, top = 277, width = 950, height = 1267;
  const split = linear(f, 15, 360, .025, .975);
  const line = left + width * split;
  return <Stage>
    <div style={{position: 'absolute', left: 65, top: 183, fontSize: 48, fontWeight: 800}}>ПОСЛЕ</div>
    <div style={{position: 'absolute', right: 65, top: 183, fontSize: 48, fontWeight: 800}}>ДО</div>
    <div style={{position: 'absolute', left, top, width, height, background: '#27120e', overflow: 'hidden', boxShadow: '0 28px 65px #32120c55'}}>
      <Img src={src('poster_before.png')} style={{position: 'absolute', inset: -35, width: width + 70, height: height + 70, objectFit: 'cover', filter: 'blur(35px)', opacity: .65}} />
      <Img src={src('poster_before.png')} style={{position: 'absolute', inset: 0, width, height, objectFit: 'contain'}} />
      <div style={{position: 'absolute', inset: 0, background: cream, clipPath: `inset(0 ${100 - split * 100}% 0 0)`}}>
        <Img src={src('poster_after.png')} style={{position: 'absolute', inset: -35, width: width + 70, height: height + 70, objectFit: 'cover', filter: 'blur(35px)', opacity: .65}} />
        <Img src={src('poster_after.png')} style={{position: 'absolute', inset: 0, width, height, objectFit: 'contain'}} />
      </div>
    </div>
    <div style={{position: 'absolute', left: line - 3, top, width: 6, height, background: ivory, boxShadow: '0 0 18px #240b0b88'}} />
    <div style={{position: 'absolute', left: line - 39, top: top + height / 2 - 39, width: 78, height: 78, borderRadius: '50%', display: 'grid', placeItems: 'center', background: ivory, border: `4px solid ${wine}`, fontSize: 35, fontWeight: 800}}>‹›</div>
  </Stage>;
};

const Subscribe: React.FC<{f: number}> = ({f}) => <Stage>
  <div style={{opacity: 1 - move(f, 0, 46)}}><Poster after x={60} y={250} w={960} /></div>
  <div style={{position: 'absolute', inset: 0, background: cream, opacity: move(f, 0, 46)}} />
  <div style={{position: 'absolute', left: 84, top: 395, width: 810, fontSize: 67, lineHeight: 1.08, fontWeight: 800, letterSpacing: -3, opacity: move(f, 0, 34)}}>Хочешь больше<br />таких разборов?</div>
  <div style={{position: 'absolute', left: 85, top: 650, width: 780, fontSize: 31, lineHeight: 1.24, fontWeight: 500, opacity: move(f, 35, 70)}}>Подписывайся — здесь о дизайне, маркетинге и продвижении бизнеса без воды.</div>
  <div style={{position: 'absolute', left: 85, top: 837, width: 770, height: 3, background: wine, scale: `${move(f, 55, 88)} 1`, transformOrigin: 'left center'}} />
  <div style={{position: 'absolute', left: 85, top: 912, width: 790, fontSize: 53, lineHeight: 1.1, fontWeight: 800, letterSpacing: -2, opacity: move(f, 70, 115)}}>ХОЧЕШЬ ГОТОВЫЙ<br />ПРОМПТ БЕЗ ИИ-СЛОПА?</div>
  <div style={{position: 'absolute', left: 85, top: 1134, fontSize: 38, fontWeight: 700, opacity: move(f, 112, 155)}}>НАПИШИ В DIRECT</div>
  <div style={{position: 'absolute', left: 85, top: 1235, padding: '20px 42px', borderRadius: 20, background: wine, color: ivory, boxShadow: '0 18px 35px #64181230', fontSize: 76, fontWeight: 800, letterSpacing: -3, opacity: move(f, 145, 190), translate: `0 ${move(f, 145, 190, 16, 0)}px`}}>ПРОМПТ ↗</div>
</Stage>;

const scenes = [Hook, Before, RemoveNoise, Hierarchy, ComposeAfter, After, Compare, Subscribe];

export const AIDesignRedesign: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: cream}}>
    <FontGate />
    <Audio src={src('voiceover.mp3')} />
    {scenes.map((Scene, index) => {
      const start = sceneFrames[index];
      const end = sceneFrames[index + 1] ?? DURATION_FRAMES;
      if (frame < start - transitionFrames || frame >= end + transitionFrames) return null;
      const enter = index === 0 ? 1 : move(frame, start - transitionFrames, start + transitionFrames);
      const exit = index === scenes.length - 1 ? 1 : move(frame, end - transitionFrames, end + transitionFrames, 1, 0);
      return <AbsoluteFill key={index} style={{opacity: Math.min(enter, exit)}}><Scene f={frame - start} /></AbsoluteFill>;
    })}
  </AbsoluteFill>;
};
