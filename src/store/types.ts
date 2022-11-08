import type RootState from './RootState';

enum Game {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  FINISH = 'FINISH',
  RESTART = 'RESTART',
}

type RootContextProps = {
  rootState: RootState;
};

export { Game };

export type { RootContextProps };
