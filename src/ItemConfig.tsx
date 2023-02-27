import {FC, useEffect, useMemo, useState} from 'react';
import {WikiItem, WikiItemEquipment, WikiItemEquipmentSlot, WikiItemWeaponType} from "./types/wiki-item";
import {
    EquipmentSlot,
    ItemConfiguration,
    ItemRequirements,
    WeaponStyle
} from "./types/itemconfig";
import Select, {createFilter} from "react-select";
import WindowedSelect from 'react-windowed-select';


interface ItemConfigProps {
}

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


function WikiToRequirements(wikiItemEquipment: WikiItemEquipment): ItemRequirements | undefined {
    if (!wikiItemEquipment.requirements) {
        return undefined
    }
    return {skills: wikiItemEquipment.requirements};
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
    // gun: "gun",
    // partisan: "partisan",
    pickaxe: "pickaxe",
    polearm: "halberd",
    polestaff: "polestaff",
    powered_staff: "magical_staff",
    // salamander: "salamander",
    scythe: "scythe",
    slash_sword: "longsword",
    spear: "spear",
    spiked: "mace",
    stab_sword: "dagger",
    staff: "staff",
    thrown: "darts",
    unarmed: "unarmed",
    whip: "whip"
}
//|
//     | | 'halberd' | | 'mace'
//     | ;

function WikiToItem(data: WikiItem) {
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

type SearchableWikiItem = Pick<WikiItem, 'id' | 'name' | 'duplicate'> & { type: 'normal' | 'noted' | 'placeholder' };

function useSearchableItems() {
    const [searchableItems, setSearchableItems] = useState<SearchableWikiItem[]>();
    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/0xNeffarion/osrsreboxed-db/master/docs/items-search.json`).then(e => e.json()).then((data: SearchableWikiItem[]) => {
            setSearchableItems(Object.values(data).filter(i => i.type === 'normal'))
        })

    }, [])
    return searchableItems;
}

const ItemConfig: FC<ItemConfigProps> = (props) => {
    const [id, setId] = useState<string | number>();
    const [data, setData] = useState<WikiItem | { error: string } | undefined>(undefined);
    const searchable = useSearchableItems()

    const selectOptions = useMemo(() => searchable?.map((data) => ({
        label: data.name + ` [${data.id}]`,
        value: data.id
    })), [searchable])

    const output = useMemo(() => {
        if (data === undefined) {
            return "Enter valid gameid"
        }
        if (data === null) {
            return
        }
        if ('error' in data) {
            return JSON.stringify(data, null, 2);
        }
        return JSON.stringify(WikiToItem(data), null, 2);


    }, [data])

    const getData = async (itemId?: number | string) => {
        const req = await fetch(`https://raw.githubusercontent.com/0xNeffarion/osrsreboxed-db/master/docs/items-json/${itemId ?? id}.json`);

        if (req.status === 200) {
            setData(await req.json());
        } else {
            setData({error: `Failed to get item with id ${itemId ?? id}`});
        }

        // const req1 = await fetch(`https://raw.githubusercontent.com/0xNeffarion/osrsreboxed-db/master/docs/items-complete.json`);
        // let d: Record<string, WikiItem> = await req1.json();
        // let weapon = new Set();
        // for (const item of Object.values(d)) {
        //     if(item.equipment !== null) {
        //         if(item.equipment?.requirements !== null && item.equipment?.requirements.combat !== undefined){
        //             console.log(item);
        //         }
        //
        //     }

        // }
        // console.log([...weapon]);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center',
            paddingTop: '2rem'
        }}>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                minWidth: '30rem'

            }} onSubmit={(e) => {
                e.preventDefault();
                getData();
            }}>
                <div>
                    {/*// @ts-ignore*/}
                    <WindowedSelect onChange={(e: {label: string, value: number} | undefined) => {
                        setId(e?.value)
                        if(e?.value) {
                            getData(e.value);
                        }
                    }}
                                    placeholder={"Search for an id or item name"}
                                    isLoading={!searchable} isClearable options={selectOptions} windowThreshold={100}/>
                </div>
                {/*<div style={{*/}
                {/*    display: 'flex',*/}
                {/*}}>*/}
                {/*    <div>*/}
                {/*        <input value={id} onChange={(e) => setId(e.target.value)} placeholder={"ItemId"}/>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <button type={'submit'}>GO!</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </form>

            <div>
                <textarea id="output" cols={100} rows={50} value={output}/>
            </div>
        </div>
    );
}

export default ItemConfig


