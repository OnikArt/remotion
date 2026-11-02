import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const BG = '#111116';
const WHITE = '#FFFFFF';
const ORANGE = '#FF7043';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const smooth = Easing.bezier(0.22, 1, 0.36, 1);
const motion = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: smooth} as const;

const Create: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wipe = interpolate(frame, [66, 85], [0, 100], motion);
  return <AbsoluteFill style={{clipPath: `inset(0 ${wipe}% 0 0)`}}>
    <div style={{position: 'absolute', left: 82, top: 665, display: 'flex', color: WHITE, fontSize: 188, fontWeight: 900, letterSpacing: -12, lineHeight: 1}}>
      {'CREATE'.split('').map((letter, i) => {
        const rise = spring({frame: frame - i * 5, fps, config: {damping: 21, stiffness: 115, mass: .85}});
        return <span key={i} style={{display: 'inline-block', overflow: 'hidden', height: 205}}><span style={{display: 'inline-block', translate: `0 ${(1 - rise) * 215}px`}}>{letter}</span></span>;
      })}
    </div>
    <div style={{position: 'absolute', left: 86, top: 898, width: 895, height: 12, backgroundColor: ORANGE, transformOrigin: 'left center', scale: `${interpolate(frame, [30, 59], [0, 1], motion)} 1`}} />
    <div style={{position: 'absolute', left: 87, top: 950, color: WHITE, fontSize: 34, fontWeight: 700, letterSpacing: 7}}>MAKE SOMETHING MOVE</div>
  </AbsoluteFill>;
};

const GeometryAndFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const f = Math.min(frame, 219);
  const scene = f - 70;
  const reveal = interpolate(f, [69, 88], [0, 1450], motion);
  const toFinal = interpolate(f, [143, 184], [0, 1], motion);
  const orbit = interpolate(f, [83, 145], [0, 1], motion);
  const titleReveal = interpolate(f, [151, 184], [0, 100], motion);
  const squareSpring = spring({frame: scene - 7, fps, config: {damping: 22, stiffness: 100}});

  return <AbsoluteFill style={{clipPath: `circle(${reveal}px at 50% 49%)`}}>
    <div style={{position: 'absolute', left: interpolate(toFinal, [0, 1], [132, -125]), top: interpolate(toFinal, [0, 1], [530, 280]), width: interpolate(toFinal, [0, 1], [816, 1330]), height: interpolate(toFinal, [0, 1], [816, 1330]), border: `9px solid ${WHITE}`, borderRadius: '50%', boxSizing: 'border-box', rotate: `${orbit * 115}deg`}} />
    <div style={{position: 'absolute', left: interpolate(f, [70, 112, 145, 181], [455, 265, 570, 86], motion), top: interpolate(f, [70, 112, 145, 181], [790, 655, 900, 1055], motion), width: interpolate(f, [70, 100, 145, 181], [40, 440, 310, 910], motion), height: interpolate(f, [70, 100, 145, 181], [40, 440, 310, 12], motion), backgroundColor: ORANGE, rotate: `${interpolate(f, [70, 118, 147, 181], [-35, 135, 225, 360], motion)}deg`, scale: interpolate(squareSpring, [0, 1], [.1, 1], clamp), transformOrigin: 'center center'}} />
    <div style={{position: 'absolute', left: interpolate(f, [80, 122, 147, 184], [100, 40, 105, -160], motion), top: interpolate(f, [80, 122, 147, 184], [1030, 690, 990, 1310], motion), width: 970, height: 8, backgroundColor: WHITE, rotate: `${interpolate(f, [80, 115, 145, 184], [-30, 37, -18, 0], motion)}deg`, scale: `${interpolate(f, [80, 105, 184], [.1, 1, 1], motion)} 1`, opacity: interpolate(f, [145, 175], [1, 0], clamp)}} />
    <div style={{position: 'absolute', left: 87, top: 1380, color: WHITE, fontSize: 34, fontWeight: 700, letterSpacing: 5, opacity: interpolate(f, [130, 156], [1, 0], motion)}}>SHAPE / SPACE / RHYTHM</div>
    <div style={{position: 'absolute', left: 80, top: 785, width: 930, height: 225, overflow: 'hidden', clipPath: `inset(0 ${100 - titleReveal}% 0 0)`}}>
      <div style={{color: WHITE, fontSize: 172, fontWeight: 900, letterSpacing: -10, lineHeight: 1.2, whiteSpace: 'nowrap', translate: `0 ${interpolate(f, [151, 184], [80, 0], motion)}px`}}>INSPIRE.</div>
    </div>
    <div style={{position: 'absolute', left: 87, top: 1100, color: WHITE, fontSize: 44, fontWeight: 700, letterSpacing: 8, opacity: interpolate(f, [172, 198], [0, 1], motion)}}>KEEP MOVING.</div>
  </AbsoluteFill>;
};

export const SwissMotionPortfolio: React.FC = () => <AbsoluteFill style={{backgroundColor: BG, fontFamily: 'Arial, Helvetica, sans-serif'}}>
  <div style={{position: 'absolute', top: 112, left: 86, color: WHITE, fontSize: 29, fontWeight: 700, letterSpacing: 3}}>01 / FORM</div>
  <div style={{position: 'absolute', top: 112, right: 86, width: 64, height: 6, backgroundColor: ORANGE}} />
  <div style={{position: 'absolute', bottom: 112, left: 86, color: WHITE, opacity: .7, fontSize: 27, fontWeight: 700, letterSpacing: 2}}>MOTION STUDY / 2026</div>
  <Create />
  <GeometryAndFinal />
</AbsoluteFill>;
