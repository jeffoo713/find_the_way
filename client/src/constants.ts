import { GameLevel } from './enums/gameConfig';

export const GAME_LEVEL_NAME: Record<Exclude<GameLevel, GameLevel.NULL>, string> = {
  [GameLevel.EASY]: 'EASY',
  [GameLevel.MODERATE]: 'MODERATE',
  [GameLevel.HARD]: 'HARD',
  [GameLevel.SUPER_HARD]: 'SUPER HARD',
};

export const GAME_LEVEL_TITLES: Record<Exclude<GameLevel, GameLevel.NULL>, string> = {
  [GameLevel.EASY]: 'EASY: 5X5',
  [GameLevel.MODERATE]: 'MODERATE: 6X6',
  [GameLevel.HARD]: 'HARD: 7X7',
  [GameLevel.SUPER_HARD]: 'SUPER HARD: 8X8',
};

export const GAME_LEVEL_STYLES = (
  styles: Record<string, string>,
): Record<Exclude<GameLevel, GameLevel.NULL>, string> => ({
  [GameLevel.EASY]: styles.level_easy,
  [GameLevel.MODERATE]: styles.level_moderate,
  [GameLevel.HARD]: styles.level_hard,
  [GameLevel.SUPER_HARD]: styles.level_super_hard,
});
