
import React from 'react';

const iconProps = {
    className: "w-full h-full",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    'aria-hidden': "true",
};

export const ClosedEnvelopeIcon: React.FC = () => (
    <svg {...iconProps}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

export const SpyIcon: React.FC = () => (
    <svg {...iconProps}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export const BrokenEnvelopeIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M22 14.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9.5" />
        <path d="m22 6-10 7L2 6" />
        <path d="m15 19-3-3 3-3" />
        <path d="m19 19-3-3 3-3" />
        <path d="m18 22 4-4" />
        <path d="m18 18 4 4" />
    </svg>
);

export const AlarmIcon: React.FC = () => (
    <svg {...iconProps}><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path><path d="M12 2c-3.86 0-7 3.14-7 7v5.58c0 .53-.21 1.04-.59 1.41l-1.41 1.41c-.78.78-.29 2.18.88 2.18h16.24c1.17 0 1.66-1.4.88-2.18l-1.41-1.41c-.38-.37-.59-.88-.59-1.41V9c0-3.86-3.14-7-7-7z"></path><path d="M18.8 4.2C16.8 2.2 14.5 1 12 1s-4.8 1.2-6.8 3.2"></path></svg>
);

export const HappyUsersIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M18 8a4 4 0 0 1 4 4v2" />
        <path d="M22 18a4 4 0 0 0-4-4" />
        <circle cx="19.5" cy="8" r="4" />
    </svg>
);

export const LockIcon: React.FC = () => (
    <svg {...iconProps}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

export const CheckCircleIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export const ShieldCheckIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

export const BugIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M20 8.82a7.5 7.5 0 0 0-3.5-3.5" />
        <path d="M4 8.82a7.5 7.5 0 0 1 3.5-3.5" />
        <path d="M12 20.5a7.5 7.5 0 0 1-7.5-7.5v-3a7.5 7.5 0 0 1 15 0v3a7.5 7.5 0 0 1-7.5 7.5" />
        <path d="m14 12-4-3" />
        <path d="m10 12 4-3" />
        <path d="M12 15a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1" />
    </svg>
);

export const FishHookIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M16.5 5.5a4.5 4.5 0 1 0-9 0" />
        <path d="M12 10v10" />
        <path d="M12 20a2 2 0 1 0-4 0" />
    </svg>
);

export const ServerIcon: React.FC = () => (
    <svg {...iconProps}>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
);

export const BrainCircuitIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M12 5a3 3 0 1 0-5.993.25" />
        <path d="M12.25 8A3 3 0 1 0 18 5" />
        <path d="M12 12a3 3 0 1 0 .25 5.993" />
        <path d="M14 8.25A3 3 0 1 0 8 12" />
        <path d="M14 15.75a3 3 0 1 0 5.993-.25" />
        <path d="M9.75 14A3 3 0 1 0 4 17" />
        <path d="M12 19a3 3 0 1 0-.25-5.993" />
        <path d="M10 15.75A3 3 0 1 0 4 19" />
    </svg>
);

export const UserSearchIcon: React.FC = () => (
    <svg {...iconProps}>
        <circle cx="10" cy="10" r="7" />
        <path d="m21 21-4.3-4.3" />
        <path d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        <path d="M10 17c-2.209 0-4 1.791-4 4" />
    </svg>
);

export const PlayCircleIcon: React.FC = () => (
    <svg {...iconProps}>
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
);

export const CalendarIcon: React.FC = () => (
    <svg {...iconProps}>
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

export const PointerIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
    </svg>
);

export const DocumentTextIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

export const QuestionMarkCircleIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);


export const iconMap: Record<string, React.FC> = {
    ShieldCheckIcon,
    ServerIcon,
    BugIcon,
    FishHookIcon,
    HappyUsersIcon,
    CheckCircleIcon,
    SpyIcon,
    BrokenEnvelopeIcon,
    ClosedEnvelopeIcon,
    AlarmIcon,
    BrainCircuitIcon,
    UserSearchIcon,
    PlayCircleIcon,
    CalendarIcon,
    PointerIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    LockIcon,
};
