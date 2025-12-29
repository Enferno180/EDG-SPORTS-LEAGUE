
const BENCHMARKS = {
    // Scoring
    fieldGoalPercentage: 50.0,  // Shaq, Kareem (Elite efficiency)
    threePointPercentage: 45.0, // Steve Kerr, Curry
    freeThrowPercentage: 90.0,  // Nash, Curry
    midRangePercentage: 52.0,   // Jordan, CP3
    insidePercentage: 70.0,     // Shaq, Gobert
    dunksPerSeason: 250,        // Dwight, Shaq

    // Playmaking
    assistTurnoverRatio: 4.0,   // CP3, Magic
    assistsPerGame: 11.5,       // Magic, Stockton
    turnoversPerGame: 1.5,      // CP3, Stockton (Low is better)

    // Defense & Rebounding
    reboundsPerGame: 15.0,      // Wilt, Rodman
    blocksPerGame: 4.0,         // Eaton, Hakeem
    stealsPerGame: 2.5,         // Alvin Robertson, MJ

    // Volume
    minutesPerGame: 36.0,       // Star Player Workload

    // Advanced
    perimeterDefDiff: -8.0,     // Kawhi, Payton (Opp FG% Drop)
    postDefAllowed: 35.0,       // Hakeem, Mutombo
};

export type BenchmarkGrade = 'LEGEND' | 'ELITE' | 'PRO' | 'ROOKIE' | 'DEV';

export function getBenchmarkGrade(value: number, benchmark: number, lowerIsBetter: boolean = false, statKey?: string, attempts?: number): BenchmarkGrade {
    // Special Case: Free Throws
    if (statKey === 'ftPct') {
        const minAttempts = 10;
        const currentAttempts = attempts ?? 0; // Default to 0 if unknown

        // Hard rule: Must have > 10 attempts to be ELITE or LEGEND
        if (currentAttempts < minAttempts) {
            // Cap at PRO if not enough volume
            const ratio = value / benchmark;
            if (ratio >= 0.70) return 'PRO';
            if (ratio >= 0.50) return 'ROOKIE';
            return 'DEV';
        }

        // User Request: ELITE >= 90%
        // Adjusting scale specifically for FT
        if (value >= 95.0) return 'LEGEND';
        if (value >= 90.0) return 'ELITE';
        if (value >= 80.0) return 'PRO';
        if (value >= 60.0) return 'ROOKIE';
        return 'DEV';
    }

    // Standard Logic for other stats
    const ratio = lowerIsBetter ? benchmark / value : value / benchmark;

    if (ratio >= 1.0) return 'LEGEND'; // 100% of benchmark
    if (ratio >= 0.85) return 'ELITE'; // 85% of benchmark
    if (ratio >= 0.70) return 'PRO';   // 70% of benchmark
    if (ratio >= 0.50) return 'ROOKIE';// 50% of benchmark
    return 'DEV';                      // <50%
}

export function getStatBenchmark(statKey: 'ppg' | 'rpg' | 'apg' | 'spg' | 'bpg' | 'fgPct' | 'threePtPct' | 'ftPct' | 'tov' | 'mpg'): number {
    switch (statKey) {
        case 'ppg': return 30.0; // Jordan/Wilt standard (Approx for high volume scoring)
        case 'rpg': return BENCHMARKS.reboundsPerGame;
        case 'apg': return BENCHMARKS.assistsPerGame;
        case 'spg': return BENCHMARKS.stealsPerGame;
        case 'bpg': return BENCHMARKS.blocksPerGame;
        case 'fgPct': return BENCHMARKS.fieldGoalPercentage;
        case 'threePtPct': return BENCHMARKS.threePointPercentage;
        case 'ftPct': return BENCHMARKS.freeThrowPercentage;
        case 'tov': return BENCHMARKS.turnoversPerGame;
        case 'mpg': return BENCHMARKS.minutesPerGame;
        default: return 999;
    }
}
