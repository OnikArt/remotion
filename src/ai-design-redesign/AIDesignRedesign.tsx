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
  <div style={{position: 'absolute', left: 80, top: 205, fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: .94, color: '#fff9ef'}}>ТВОЙ ДИЗАЙН</div>
  <div style={{position: 'absolute', left: 77, top: 330, fontSize: 140, fontWeight: 800, letterSpacing: -8, lineHeight: .92, color: 'white'}}>ВЫГЛЯДИТ</div>
  <div style={{position: 'absolute', left: 70, top: 530, width: 940, height: 235, borderRadius: 22, background: '#ffe500', rotate: '-3.5deg', boxShadow: '0 22px 40px #11030055', scale: move(f, 0, 28, .98, 1)}} />
  <div style={{position: 'absolute', left: 98, top: 538, fontSize: 170, fontWeight: 800, letterSpacing: -11, lineHeight: 1, color: '#100c06', rotate: '-3.5deg'}}>ДЁШЕВО.</div>
  <div style={{position: 'absolute', left: 365, top: 752, width: 550, height: 12, borderRadius: 8, background: '#ed260f', rotate: '-5deg'}} />
  <div style={{position: 'absolute', left: 88, top: 818, fontSize: 56, fontWeight: 600, letterSpacing: -2, color: 'white'}}>И ВОТ ПОЧЕМУ</div>
  <div style={{position: 'absolute', left: 86, top: 1055, width: 445, height: 490, rotate: '-6deg', translate: `0 ${move(f, 0, 45, 12, 0)}px`, borderRadius: 18, overflow: 'hidden', border: '4px solid #e4ad82', boxShadow: '0 25px 45px #0009'}}>
    <Img src={src('poster_before.png')} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
  </div>
  <div style={{position: 'absolute', left: 541, top: 962, width: 445, height: 595, rotate: '5deg', translate: `0 ${move(f, 0, 45, -10, 0)}px`, borderRadius: 18, overflow: 'hidden', border: '4px solid #f6d8b7', boxShadow: '0 28px 50px #000a'}}>
    <Img src={src('poster_after.png')} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
  </div>
  <div style={{position: 'absolute', left: 65, top: 990, width: 112, height: 112, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#e93227', color: 'white', fontSize: 83, fontWeight: 800, boxShadow: '0 10px 20px #0008'}}>×</div>
  <div style={{position: 'absolute', left: 900, top: 917, width: 112, height: 112, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#18bd22', color: 'white', fontSize: 76, fontWeight: 800, boxShadow: '0 10px 20px #0008'}}>✓</div>
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
  {target: 'orderButton', start: 0, end: 135},
  {target: 'features', start: 135, end: 215},
  {target: 'headline', start: 215, end: 330},
  {target: 'newBadge', start: 330, end: 430},
];
const FocusHighlight: React.FC<{target: Target; opacity: number}> = ({target, opacity}) => {
  const {x, y, scale} = beforePlacement;
  const geometry = targets[target];
  if ('path' in geometry) return <svg viewBox="0 0 1199 1312" style={{position: 'absolute', left: x, top: y, width: 1199 * scale, height: 1312 * scale, opacity, overflow: 'visible', filter: 'drop-shadow(0 0 12px #fbe77b99)'}}><path d={geometry.path} fill="none" stroke="#fbe77b" strokeWidth="4" strokeLinejoin="round" /></svg>;
  return <>{geometry.boxes.map((box, index) => <div key={index} style={{position: 'absolute', left: x + box.x * scale, top: y + box.y * scale, width: box.w * scale, height: box.h * scale, border: '3px solid #fbe77b', borderRadius: 8, boxShadow: '0 0 0 4px #220a0955, 0 0 18px #fbe77b99', opacity, boxSizing: 'border-box'}} />)}</>;
};
const PosterReveal: React.FC<{f: number}> = () => <Stage dark>
  <div style={{position: 'absolute', left: 70, top: 250, fontSize: 44, fontWeight: 800, color: '#ffe500'}}>ИИ: ИСХОДНЫЙ ВАРИАНТ</div>
  <Poster />
</Stage>;

const Problems: React.FC<{f: number}> = ({f}) => {
  const selected = focus.find((item) => f >= item.start && f < item.end);
  const opacity = selected ? Math.min(move(f, selected.start, selected.start + 16), move(f, selected.end - 16, selected.end, 1, 0)) : 0;
  return <Stage dark>
    <div style={{position: 'absolute', left: 70, top: 250, fontSize: 44, fontWeight: 800, color: '#ffe500'}}>ИИ: ИСХОДНЫЙ ВАРИАНТ</div>
    <Poster />
    {selected && <FocusHighlight target={selected.target} opacity={opacity} />}
  </Stage>;
};

const BeforeParts: React.FC<{f: number}> = ({f}) => <div style={{position: 'absolute', left: beforePlacement.x, top: beforePlacement.y, width: 1199, height: 1312, scale: beforePlacement.scale, transformOrigin: 'top left', opacity: move(f, 235, 280)}}>
  <AssetLayer name="logo_before.png" x={75} y={42} visibleWidth={385} />
  <AssetLayer name="headline_cold_before.png" x={50} y={110} visibleWidth={700} />
  <AssetLayer name="headline_latte_before.png" x={62} y={190} visibleWidth={1010} />
  <div style={{opacity: 1 - move(f, 335, 405), translate: `${move(f, 335, 405, 0, 300)}px 0`}}><AssetLayer name="badge_new_before.png" x={765} y={10} visibleWidth={410} /></div>
  <div style={{opacity: 1 - move(f, 390, 465), translate: `${move(f, 390, 465, 0, -260)}px 0`}}><AssetLayer name="label_gentle_taste_before.png" x={72} y={765} visibleWidth={500} /></div>
  <div style={{opacity: 1 - move(f, 465, 555), translate: `0 ${move(f, 465, 555, 0, 230)}px`}}><AssetLayer name="button_order.png" x={220} y={1128} visibleWidth={770} /></div>
  <div style={{position: 'absolute', left: 62, top: 474, width: 480, color: 'white', fontSize: 43, fontWeight: 750, lineHeight: 1.45, opacity: 1 - move(f, 285, 375), translate: `${move(f, 285, 375, 0, -65)}px 0`}}>
    {['Натуральный кофе', 'Освежающий вкус', 'Лёгкая текстура', 'Идеальный для лета'].map((line) => <div key={line} style={{display: 'flex', alignItems: 'start', gap: 22, whiteSpace: 'nowrap'}}><span style={{color: '#16ed08', fontSize: 62, fontWeight: 800, lineHeight: 1}}>✓</span><span>{line}</span></div>)}
  </div>
  <AssetLayer name="cup.png" x={560} y={205} visibleWidth={550} />
</div>;

const RemoveNoise: React.FC<{f: number}> = ({f}) => <Stage dark>
  <div style={{opacity: 1 - move(f, 235, 280)}}><Poster /></div>
  <BeforeParts f={f} />
  <div style={{position: 'absolute', left: 80, top: 164, fontSize: 39, fontWeight: 800, color: '#ffe500', opacity: move(f, 0, 55)}}>ИСПРАВЛЯЕМ ЗА 4 ШАГА</div>
  <div style={{position: 'absolute', left: 80, top: 225, fontSize: 54, fontWeight: 800, opacity: move(f, 120, 175)}}>01 / УБИРАЕМ МУСОР</div>
</Stage>;

const Hierarchy: React.FC<{f: number}> = ({f}) => {
  const active = f < 152 ? -1 : f < 252 ? 0 : f < 342 ? 1 : 2;
  const notes = [
    ['01', 'ОДИН ГЛАВНЫЙ ЗАГОЛОВОК'],
    ['02', 'ПРОДУКТ В ЦЕНТРЕ ВНИМАНИЯ'],
    ['03', 'ОСТАЛЬНОЕ — НА ВТОРОМ ПЛАНЕ'],
  ];
  return <Stage>
    <div style={{position: 'absolute', left: 75, top: 174, fontSize: 52, fontWeight: 800, letterSpacing: -2}}>02 / ВЫСТРАИВАЕМ ИЕРАРХИЮ</div>
    <div style={{position: 'absolute', left: 75, top: 350, fontSize: 29, fontWeight: 800, color: '#8e1b12'}}>ИИ: ИСХОДНЫЙ ВАРИАНТ</div>
    <Img src={src('poster_before.png')} style={{position: 'absolute', left: 75, top: 420, width: 420, height: 420 * 1312 / 1199, objectFit: 'contain', boxShadow: '0 18px 36px #3a161538'}} />
    <div style={{position: 'absolute', left: 545, top: 350, fontSize: 29, fontWeight: 800, color: wine, opacity: move(f, 0, 40)}}>ДИЗАЙН: ПОСЛЕ ДОРАБОТКИ</div>
    <Img src={src('poster_after.png')} style={{position: 'absolute', left: 545, top: 420, width: 465, height: 465 * 1448 / 1086, objectFit: 'contain', boxShadow: '0 18px 36px #3a161538', opacity: move(f, 0, 40)}} />
    <div style={{position: 'absolute', left: 75, top: 1105, width: 935, height: 3, background: wine, opacity: .5}} />
    {notes.map(([number, label], i) => <div key={number} style={{position: 'absolute', left: 75, top: 1165 + i * 127, width: 935, height: 100, display: 'flex', alignItems: 'center', gap: 30, borderBottom: '1px solid #64181244', opacity: move(f, [152, 252, 342][i], [175, 275, 365][i], .15, 1)}}>
      <span style={{fontSize: 50, fontWeight: 800, color: active === i ? '#ad351e' : wine}}>{number}</span>
      <span style={{fontSize: 38, fontWeight: 800, letterSpacing: -1}}>{label}</span>
    </div>)}
  </Stage>;
};

// Individual approved cutouts assemble the hierarchy; the exact raster takes
// over before the scene ends because some provided mattes contain background residue.
const ComposeAfter: React.FC<{f: number}> = ({f}) => {
  const posterOpacity = move(f, 175, 270);
  return <Stage>
    <div style={{position: 'absolute', left: 70, top: 132, fontSize: 46, fontWeight: 800, letterSpacing: -1}}>03 / ИСПРАВЛЯЕМ КОМПОЗИЦИЮ</div>
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

const BrandStyle: React.FC<{f: number}> = ({f}) => <Stage>
  <div style={{position: 'absolute', left: 70, top: 125, fontSize: 48, fontWeight: 800}}>04 / ФИРМЕННЫЙ СТИЛЬ</div>
  <div style={{opacity: move(f, 0, 35)}}><Poster after x={60} y={250} w={960} /></div>
  <div style={{position: 'absolute', left: 80, top: 1660, display: 'flex', gap: 44, fontSize: 34, fontWeight: 800, opacity: move(f, 80, 140)}}><span>ЛОГОТИП</span><span>·</span><span>ШРИФТЫ</span><span>·</span><span>ОТСТУПЫ</span></div>
</Stage>;

const Compare: React.FC<{f: number}> = ({f}) => {
  const left = 65, top = 277, width = 950, height = 1267;
  const split = linear(f, 10, 175, .025, .975);
  const line = left + width * split;
  return <Stage>
    <div style={{position: 'absolute', left: 65, top: 183, fontSize: 48, fontWeight: 800}}>ПОСЛЕ</div>
    <div style={{position: 'absolute', right: 65, top: 183, fontSize: 48, fontWeight: 800}}>ДО</div>
    <div style={{position: 'absolute', left, top, width, height, background: '#27120e', overflow: 'hidden', boxShadow: '0 28px 65px #32120c55'}}>
      <Img src={src('poster_after.png')} style={{position: 'absolute', inset: -35, width: width + 70, height: height + 70, objectFit: 'cover', filter: 'blur(35px)', opacity: .65}} />
      <Img src={src('poster_after.png')} style={{position: 'absolute', inset: 0, width, height, objectFit: 'contain'}} />
      <div style={{position: 'absolute', inset: 0, background: '#27120e', clipPath: `inset(0 0 0 ${split * 100}%)`}}>
        <Img src={src('poster_before.png')} style={{position: 'absolute', inset: -35, width: width + 70, height: height + 70, objectFit: 'cover', filter: 'blur(35px)', opacity: .65}} />
        <Img src={src('poster_before.png')} style={{position: 'absolute', inset: 0, width, height, objectFit: 'contain'}} />
      </div>
    </div>
    <div style={{position: 'absolute', left: line - 3, top, width: 6, height, background: ivory, boxShadow: '0 0 18px #240b0b88'}} />
    <div style={{position: 'absolute', left: line - 39, top: top + height / 2 - 39, width: 78, height: 78, borderRadius: '50%', display: 'grid', placeItems: 'center', background: ivory, border: `4px solid ${wine}`, fontSize: 35, fontWeight: 800}}>‹›</div>
  </Stage>;
};

const PromptGuide: React.FC<{f: number}> = ({f}) => <Stage dark>
  <div style={{position: 'absolute', left: 80, top: 205, fontSize: 58, fontWeight: 800, letterSpacing: -2}}>ПРОМПТ — ЭТО ЧЁТКОЕ ТЗ</div>
  <div style={{position: 'absolute', left: 80, top: 360, width: 910, height: 3, background: '#ffe500'}} />
  {[
    ['01', 'КОМПОЗИЦИЯ', 'Продукт — в центре кадра'],
    ['02', 'ИЕРАРХИЯ', 'Один главный заголовок'],
    ['03', 'ОГРАНИЧЕНИЯ', 'Без плашек, галочек и лишнего CTA'],
  ].map(([number, title, detail], i) => <div key={number} style={{position: 'absolute', left: 80, top: 435 + i * 345, width: 910, height: 275, padding: '45px 50px', boxSizing: 'border-box', background: '#fff0df', color: wine, borderRadius: 18, boxShadow: '0 20px 35px #0004', opacity: move(f, [85, 205, 335][i], [115, 235, 365][i], .18, 1), translate: `0 ${move(f, [85, 205, 335][i], [115, 235, 365][i], 24, 0)}px`}}>
    <div style={{fontSize: 38, fontWeight: 800, color: '#a4321b'}}>{number}</div>
    <div style={{fontSize: 65, fontWeight: 800, letterSpacing: -2}}>{title}</div>
    <div style={{fontSize: 31, fontWeight: 500}}>{detail}</div>
  </div>)}
</Stage>;

const Subscribe: React.FC<{f: number}> = ({f}) => <Stage>
  <div style={{position: 'absolute', inset: 0, background: cream}} />
  <div style={{position: 'absolute', left: 85, top: 435, width: 800, fontSize: 76, lineHeight: 1.08, fontWeight: 800, letterSpacing: -3}}>ХОЧЕШЬ ГОТОВЫЙ<br />ПРОМПТ?</div>
  <div style={{position: 'absolute', left: 85, top: 760, width: 770, height: 3, background: wine}} />
  <div style={{position: 'absolute', left: 85, top: 840, fontSize: 43, fontWeight: 700, opacity: move(f, 125, 145)}}>НАПИШИ В DIRECT</div>
  <div style={{position: 'absolute', left: 85, top: 990, padding: '23px 50px', borderRadius: 20, background: wine, color: ivory, boxShadow: '0 18px 35px #64181230', fontSize: 95, fontWeight: 800, letterSpacing: -3, opacity: move(f, 165, 190), translate: `0 ${move(f, 165, 190, 16, 0)}px`}}>ПРОМПТ ↗</div>
  <div style={{position: 'absolute', left: 85, top: 1370, fontSize: 32, fontWeight: 600, opacity: .85}}>ХОЧЕШЬ БОЛЬШЕ РАЗБОРОВ?</div>
  <div style={{position: 'absolute', left: 85, top: 1440, fontSize: 39, fontWeight: 800}}>ПОДПИСЫВАЙСЯ ↗</div>
</Stage>;

const scenes = [Hook, PosterReveal, Problems, RemoveNoise, Hierarchy, ComposeAfter, BrandStyle, Compare, PromptGuide, Subscribe];

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
