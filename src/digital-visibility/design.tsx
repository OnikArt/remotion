import type {CSSProperties, ReactNode} from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const C = {paper: '#F2F0E9', ink: '#101820', blue: '#1646F5', muted: '#A9AAA7', line: '#D2D2CC'} as const;
export const FONT = 'Bahnschrift, Arial, sans-serif';
export const DISPLAY = 'Bahnschrift, Arial Black, Arial, sans-serif';
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const inOut = Easing.bezier(0.76, 0, 0.24, 1);
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const useTimeline = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return {fps, second: Math.min(frame / fps, 21.3)};
};

export const move = (second: number, start: number, end: number, from = 0, to = 1) =>
  interpolate(second, [start, end], [from, to], {...clamp, easing: ease});

export const sweep = (second: number, start: number, end: number, from = 0, to = 1) =>
  interpolate(second, [start, end], [from, to], {...clamp, easing: inOut});

export const Label = ({children, dark = false, style}: {children: ReactNode; dark?: boolean; style?: CSSProperties}) =>
  <div style={{position: 'absolute', left: 82, top: 118, color: dark ? C.paper : C.ink, fontFamily: FONT, fontSize: 28, fontWeight: 600, letterSpacing: 2, ...style}}>{children}</div>;

export const Rule = ({top, left = 82, width = 916, color = C.line, style}: {top: number; left?: number; width?: number; color?: string; style?: CSSProperties}) =>
  <div style={{position: 'absolute', top, left, width, height: 2, backgroundColor: color, ...style}} />;

export const Headline = ({children, style}: {children: ReactNode; style?: CSSProperties}) =>
  <div style={{fontFamily: DISPLAY, fontWeight: 900, letterSpacing: -4, lineHeight: .94, ...style}}>{children}</div>;

export const PosterBase = ({dark = false, children}: {dark?: boolean; children: ReactNode}) =>
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: dark ? C.ink : C.paper, color: dark ? C.paper : C.ink, fontFamily: FONT}}>{children}</div>;

export const Grid = ({dark = false}: {dark?: boolean}) => <>
  {[82, 310, 540, 770, 998].map((x) => <div key={x} style={{position: 'absolute', top: 200, bottom: 200, left: x, width: 1, backgroundColor: dark ? '#33414A' : '#D8D8D1', opacity: .45}} />)}
  {[360, 960, 1560].map((y) => <div key={y} style={{position: 'absolute', left: 82, right: 82, top: y, height: 1, backgroundColor: dark ? '#33414A' : '#D8D8D1', opacity: .45}} />)}
</>;
