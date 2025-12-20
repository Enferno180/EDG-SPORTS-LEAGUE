
export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

export type RatingAttribute =
    | 'midRangeScoring'
    | 'threePointScoring'
    | 'insideScoring'
    | 'dunking'
    | 'blocks'
    | 'rebounding'
    | 'passing'
    | 'steals'
    | 'ballHandling'
    | 'perimeterDefense'
    | 'postDefense'
    | 'athleticism';

export const ATTRIBUTE_LABELS: Record<RatingAttribute, string> = {
    midRangeScoring: 'Mid Range',
    threePointScoring: '3PT Shooting',
    insideScoring: 'Inside Scoring',
    dunking: 'Dunking',
    blocks: 'Blocks',
    rebounding: 'Rebounding',
    passing: 'Passing',
    steals: 'Steals',
    ballHandling: 'Ball Handling',
    perimeterDefense: 'Perimeter Def',
    postDefense: 'Post Defense',
    athleticism: 'Athleticism'
};

// Weights provided by user (1-5 scale) - Mapped to new keys
export const POSITION_WEIGHTS: Record<Position, Record<RatingAttribute, number>> = {
    PG: {
        passing: 5, ballHandling: 5, threePointScoring: 4, midRangeScoring: 4, insideScoring: 3,
        dunking: 1, postDefense: 1, perimeterDefense: 4, blocks: 1, steals: 4,
        rebounding: 2, athleticism: 4
    },
    SG: {
        passing: 3, ballHandling: 4, threePointScoring: 5, midRangeScoring: 4, insideScoring: 3,
        dunking: 2, postDefense: 1, perimeterDefense: 4, blocks: 1, steals: 3,
        rebounding: 2, athleticism: 4
    },
    SF: {
        passing: 3, ballHandling: 3, threePointScoring: 4, midRangeScoring: 4, insideScoring: 4,
        dunking: 4, postDefense: 2, perimeterDefense: 5, blocks: 2, steals: 3,
        rebounding: 3, athleticism: 4
    },
    PF: {
        passing: 2, ballHandling: 2, threePointScoring: 2, midRangeScoring: 3, insideScoring: 3,
        dunking: 4, postDefense: 5, perimeterDefense: 3, blocks: 4, steals: 2,
        rebounding: 5, athleticism: 4
    },
    C: {
        passing: 1, ballHandling: 1, threePointScoring: 1, midRangeScoring: 2, insideScoring: 3,
        dunking: 5, postDefense: 5, perimeterDefense: 2, blocks: 5, steals: 1,
        rebounding: 5, athleticism: 3
    }
};

export interface PlayerAttributes {
    midRangeScoring: number;
    threePointScoring: number;
    insideScoring: number;
    dunking: number;
    blocks: number;
    rebounding: number;
    passing: number;
    steals: number;
    ballHandling: number;
    perimeterDefense: number;
    postDefense: number;
    athleticism: number;
}

export function calculateOVR(attributes: PlayerAttributes, position: string): number {
    // Default to PG weights if position string is weird (or parse it properly)
    const posKey = (['PG', 'SG', 'SF', 'PF', 'C'].includes(position) ? position : 'PG') as Position;

    const weights = POSITION_WEIGHTS[posKey];
    let totalScore = 0;
    let totalWeight = 0;

    (Object.keys(weights) as RatingAttribute[]).forEach((attr) => {
        const weight = weights[attr];
        // Ensure attribute exists, default to 50 if missing
        const value = attributes[attr] || 50;

        totalScore += value * weight;
        totalWeight += weight;
    });

    if (totalWeight === 0) return 0;

    return Math.round(totalScore / totalWeight);
}

export function getTier(ovr: number): 'Prospect' | 'Starter' | 'AllStar' | 'Superstar' | 'Legend' {
    if (ovr >= 95) return 'Legend';
    if (ovr >= 90) return 'Superstar';
    if (ovr >= 85) return 'AllStar';
    if (ovr >= 75) return 'Starter';
    return 'Prospect';
}
