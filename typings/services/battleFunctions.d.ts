import { models } from "../../typings";
export declare function rollForGroup(data: models.server.BattleData): (group: 'heroes' | 'monsters', chosenIndexes: number[]) => void;
export declare function nextRound(data: models.server.BattleData): () => void;
export declare function resolveActions(data: models.server.BattleData): (casterGroup: 'heroes' | 'monsters', actions: models.server.Action[] | undefined) => void;
export declare function checkCompletion(data: models.server.BattleData): boolean;
