export type BadgeCategory = 'OFFENSE' | 'DEFENSE' | 'PLAYMAKING' | 'MENTAL' | 'FINISHING';

export interface BadgeDefinition {
    id: string;
    name: string;
    category: BadgeCategory;
    description: string;
    spriteRow: number; // 0-3 (4 rows)
    spriteCol: number; // 0-7 (8 cols)
    qualify?: (stats: any) => boolean;
}

import { BENCHMARKS } from './benchmarks';

export const ALL_BADGES: Record<string, BadgeDefinition> = {
    // Row 1 (0)
    'sniper': {
        id: 'sniper', name: 'SNIPER', category: 'OFFENSE', description: 'Elite long-range shooting accuracy.',
        spriteRow: 0, spriteCol: 0,
        qualify: (s) => s.threePointPercentage >= BENCHMARKS.threePointPercentage || s.attributes?.threePointScoring >= 83
    },
    'middy_assassin': {
        id: 'middy_assassin', name: 'MIDDY-ASSASSIN', category: 'OFFENSE', description: 'Deadly form mid-range.',
        spriteRow: 0, spriteCol: 1,
        qualify: (s) => s.midRangePercentage >= BENCHMARKS.midRangePercentage
    },
    'its_money': {
        id: 'its_money', name: "EZ MONEY", category: 'OFFENSE', description: 'Free Throw shooting over 90%.',
        spriteRow: 0, spriteCol: 2,
        qualify: (s) => s.freeThrowPercentage >= 90.0
    },
    'mamba': {
        id: 'mamba', name: 'MAMBA', category: 'OFFENSE', description: 'Lethal scoring versatility.',
        spriteRow: 0, spriteCol: 3,
        // Manual assignment only for specific archetype
    },
    'volume_scorer': {
        id: 'volume_scorer', name: 'VOLUME SCORER', category: 'OFFENSE', description: 'Heats up after repeated attempts.',
        spriteRow: 0, spriteCol: 4,
        qualify: (s) => s.ppg >= 25.0
    },
    'bucket': {
        id: 'bucket', name: 'BUCKET', category: 'OFFENSE', description: 'Consistently finds way to score.',
        spriteRow: 0, spriteCol: 5,
        qualify: (s) => s.ppg >= 20.0
    },
    'rust_bucket': {
        id: 'rust_bucket', name: 'RUST BUCKET', category: 'OFFENSE', description: 'Scrappy scorer.',
        spriteRow: 0, spriteCol: 6
        // Manual
    },
    'bucriot': {
        id: 'bucriot', name: 'BUCRIOT', category: 'OFFENSE', description: 'Unstoppable scoring run.',
        spriteRow: 0, spriteCol: 7,
        qualify: (s) => s.ppg >= 28.0
    },

    // Row 2 (1)
    'rim_reapers': {
        id: 'rim_reapers', name: 'RIM REAPERS', category: 'FINISHING', description: 'Dominant finisher at the rim.',
        spriteRow: 1, spriteCol: 0,
        qualify: (s) => s.attributes?.dunking >= 85
    },
    'distro': {
        id: 'distro', name: 'DISTRO', category: 'PLAYMAKING', description: 'Elite ball distribution.',
        spriteRow: 1, spriteCol: 1,
        qualify: (s) => s.apg >= 8.0
    },
    'string_theory': {
        id: 'string_theory', name: 'STRING THEORY', category: 'PLAYMAKING', description: 'Complex dribbling and passing combos.',
        spriteRow: 1, spriteCol: 2,
        qualify: (s) => s.assistTurnoverRatio >= BENCHMARKS.assistTurnoverRatio
    },
    'dime_dropper': {
        id: 'dime_dropper', name: 'DIME DROPPER', category: 'PLAYMAKING', description: 'Precision passing highlights.',
        spriteRow: 1, spriteCol: 3,
        qualify: (s) => s.apg >= BENCHMARKS.assistsPerGame
    },
    'fast_track': {
        id: 'fast_track', name: 'FAST TRACK', category: 'PLAYMAKING', description: 'One-man fast break.',
        spriteRow: 1, spriteCol: 4
    },
    'lockdown_defender': {
        id: 'lockdown_defender', name: 'LOCKDOWN DEFENDER', category: 'DEFENSE', description: 'Shuts down opponents 1-on-1.',
        spriteRow: 1, spriteCol: 5,
        qualify: (s) => s.perimeterDefDiff <= BENCHMARKS.perimeterDefDiff
    },
    'stick_fingaz': {
        id: 'stick_fingaz', name: 'STICK FINGAZ', category: 'DEFENSE', description: 'High steal rate.',
        spriteRow: 1, spriteCol: 6,
        qualify: (s) => s.spg >= BENCHMARKS.stealsPerGame
    },
    'fly_swatter': {
        id: 'fly_swatter', name: 'FLY SWATTER', category: 'DEFENSE', description: 'Elite shot blocking.',
        spriteRow: 1, spriteCol: 7,
        qualify: (s) => s.bpg >= BENCHMARKS.blocksPerGame
    },

    // Row 3 (2)
    'back_board': {
        id: 'back_board', name: 'BACK BOARD!', category: 'DEFENSE', description: 'Pins shots against the glass.',
        spriteRow: 2, spriteCol: 0
    },
    'rejector': {
        id: 'rejector', name: 'REJECTOR', category: 'DEFENSE', description: 'Emphatic blocks.',
        spriteRow: 2, spriteCol: 1,
        qualify: (s) => s.bpg >= 2.0
    },
    'defensive_anchor': {
        id: 'defensive_anchor', name: 'DEFENSIVE ANCHOR', category: 'DEFENSE', description: 'Boosts team defense.',
        spriteRow: 2, spriteCol: 2
    },
    'big_dawg': {
        id: 'big_dawg', name: 'BIG DAWG', category: 'MENTAL', description: 'Physical dominance and leadership.',
        spriteRow: 2, spriteCol: 3
    },
    'glass_cleaner': {
        id: 'glass_cleaner', name: 'GLASS CLEANER', category: 'DEFENSE', description: 'Elite rebounding.',
        spriteRow: 2, spriteCol: 4,
        qualify: (s) => s.rpg >= BENCHMARKS.reboundsPerGame
    },
    'trip_dub': {
        id: 'trip_dub', name: 'TRIP-DUB', category: 'OFFENSE', description: 'Triple-double threat.',
        spriteRow: 2, spriteCol: 5, // Logic usually too complex for simple stat check, keep manual
    },
    'ironman': {
        id: 'ironman', name: 'IRONMAN', category: 'MENTAL', description: 'Never tires, high stamina.',
        spriteRow: 2, spriteCol: 6
    },
    'choker': {
        id: 'choker', name: 'CHOKER', category: 'MENTAL', description: 'Opposite of clutch (Negative).',
        spriteRow: 2, spriteCol: 7
    },

    // Row 4 (3)
    'game_changer': {
        id: 'game_changer', name: 'GAME CHANGER', category: 'MENTAL', description: 'Swings momentum.',
        spriteRow: 3, spriteCol: 0
    },
    'jack_frost': {
        id: 'jack_frost', name: 'JACK FROST', category: 'OFFENSE', description: 'Ice in veins.',
        spriteRow: 3, spriteCol: 1
    },
    'enferno': {
        id: 'enferno', name: 'ENFERNO', category: 'OFFENSE', description: 'On fire.',
        spriteRow: 3, spriteCol: 2,
        qualify: (s) => s.ppg >= 35.0 // Extremely hot
    },
    'captain': {
        id: 'captain', name: 'CAPTAIN', category: 'MENTAL', description: 'Team leader.',
        spriteRow: 3, spriteCol: 3
    },
    'mamba_mode': {
        id: 'mamba_mode', name: 'MAMBA MODE', category: 'MENTAL', description: 'Unstoppable focus.',
        spriteRow: 3, spriteCol: 4
    },
    'jack': {
        id: 'jack', name: 'JACK', category: 'OFFENSE', description: 'Unknown/Special.',
        spriteRow: 3, spriteCol: 5
    },
    'danger_close': {
        id: 'danger_close', name: 'DANGER CLOSE', category: 'OFFENSE', description: 'Effective in traffic.',
        spriteRow: 3, spriteCol: 6
    },
    'doubles': {
        id: 'doubles', name: 'DOUBLES', category: 'OFFENSE', description: 'Double-double machine.',
        spriteRow: 3, spriteCol: 7,
        qualify: (s) => (Number(s.ppg >= 10) + Number(s.rpg >= 10) + Number(s.apg >= 10)) >= 2
    },
};
