import { ALL_BADGES } from '@/lib/badges';

interface BadgeProps {
    badgeId: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function Badge({ badgeId, size = 'md' }: BadgeProps) {
    // 1. Try direct lookup (best case, ID matches)
    let badge = ALL_BADGES[badgeId];

    // 2. If not found, try to find by Name (case-insensitive) - handles data.ts legacy format
    if (!badge) {
        const found = Object.values(ALL_BADGES).find(b =>
            b.name.toLowerCase() === badgeId.toLowerCase() ||
            b.id.toLowerCase() === badgeId.toLowerCase()
        );
        if (found) badge = found;
    }

    if (!badge) return null;

    const sizeClasses = {
        'sm': 'w-16 h-auto',
        'md': 'w-24 h-auto',
        'lg': 'w-32 h-auto'
    };

    // Use badge ID for filename, ensuring consistency
    const badgeImagePath = `/badges/${badge.id}.jpg`;

    return (
        <div className="flex flex-col items-center group relative cursor-help">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs p-2 rounded z-20 whitespace-nowrap border border-white/20">
                <p className="font-bold">{badge.name}</p>
                <p className="text-gray-300">{badge.description}</p>
            </div>

            {/* Badge Image */}
            <img
                src={badgeImagePath}
                alt={badge.name}
                className={`${sizeClasses[size]} object-contain transform transition-transform group-hover:scale-110 drop-shadow-lg`}
                onError={(e) => {
                    // Fallback if image fails (optional, could show text)
                    e.currentTarget.style.display = 'none';
                }}
            />
        </div>
    );
}
