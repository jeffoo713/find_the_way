import { GameLevel, GameConfigActionType as GameConfigActionTypeEnum } from '@/enums/gameConfig';

export type GameConfigState = {
  gameLevel: GameLevel;
};

export type GameConfigActionTypePayload = Partial<GameConfigState>;

export type GameConfigActionType = {
  type: GameConfigActionTypeEnum;
  payload: GameConfigActionTypePayload;
};
