
export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

export type Archetype =
    // Guards
    | 'Playmaking Shot Creator' | '2-Way Slashing Playmaker' | 'Floor General' | 'Deep Range Shot Creator'
    | 'Lockdown Defender' | '3-Level Scorer' | 'Offensive Threat' | '2-Way 3-Level Scorer'
    | 'Slashing Playmaker' | 'Perimeter Lockdown' | 'Shot Creator'
    // Wings
    | '2-Way Slashing Fenom' | '2-Way Point Forward' | '3 & D Wing' | 'Versatile Scorer'
    | '2-Way Inside-Out Scorer' | 'Sharpshooter' | 'Slasher' | 'Point Forward' | 'Rebounding Wing'
    | 'Utility Wing' | '2-Way Finisher' | '2-Way Mid-Range Shooter'
    // Bigs
    | 'Paint Beast' | 'Post Anchor' | 'Glass-Cleaning Finisher' | 'Stretch Four' | 'Stretch Five'
    | 'Rim Protector' | 'Playmaking Glass Cleaner' | 'Interior Force' | 'Defensive Anchor'
    | 'Face-Up Four' | 'Glass Cleaner' | 'Hybrid Defender';

export type RatingAttribute =
    | 'midRangeScoring' | 'threePointScoring' | 'insideScoring' | 'dunking'
    | 'blocks' | 'rebounding' | 'passing' | 'steals' | 'ballHandling'
    | 'perimeterDefense' | 'postDefense' | 'athleticism';

export const ATTRIBUTE_LABELS: Record<RatingAttribute, string> = {
    midRangeScoring: 'Mid Range', threePointScoring: '3PT Shooting', insideScoring: 'Inside Scoring',
    dunking: 'Dunking', blocks: 'Blocks', rebounding: 'Rebounding', passing: 'Passing',
    steals: 'Steals', ballHandling: 'Ball Handling', perimeterDefense: 'Perimeter Def',
    postDefense: 'Post Defense', athleticism: 'Athleticism'
};

// 1-5 Scale: 5=Critical, 4=Important, 3=Average, 2=Minor, 1=Ignored
export const ARCHETYPE_WEIGHTS: Record<Archetype, Record<RatingAttribute, number>> = {
    // --- GUARDS ---
    'Playmaking Shot Creator': { passing: 4, ballHandling: 5, threePointScoring: 5, midRangeScoring: 5, insideScoring: 3, dunking: 2, perimeterDefense: 2, steals: 2, athleticism: 4, rebounding: 1, blocks: 1, postDefense: 1 },
    '2-Way Slashing Playmaker': { passing: 4, ballHandling: 4, dunking: 5, insideScoring: 4, perimeterDefense: 5, steals: 4, athleticism: 5, midRangeScoring: 3, threePointScoring: 2, rebounding: 2, blocks: 2, postDefense: 1 },
    'Floor General': { passing: 5, ballHandling: 5, threePointScoring: 4, midRangeScoring: 4, perimeterDefense: 4, steals: 4, insideScoring: 2, dunking: 1, athleticism: 3, rebounding: 1, blocks: 1, postDefense: 1 },
    'Deep Range Shot Creator': { threePointScoring: 5, ballHandling: 5, midRangeScoring: 4, passing: 4, insideScoring: 3, athleticism: 4, perimeterDefense: 2, steals: 2, dunking: 1, rebounding: 1, blocks: 1, postDefense: 1 },
    'Lockdown Defender': { perimeterDefense: 5, steals: 5, athleticism: 5, insideScoring: 3, passing: 2, ballHandling: 2, threePointScoring: 2, midRangeScoring: 2, dunking: 3, rebounding: 2, blocks: 2, postDefense: 2 },
    '3-Level Scorer': { threePointScoring: 5, midRangeScoring: 5, insideScoring: 4, ballHandling: 4, passing: 3, athleticism: 3, perimeterDefense: 2, steals: 2, dunking: 2, rebounding: 1, blocks: 1, postDefense: 1 },
    'Offensive Threat': { threePointScoring: 4, midRangeScoring: 4, insideScoring: 4, passing: 4, ballHandling: 4, athleticism: 3, perimeterDefense: 2, steals: 2, dunking: 2, rebounding: 1, blocks: 1, postDefense: 1 },
    '2-Way 3-Level Scorer': { threePointScoring: 4, midRangeScoring: 5, insideScoring: 4, perimeterDefense: 5, steals: 4, athleticism: 4, ballHandling: 3, passing: 3, dunking: 3, rebounding: 2, blocks: 2, postDefense: 2 },
    'Slashing Playmaker': { passing: 4, ballHandling: 4, dunking: 5, insideScoring: 5, athleticism: 5, rebounding: 3, perimeterDefense: 3, steals: 3, midRangeScoring: 2, threePointScoring: 2, blocks: 2, postDefense: 1 },
    'Perimeter Lockdown': { perimeterDefense: 5, steals: 4, threePointScoring: 3, passing: 3, ballHandling: 3, athleticism: 4, insideScoring: 2, midRangeScoring: 2, dunking: 2, rebounding: 2, blocks: 1, postDefense: 1 },
    'Shot Creator': { midRangeScoring: 5, ballHandling: 5, insideScoring: 4, threePointScoring: 3, passing: 3, athleticism: 4, perimeterDefense: 2, steals: 2, dunking: 3, rebounding: 1, blocks: 1, postDefense: 1 },

    // --- WINGS ---
    '2-Way Slashing Fenom': { dunking: 5, insideScoring: 5, perimeterDefense: 5, athleticism: 5, steals: 4, midRangeScoring: 4, ballHandling: 3, passing: 3, blocks: 3, rebounding: 3, threePointScoring: 2, postDefense: 2 },
    '2-Way Point Forward': { passing: 5, ballHandling: 4, perimeterDefense: 5, steals: 4, athleticism: 4, midRangeScoring: 3, insideScoring: 3, rebounding: 3, blocks: 3, threePointScoring: 2, dunking: 3, postDefense: 3 },
    '3 & D Wing': { threePointScoring: 5, perimeterDefense: 5, steals: 4, athleticism: 3, midRangeScoring: 2, insideScoring: 2, passing: 2, ballHandling: 2, dunking: 2, rebounding: 2, blocks: 2, postDefense: 2 },
    'Versatile Scorer': { threePointScoring: 5, midRangeScoring: 5, insideScoring: 5, ballHandling: 4, athleticism: 4, passing: 3, rebounding: 3, perimeterDefense: 3, blocks: 3, steals: 2, dunking: 3, postDefense: 2 },
    '2-Way Inside-Out Scorer': { perimeterDefense: 5, steals: 5, midRangeScoring: 5, threePointScoring: 4, insideScoring: 4, athleticism: 4, rebounding: 3, passing: 3, ballHandling: 3, blocks: 3, dunking: 3, postDefense: 3 },
    'Sharpshooter': { threePointScoring: 5, midRangeScoring: 4, passing: 2, ballHandling: 2, perimeterDefense: 2, steals: 2, athleticism: 2, insideScoring: 2, dunking: 1, rebounding: 1, blocks: 1, postDefense: 1 },
    'Slasher': { dunking: 5, insideScoring: 5, athleticism: 5, midRangeScoring: 4, ballHandling: 3, perimeterDefense: 3, steals: 3, rebounding: 3, passing: 3, blocks: 2, threePointScoring: 2, postDefense: 1 },
    'Point Forward': { passing: 5, ballHandling: 5, insideScoring: 4, rebounding: 4, athleticism: 4, midRangeScoring: 3, threePointScoring: 3, perimeterDefense: 3, steals: 2, dunking: 3, blocks: 2, postDefense: 2 },
    'Rebounding Wing': { rebounding: 5, insideScoring: 4, athleticism: 4, perimeterDefense: 3, blocks: 3, postDefense: 3, dunking: 3, steals: 3, passing: 2, ballHandling: 2, midRangeScoring: 2, threePointScoring: 1 },
    'Utility Wing': { perimeterDefense: 3, rebounding: 3, passing: 3, ballHandling: 3, insideScoring: 3, midRangeScoring: 3, threePointScoring: 3, athleticism: 3, steals: 3, blocks: 2, dunking: 2, postDefense: 2 },
    '2-Way Finisher': { dunking: 5, perimeterDefense: 5, athleticism: 5, insideScoring: 4, steals: 4, blocks: 4, rebounding: 4, passing: 2, ballHandling: 2, midRangeScoring: 2, threePointScoring: 1, postDefense: 3 },
    '2-Way Mid-Range Shooter': { midRangeScoring: 5, perimeterDefense: 5, steals: 4, athleticism: 3, insideScoring: 3, threePointScoring: 3, passing: 2, ballHandling: 2, dunking: 2, rebounding: 2, blocks: 2, postDefense: 2 },

    // --- BIGS ---
    'Paint Beast': { insideScoring: 5, dunking: 5, rebounding: 5, postDefense: 5, blocks: 5, athleticism: 4, passing: 2, ballHandling: 2, steals: 2, midRangeScoring: 1, threePointScoring: 1, perimeterDefense: 1 },
    'Post Anchor': { postDefense: 5, insideScoring: 5, midRangeScoring: 4, rebounding: 4, blocks: 4, passing: 3, ballHandling: 2, athleticism: 2, steals: 2, dunking: 3, threePointScoring: 1, perimeterDefense: 2 },
    'Glass-Cleaning Finisher': { rebounding: 5, dunking: 5, insideScoring: 5, blocks: 4, athleticism: 5, postDefense: 4, perimeterDefense: 3, steals: 3, passing: 2, ballHandling: 3, midRangeScoring: 2, threePointScoring: 1 },
    'Stretch Four': { threePointScoring: 5, midRangeScoring: 5, rebounding: 3, postDefense: 3, passing: 2, ballHandling: 2, insideScoring: 3, athleticism: 2, blocks: 2, perimeterDefense: 2, steals: 1, dunking: 2 },
    'Stretch Five': { threePointScoring: 5, blocks: 4, rebounding: 4, postDefense: 4, insideScoring: 3, midRangeScoring: 3, passing: 2, ballHandling: 1, athleticism: 2, perimeterDefense: 1, steals: 1, dunking: 2 },
    'Rim Protector': { blocks: 5, postDefense: 5, rebounding: 5, insideScoring: 3, dunking: 3, athleticism: 3, passing: 1, ballHandling: 1, steals: 1, perimeterDefense: 1, midRangeScoring: 1, threePointScoring: 1 },
    'Playmaking Glass Cleaner': { passing: 5, rebounding: 5, insideScoring: 4, midRangeScoring: 4, postDefense: 3, ballHandling: 4, threePointScoring: 3, athleticism: 2, blocks: 2, steals: 2, dunking: 2, perimeterDefense: 2 },
    'Interior Force': { insideScoring: 5, dunking: 5, athleticism: 5, rebounding: 4, postDefense: 3, ballHandling: 3, passing: 2, blocks: 3, steals: 2, midRangeScoring: 2, threePointScoring: 1, perimeterDefense: 2 },
    'Defensive Anchor': { postDefense: 5, blocks: 5, rebounding: 5, perimeterDefense: 3, athleticism: 3, insideScoring: 2, dunking: 2, passing: 3, steals: 2, ballHandling: 1, midRangeScoring: 1, threePointScoring: 1 },
    'Face-Up Four': { midRangeScoring: 5, insideScoring: 4, ballHandling: 4, athleticism: 4, rebounding: 3, threePointScoring: 3, passing: 3, postDefense: 3, perimeterDefense: 3, dunking: 3, blocks: 2, steals: 2 },
    'Glass Cleaner': { rebounding: 5, athleticism: 5, postDefense: 4, blocks: 3, perimeterDefense: 4, steals: 3, insideScoring: 2, dunking: 3, passing: 2, ballHandling: 2, midRangeScoring: 1, threePointScoring: 1 },
    'Hybrid Defender': { perimeterDefense: 5, postDefense: 5, rebounding: 4, blocks: 4, steals: 4, athleticism: 4, passing: 4, ballHandling: 3, insideScoring: 2, dunking: 2, midRangeScoring: 2, threePointScoring: 2 }
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

export function calculateOVR(attributes: PlayerAttributes, position: string, archetype?: string): number {
    let weights: Record<RatingAttribute, number>;

    // 1. Try Archetype Lookup
    if (archetype && Object.keys(ARCHETYPE_WEIGHTS).includes(archetype)) {
        weights = ARCHETYPE_WEIGHTS[archetype as Archetype];
    } else {
        // 2. Fallback to Simple Position Weights (Legacy/Safety)
        const posKey = (['PG', 'SG', 'SF', 'PF', 'C'].includes(position) ? position : 'PG') as Position;
        const POSITION_WEIGHTS: Record<Position, Record<RatingAttribute, number>> = {
            PG: { passing: 5, ballHandling: 5, threePointScoring: 4, midRangeScoring: 4, insideScoring: 3, dunking: 1, postDefense: 1, perimeterDefense: 4, blocks: 1, steals: 4, rebounding: 2, athleticism: 4 },
            SG: { passing: 3, ballHandling: 4, threePointScoring: 5, midRangeScoring: 4, insideScoring: 3, dunking: 2, postDefense: 1, perimeterDefense: 4, blocks: 1, steals: 3, rebounding: 2, athleticism: 4 },
            SF: { passing: 3, ballHandling: 3, threePointScoring: 4, midRangeScoring: 4, insideScoring: 4, dunking: 4, postDefense: 2, perimeterDefense: 5, blocks: 2, steals: 3, rebounding: 3, athleticism: 4 },
            PF: { passing: 2, ballHandling: 2, threePointScoring: 2, midRangeScoring: 3, insideScoring: 3, dunking: 4, postDefense: 5, perimeterDefense: 3, blocks: 4, steals: 2, rebounding: 5, athleticism: 4 },
            C: { passing: 1, ballHandling: 1, threePointScoring: 1, midRangeScoring: 2, insideScoring: 3, dunking: 5, postDefense: 5, perimeterDefense: 2, blocks: 5, steals: 1, rebounding: 5, athleticism: 3 }
        };
        weights = POSITION_WEIGHTS[posKey];
    }

    let totalScore = 0;
    let totalWeight = 0;

    (Object.keys(weights) as RatingAttribute[]).forEach((attr) => {
        const weight = weights[attr];
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
