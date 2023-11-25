export type Score = {
  name: string;
  lap: number;
  pits: number;
  in_pit: boolean;
  finish: boolean;
  current_lap_time: string;
  lastround: string;
  last_lap_time: string;
};

export type RaceSnapshot = {
  time: string;
  timeMillis: number;
  score: Score[];
};

export enum PLAYBACK_STATE {
  READY = 0,
  PLAYING = 1,
  PAUSED = 2,
}
