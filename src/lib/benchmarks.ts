
export const BENCHMARKS = {
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

    // Advanced
    perimeterDefDiff: -8.0,     // Kawhi, Payton (Opp FG% Drop)
    postDefAllowed: 35.0,       // Hakeem, Mutombo
};

export type BenchmarkGrade = 'LEGEND' | 'ELITE' | 'PRO' | 'ROOKIE' | 'DEV';

export function getBenchmarkGrade(value: number, benchmark: number, lowerIsBetter: boolean = false): BenchmarkGrade {
    // For stats where lower is better (like turnovers), invert the ratio
    const ratio = lowerIsBetter ? benchmark / value : value / benchmark;

    if (ratio >= 1.0) return 'LEGEND'; // 100% of benchmark
    if (ratio >= 0.85) return 'ELITE'; // 85% of benchmark
    if (ratio >= 0.70) return 'PRO';   // 70% of benchmark
    if (ratio >= 0.50) return 'ROOKIE';// 50% of benchmark
    return 'DEV';                      // <50%
}

export function getStatBenchmark(statKey: 'ppg' | 'rpg' | 'apg' | 'spg' | 'bpg' | 'fgPct' | 'threePtPct' | 'ftPct' | 'tov'): number {
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
        default: return 999;
    }
}
