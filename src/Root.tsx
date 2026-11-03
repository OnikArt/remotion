import {Composition} from 'remotion';
import {SwissMotionPortfolio} from './Composition';
import {DigitalVisibilityReel} from './digital-visibility/DigitalVisibilityReel';
import {CafeLaunchReel} from './cafe-launch/CafeLaunchReel';
import {AIDesignRedesign} from './ai-design-redesign/AIDesignRedesign';
import {MacOSJustStart} from './macos-just-start/MacOSJustStart';

export const RemotionRoot: React.FC = () => <>
  <Composition id="SwissMotionPortfolio" component={SwissMotionPortfolio} durationInFrames={240} fps={30} width={1080} height={1920} />
  <Composition id="DigitalVisibilityReel" component={DigitalVisibilityReel} durationInFrames={1320} fps={60} width={1080} height={1920} />
  <Composition id="CafeLaunchReel" component={CafeLaunchReel} durationInFrames={1800} fps={60} width={1080} height={1920} />
  <Composition id="AIDesignRedesign" component={AIDesignRedesign} durationInFrames={3704} fps={60} width={1080} height={1920} />
  <Composition id="MacOSJustStart" component={MacOSJustStart} durationInFrames={1800} fps={60} width={1080} height={1920} />
</>;
