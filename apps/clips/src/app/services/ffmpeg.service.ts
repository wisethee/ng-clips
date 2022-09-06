import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  isReady = false;

  private ffmpeg;

  constructor() {
    this.ffmpeg = createFFmpeg({ log: true });
  }

  async init() {
    if (this.isReady) {
      return;
    }

    await this.ffmpeg.load();
    this.isReady = true;
  }

  async getScreenshots(file: File) {
    const data = await fetchFile(file);
    this.ffmpeg.FS('writeFile', file.name, data);

    const seconds = [3, 6, 9];
    const commands: string[] = [];

    seconds.forEach((second, index) => {
      commands.push(
        '-i',
        file.name,
        '-ss',
        `00:00:${second}`,
        '-frames:v',
        '1',
        '-filter:v',
        'scale=540:-1',
        `output_0${index + 1}.png`
      );
    });

    await this.ffmpeg.run(...commands);
  }
}
