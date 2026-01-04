export const COMBINE_BENCHMARKS = {
    vertical: { elite: 42, floor: 20 },      // Inches (Higher is better)
    sprint: { elite: 3.0, floor: 4.0 },    // Seconds (Lower is better) - mapped to 'speed'
    agility: { elite: 10.4, floor: 13.0 },  // Seconds (Lower is better)
    strength: { elite: 20, floor: 0 }        // Reps (Higher is better)
};

export type DrillType = 'sprint' | 'agility' | 'vertical' | 'strength';

export function calculateCombineRating(result: number, drill: DrillType): number {
    const { elite, floor } = COMBINE_BENCHMARKS[drill];
    let score;

    if (drill === 'sprint' || drill === 'agility') {
        // Lower time = higher score
        score = ((floor - result) / (floor - elite)) * 99;
    } else {
        // Higher number = higher score
        score = ((result - floor) / (elite - floor)) * 99;
    }

    // Clamping: Ensure score is between 1 and 99
    return Math.min(Math.max(Math.round(score), 1), 99);
}
