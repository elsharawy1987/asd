declare function getPlayer(req: any, res: any): Promise<void>;
declare function createPlayer(req: any, res: any): Promise<void>;
export declare const playerController: {
    getPlayer: typeof getPlayer;
    createPlayer: typeof createPlayer;
};
export {};
