export interface ItemConfiguration {
    extends?: string | string[];
    game_id?: number;
    examine?: string;
    tradable?: boolean;
    variations?: [{
        suffix: string;
    } & ItemConfiguration];
    weight?: number;
    equippable?: boolean;
    consumable?: boolean;
    destroy?: string | boolean;
    groups?: string[];
    equipment_data?: {
        equipment_slot: EquipmentSlot;
        equipment_type?: EquipmentType;
        requirements?: ItemRequirements;
        offensive_bonuses?: OffensiveBonuses;
        defensive_bonuses?: DefensiveBonuses;
        skill_bonuses?: SkillBonuses;
        weapon_info?: WeaponInfo;
    };
    // metadata?: ItemMetadata;
}

export type EquipmentSlot = 'head' | 'back' | 'neck' | 'main_hand' | 'off_hand' | 'torso' |
    'legs' | 'hands' | 'feet' | 'ring' | 'quiver' | '2h';

// export interface ItemMetadata {
//     [key: string]: unknown;
//     consume_effects?: {
//         replaced_by?: string;
//         clock: string; // Name of timer to be used for cooldown
//         skills?: {
//             [key in SkillName]: number | [number, number];
//         };
//         energy?: number | [number, number];
//         special: boolean;
//     };
// }

export type EquipmentType = 'hat' | 'helmet' | 'torso' | 'full_top' | 'one_handed' | 'two_handed';

export interface ItemRequirements {
    skills?: { [key: string]: number };
    quests?: { [key: string]: number };
}


export interface OffensiveBonuses {
    speed?: number;
    stab?: number;
    slash?: number;
    crush?: number;
    magic?: number;
    ranged?: number;
}

export interface DefensiveBonuses {
    stab?: number;
    slash?: number;
    crush?: number;
    magic?: number;
    ranged?: number;
}

export interface SkillBonuses {
    [key: string]: number;
}

export interface WeaponInfo {
    style: WeaponStyle;
    playerAnimations: any;
}

export type WeaponStyle = 'axe' | 'hammer' | 'bow' | 'claws' | 'crossbow' | 'slash_sword'
    | '2h_sword' | 'pickaxe' | 'halberd' | 'polestaff' | 'scythe' | 'spear' | 'mace'
    | 'dagger' | 'magical_staff' | 'darts' | 'unarmed' | 'whip' | 'gun';
