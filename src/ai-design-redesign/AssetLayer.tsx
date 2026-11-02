import React from 'react';
import {Img, staticFile} from 'remotion';

// Alpha bounds measured from the supplied files (alpha > 16). They keep
// transparent margins from changing the visible scale and placement.
const bounds = {
  'logo_before.png': {size: [2132, 737], box: [23, 160, 2105, 587]},
  'logo_after.png': {size: [2135, 736], box: [226, 259, 1930, 497]},
  'headline_cold_before.png': {size: [2121, 741], box: [18, 22, 2096, 630]},
  'headline_cold_after.png': {size: [2135, 736], box: [114, 218, 2026, 501]},
  'headline_latte_before.png': {size: [2135, 736], box: [0, 18, 2134, 705]},
  'headline_latte_after.png': {size: [2135, 736], box: [24, 15, 2112, 712]},
  'headline_ice.png': {size: [1798, 875], box: [14, 29, 1785, 845]},
  'badge_new_before.png': {size: [2135, 736], box: [186, 68, 1970, 656]},
  'badge_new_after.png': {size: [1774, 887], box: [300, 80, 1465, 793]},
  'label_gentle_taste_before.png': {size: [1774, 887], box: [14, 17, 1755, 851]},
  'button_order.png': {size: [2135, 736], box: [37, 171, 2099, 582]},
  'features_after.png': {size: [2135, 736], box: [65, 90, 2075, 634]},
  'text_refreshing_lightness.png': {size: [2135, 736], box: [202, 197, 1931, 560]},
  'cup.png': {size: [1049, 1500], box: [112, 19, 958, 1455]},
} as const;

export type LayerName = keyof typeof bounds;

export const AssetLayer: React.FC<{
  name: LayerName;
  x: number;
  y: number;
  visibleWidth: number;
  opacity?: number;
}> = ({name, x, y, visibleWidth, opacity = 1}) => {
  const {size, box} = bounds[name];
  const scale = visibleWidth / (box[2] - box[0]);
  return <Img
    src={staticFile(`references/ai-design-redesign/${name}`)}
    style={{
      position: 'absolute',
      left: x - box[0] * scale,
      top: y - box[1] * scale,
      width: size[0] * scale,
      height: size[1] * scale,
      opacity,
    }}
  />;
};
