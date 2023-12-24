import { GameLevel, GameConfigActionType as GameConfigActionTypeEnum } from '@/enums/gameConfig';

type GameConfigState = {
  gameLevel: GameLevel;
};

type GameConfigActionTypePayload = Partial<GameConfigState>;

type GameConfigActionType = {
  type: GameConfigActionTypeEnum;
  payload: GameConfigActionTypePayload;
};
