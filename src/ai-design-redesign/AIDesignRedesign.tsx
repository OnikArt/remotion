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

const Poster: React.FC<{after?: boolean; x?: number; y?: number; w?: number}> = ({after, x = 70, y = 365, w = 940}) => {
  const ratio = after ? 1448 / 1086 : 1312 / 1199;
  return <Img src={src(after ? 'poster_after.png' : 'poster_before.png')} style={{position: 'absolute', left: x, top: y, width: w, height: w * ratio, objectFit: 'contain', boxShadow: '0 26px 65px #2a0d0d50'}} />;
};

const Hook: React.FC<{f: number}> = ({f}) => <Stage dark>
  <div style={{position: 'absolute', left: 88, top: 385, fontSize: 47, fontWeight: 500, letterSpacing: 1, opacity: move(f, 0, 18, .85, 1)}}>ТВОЙ ДИЗАЙН</div>
  <div style={{position: 'absolute', left: 82, top: 515, fontSize: 70, fontWeight: 700, letterSpacing: -3, opacity: move(f, 0, 55, .86, 1)}}>ВЫГЛЯДИТ</div>
  <div style={{position: 'absolute', left: 73, top: 660, fontSize: 147, fontWeight: 800, lineHeight: 1, letterSpacing: -10, color: '#f3d8bb', opacity: move(f, 0, 65, .86, 1), translate: `0 ${move(f, 0, 65, 9, 0)}px`}}>ДЁШЕВО.</div>
  <div style={{position: 'absolute', left: 87, top: 1005, width: 650, height: 2, background: '#a86d55'}} />
  <div style={{position: 'absolute', left: 88, top: 1052, fontSize: 42, fontWeight: 500, opacity: move(f, 0, 115, .8, 1)}}>И ВОТ ПОЧЕМУ</div>
  <div style={{position: 'absolute', left: 695, top: 900, width: 300, height: 430, opacity: .23, translate: `${move(f, 0, 150, 0, -14)}px 0`}}><AssetLayer name="cup.png" x={0} y={0} visibleWidth={290} /></div>
</Stage>;

type Focus = {start: number; end: number; x: number; y: number; w: number; h: number};
const focus: Focus[] = [
  {start: 140, end: 280, x: 670, y: 382, w: 290, h: 135},
  {start: 285, end: 450, x: 125, y: 487, w: 810, h: 315},
  {start: 460, end: 610, x: 128, y: 810, w: 410, h: 305},
  {start: 615, end: 710, x: 253, y: 1210, w: 590, h: 120},
];
const Before: React.FC<{f: number}> = ({f}) => {
  const selected = focus.find((item) => f >= item.start && f < item.end);
  const opacity = selected ? Math.min(move(f, selected.start, selected.start + 16), move(f, selected.end - 16, selected.end, 1, 0)) : 0;
  return <Stage dark>
    <Poster />
    {selected && <div style={{position: 'absolute', left: selected.x, top: selected.y, width: selected.w, height: selected.h, border: '5px solid #fbe51c', borderRadius: 12, boxShadow: '0 0 23px #fbe51c88', opacity}} />}
  </Stage>;
};

const BeforeParts: React.FC<{f: number}> = ({f}) => <div style={{position: 'absolute', left: 70, top: 365, width: 1199, height: 1312, scale: .784, transformOrigin: 'top left', opacity: move(f, 0, 65)}}>
  <AssetLayer name="logo_before.png" x={75} y={42} visibleWidth={385} />
  <AssetLayer name="headline_cold_before.png" x={50} y={110} visibleWidth={700} />
  <AssetLayer name="headline_latte_before.png" x={62} y={190} visibleWidth={1010} />
  <div style={{opacity: 1 - move(f, 82, 138), translate: `${move(f, 82, 138, 0, 300)}px 0`}}><AssetLayer name="badge_new_before.png" x={765} y={10} visibleWidth={410} /></div>
  <div style={{opacity: 1 - move(f, 140, 197), translate: `${move(f, 140, 197, 0, -260)}px 0`}}><AssetLayer name="label_gentle_taste_before.png" x={72} y={765} visibleWidth={500} /></div>
  <div style={{opacity: 1 - move(f, 220, 280), translate: `0 ${move(f, 220, 280, 0, 230)}px`}}><AssetLayer name="button_order.png" x={220} y={1128} visibleWidth={770} /></div>
  <AssetLayer name="cup.png" x={560} y={205} visibleWidth={550} />
</div>;

const RemoveNoise: React.FC<{f: number}> = ({f}) => <Stage dark>
  <div style={{opacity: 1 - move(f, 0, 95)}}><Poster /></div>
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
  const posterOpacity = move(f, 370, 475);
  return <Stage>
    <div style={{opacity: .08 * (1 - posterOpacity)}}><Poster after x={60} y={250} w={960} /></div>
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
    <div style={{position: 'absolute', left: 85, top: 183, fontSize: 51, fontWeight: 800}}>ДО / ПОСЛЕ</div>
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

const AfterHold: React.FC<{f: number}> = () => <Stage><Poster after x={60} y={250} w={960} /></Stage>;

const Subscribe: React.FC<{f: number}> = ({f}) => <Stage>
  <div style={{opacity: 1 - move(f, 0, 46)}}><Poster after x={60} y={250} w={960} /></div>
  <div style={{position: 'absolute', inset: 0, background: cream, opacity: move(f, 0, 46)}} />
  <div style={{position: 'absolute', left: 84, top: 410, width: 770, fontSize: 72, lineHeight: 1.08, fontWeight: 800, letterSpacing: -3, opacity: move(f, 0, 36)}}>Хочешь больше<br />таких разборов?</div>
  <div style={{position: 'absolute', left: 85, top: 805, width: 710, fontSize: 43, lineHeight: 1.24, fontWeight: 500, opacity: move(f, 45, 85)}}>Подписывайся — здесь о дизайне, маркетинге и продвижении бизнеса без воды.</div>
  <div style={{position: 'absolute', left: 85, top: 1175, width: 615, height: 5, background: wine, scale: `${move(f, 80, 145)} 1`, transformOrigin: 'left center'}} />
  <div style={{position: 'absolute', left: 85, top: 1235, fontSize: 42, fontWeight: 800, opacity: move(f, 110, 155)}}>ПОДПИСЫВАЙСЯ ↗</div>
</Stage>;

const scenes = [Hook, Before, RemoveNoise, Hierarchy, ComposeAfter, After, Compare, AfterHold, Subscribe];

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
