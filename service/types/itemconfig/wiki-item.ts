import {EquipmentSlot, ItemConfiguration, ItemRequirements} from "@/service/types/itemconfig/itemconfig";

const WikiToEquipSlot: Record<WikiItemEquipmentSlot, EquipmentSlot> = {
    "2h": '2h',
    ammo: 'quiver',
    body: 'torso',
    cape: 'back',
    feet: 'feet',
    hands: 'hands',
    head: 'head',
    legs: 'legs',
    neck: 'neck',
    ring: 'ring',
    shield: 'off_hand',
    weapon: 'main_hand'
}


// @ts-ignore
const WikiToWeaponStyle: Record<Partial<WikiItemWeaponType>, WeaponStyle | undefined> = {
    "2h_sword": "2h_sword",
    axe: "axe",
    // banner: "banner",
    // bladed_staff: "bladed_staff",
    // bludgeon: "bludgeon",
    blunt: "hammer",
    bow: "bow",
    // bulwark: "bulwark",
    // chinchompas: "chinchompas",
    claw: "claws",
    crossbow: "crossbow",
    gun: "gun",
    // partisan: "partisan",
    pickaxe: "pickaxe",
    polearm: "halberd",
    polestaff: "polestaff",
    // powered_staff: "magical_staff",
    // salamander: "salamander",
    scythe: "scythe",
    slash_sword: "slash_sword",
    spear: "spear",
    spiked: "mace",
    stab_sword: "dagger",
    staff: "magical_staff",
    thrown: "darts",
    unarmed: "unarmed",
    whip: "whip"
}


export function WikiToItem(data: WikiItem) {
    const resultItem: ItemConfiguration = {
        // extends?: string | string[];
        game_id: data.id,
        examine: data.examine,
        tradable: data.tradeable,
        // variations?: [{
        //     suffix: string;
        // } & ItemConfiguration];
        weight: data.weight,
        equippable: data.equipable
        // consumable?: boolean;
        // destroy?: string | boolean;
        // groups?: string[];
    }
    if (data.equipment) {
        resultItem.equipment_data = {
            equipment_slot: WikiToEquipSlot[data.equipment.slot],
            // equipment_type? : EquipmentType;
            requirements: WikiToRequirements(data.equipment!),
            offensive_bonuses: {
                speed: data.weapon?.attack_speed,
                stab: data.equipment.attack_stab,
                slash: data.equipment.attack_slash,
                crush: data.equipment.attack_crush,
                magic: data.equipment.attack_magic,
                ranged: data.equipment.attack_ranged
            },
            defensive_bonuses: {
                stab: data.equipment.defence_stab,
                slash: data.equipment.defence_slash,
                crush: data.equipment.defence_crush,
                magic: data.equipment.defence_magic,
                ranged: data.equipment.defence_ranged
            },
            // defensive_bonuses? : DefensiveBonuses;
            skill_bonuses: {
                prayer: data.equipment.prayer,
                strength: data.equipment.melee_strength,
                ranged: data.equipment.ranged_strength,
                magic: data.equipment.magic_damage,
            },
        }
        if (data.weapon) {
            const style = WikiToWeaponStyle[data.weapon.weapon_type]
            resultItem.equipment_data.weapon_info = {
                style: style ?? 'unarmed',
                playerAnimations: undefined
            }
        }

    }

    return resultItem

}


function WikiToRequirements(wikiItemEquipment: WikiItemEquipment): ItemRequirements | undefined {
    if (!wikiItemEquipment.requirements) {
        return undefined
    }
    return {skills: wikiItemEquipment.requirements};
}


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

