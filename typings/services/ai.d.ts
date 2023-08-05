import { models } from "../../typings";
declare function chooseAttackTarget(heroes: models.server.Entity[]): number;
declare function chooseHealTarget(monsters: models.server.Entity[]): number;
export declare const ai: {
    chooseAttackTarget: typeof chooseAttackTarget;
    chooseHealTarget: typeof chooseHealTarget;
};
export {};
