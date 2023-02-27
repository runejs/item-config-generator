export type WikiItemWeaponType =
    "slash_sword" |
    "stab_sword" |
    "thrown" |
    "crossbow" |
    "blunt" |
    "bow" |
    "spear" |
    "pickaxe" |
    "2h_sword" |
    "axe" |
    "staff" |
    "scythe" |
    "spiked" |
    "claw" |
    "polearm" |
    "unarmed" |
    "banner" |
    "whip" |
    "gun" |
    "polestaff" |
    "chinchompas" |
    "salamander" |
    "bladed_staff" |
    "powered_staff" |
    "bludgeon" |
    "bulwark" |
    "partisan";

export interface WikiItem {
    id: number,
    name: string;
    last_updated: string;
    incomplete: boolean;
    members: boolean;
    tradeable: boolean;
    tradeable_on_ge: boolean;
    stackable: boolean;
    stacked: null | number;
    noted: boolean;
    noteable: boolean;
    // linked_id_item: null;
    // linked_id_noted: 1180;
    // linked_id_placeholder: 14118;
    // placeholder: false;
    equipable: boolean;
    equipable_by_player: boolean;
    equipable_weapon: boolean;
    cost: number;
    lowalch: number;
    highalch: number;
    weight: number;
    buy_limit: number;
    quest_item: boolean;
    release_date: string;
    duplicate: boolean;
    examine: string;
    icon: string;
    wiki_name: string;
    wiki_url: string;
    equipment?: WikiItemEquipment,
    weapon?: {
        attack_speed: number;
        weapon_type: WikiItemWeaponType;
        stances: unknown
    }
}

export interface WikiItemEquipment {
    attack_stab: number;
    attack_slash: number;
    attack_crush: number;
    attack_magic: number;
    attack_ranged: number;
    defence_stab: number;
    defence_slash: number;
    defence_crush: number;
    defence_magic: number;
    defence_ranged: number;
    melee_strength: number;
    ranged_strength: number;
    magic_damage: number;
    prayer: number;
    slot: WikiItemEquipmentSlot;
    requirements: Record<WikiItemEquipmentRequirementSkill, number>
}


export type WikiItemEquipmentSlot =
    "weapon" |
    "head" |
    "body" |
    "ammo" |
    "neck" |
    "feet" |
    "legs" |
    "ring" |
    "hands" |
    "2h" |
    "cape" |
    "shield";

type WikiItemEquipmentRequirementSkill =
    "attack" |
    "ranged" |
    "defence" |
    "mining" |
    "magic" |
    "strength" |
    "slayer" |
    "agility" |
    "thieving" |
    "prayer" |
    "hitpoints" |
    "combat" |
    "runecraft" |
    "herblore" |
    "crafting" |
    "fletching" |
    "construction" |
    "smithing" |
    "fishing" |
    "cooking" |
    "firemaking" |
    "woodcutting" |
    "farming" |
    "hunter";

