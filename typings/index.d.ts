export namespace models {
  namespace server {
    interface Condition {
      damage: number;
    }
    type Ability = {
      name: string;
      effects: string[];
      damage: number;
      hostile: boolean;
    }

    interface BasicEntities {
      [entity: string]: {
        baseHp: number;
        abilities: models.server.Ability[];
      };
    }

    interface Entity {
      hp: number;
      maxHp: number;
      abilities: Ability[];
      name: string;
      id: number;
      availableAction?: number;
      toIndex?: number;
      conditions: { temporary: { [name: string]: Condition }, permanent: { [name: string]: Condition } }
    }

    interface BattleData {
      round: number;
      monsters: Entity[];
      heroes: Entity[];
      actions: object[];
      mainSeed: number;
      remainingRolls: number;
      win: boolean | null;
    }

    interface Action {
      toIndex: number;
    }

    interface Battle {
      data: BattleData;
      rollForGroup(group: 'heroes' | 'monsters', indexes: number[]): any;
      nextRound(): any;
      resolveActions(casterGroup: 'heroes' | 'monsters', actions: Action[]): any;
    }
  }
}
