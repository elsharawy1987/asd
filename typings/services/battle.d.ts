import { models } from '../../typings';
declare function BattleData(heroes: string[], monsters: string[]): models.server.BattleData;
declare function BattleInstance(data: models.server.BattleData, isNewBattle: boolean): models.server.Battle;
export declare const battle: {
    BattleInstance: typeof BattleInstance;
    BattleData: typeof BattleData;
};
export {};
