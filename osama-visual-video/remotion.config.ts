import { Config } from '@remotion/cli/config';

// High-quality H.264 + AAC for LinkedIn, Instagram Reels and TikTok.
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(18);
Config.setPixelFormat('yuv420p');
Config.setAudioCodec('aac');
Config.setAudioBitrate('192k');
Config.setOverwriteOutput(true);

// Optional: point Remotion at an existing Chrome/Chromium headless shell.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
