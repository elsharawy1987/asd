import { Request, Response } from 'express';
declare function newBattle(req: any, res: any): Promise<void>;
declare function latestBattle(req: any, res: any): Promise<void>;
declare function submitActions(req: Request, res: Response): Promise<void>;
declare function roll(req: Request, res: Response): Promise<void>;
export declare const battleController: {
    newBattle: typeof newBattle;
    latestBattle: typeof latestBattle;
    submitActions: typeof submitActions;
    roll: typeof roll;
};
export {};
