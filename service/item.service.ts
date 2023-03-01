import {WikiItem} from "@/service/types/itemconfig/wiki-item";
import {useEffect, useState} from "react";

type SearchableWikiItem = Pick<WikiItem, 'id' | 'name' | 'duplicate'> & { type: 'normal' | 'noted' | 'placeholder' };

export function useSearchableItems() {
    const [searchableItems, setSearchableItems] = useState<SearchableWikiItem[]>();
    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/0xNeffarion/osrsreboxed-db/master/docs/items-search.json`).then(e => e.json()).then((data: SearchableWikiItem[]) => {
            setSearchableItems(Object.values(data).filter(i => i.type === 'normal'))
        })

    }, [])
    return searchableItems;
}
