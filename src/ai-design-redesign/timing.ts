// Cuts follow measured pauses in the unmodified 61.727313-second voiceover.
// Scene 2 contains callouts; scene 7 is the before/after reveal.
export const FPS = 60;
export const AUDIO_SECONDS = 61.727313;
export const DURATION_FRAMES = Math.ceil(AUDIO_SECONDS * FPS);
export const sceneStarts = [0, 3.4, 15.27, 21.7, 30, 39.14, 48.85, 55.3, 56.1] as const;
export const sceneFrames = sceneStarts.map((seconds) => Math.round(seconds * FPS));
export const transitionFrames = 10;
