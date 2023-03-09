import {FC, useMemo, useState} from 'react';
import styles from "@/styles/Home.module.scss";
import WindowedSelect from "react-windowed-select";
import {components, createFilter} from "react-select";
import Image from "next/image";
import searchIcon from "@/public/Search.svg";
import clipboard from "@/public/Clipboard.svg";
import Editor, {Monaco} from "@monaco-editor/react";
import {WikiItem, WikiToItem} from "@/service/types/itemconfig/wiki-item";
import {useSearchableItems} from "@/service/item.service";

interface ItemConfigProps {
}
function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        // const msg = successful ? 'successful' : 'unsuccessful';
        // console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function handleEditorWillMount(monaco: Monaco) {
    monaco.editor.defineTheme("rjs", {
        base: 'vs',
        inherit: true,
        rules: [
            {token: '', foreground: '000000', background: 'fffffe'},
            {token: 'invalid', foreground: 'cd3131'},
            {token: 'emphasis', fontStyle: 'italic'},
            {token: 'strong', fontStyle: 'bold'},

            {token: 'variable', foreground: '001188'},
            {token: 'variable.predefined', foreground: '4864AA'},
            {token: 'constant', foreground: 'dd0000'},
            {token: 'comment', foreground: '008000'},
            {token: 'number', foreground: '098658'},
            {token: 'number.hex', foreground: '3030c0'},
            {token: 'regexp', foreground: '800000'},
            {token: 'annotation', foreground: '808080'},
            {token: 'type', foreground: '008080'},

            {token: 'delimiter', foreground: '000000'},
            {token: 'delimiter.html', foreground: '383838'},
            {token: 'delimiter.xml', foreground: '0000FF'},

            {token: 'tag', foreground: '800000'},
            {token: 'tag.id.pug', foreground: '4F76AC'},
            {token: 'tag.class.pug', foreground: '4F76AC'},
            {token: 'meta.scss', foreground: '800000'},
            {token: 'metatag', foreground: 'e00000'},
            {token: 'metatag.content.html', foreground: 'FF0000'},
            {token: 'metatag.html', foreground: '808080'},
            {token: 'metatag.xml', foreground: '808080'},
            {token: 'metatag.php', fontStyle: 'bold'},

            {token: 'key', foreground: '863B00'},
            {token: 'string.key.json', foreground: 'A31515'},
            {token: 'string.value.json', foreground: '0451A5'},

            {token: 'attribute.name', foreground: 'FF0000'},
            {token: 'attribute.value', foreground: '0451A5'},
            {token: 'attribute.value.number', foreground: '098658'},
            {token: 'attribute.value.unit', foreground: '098658'},
            {token: 'attribute.value.html', foreground: '0000FF'},
            {token: 'attribute.value.xml', foreground: '0000FF'},

            {token: 'string', foreground: 'A31515'},
            {token: 'string.html', foreground: '0000FF'},
            {token: 'string.sql', foreground: 'FF0000'},
            {token: 'string.yaml', foreground: '0451A5'},

            {token: 'keyword', foreground: '0000FF'},
            {token: 'keyword.json', foreground: '0451A5'},
            {token: 'keyword.flow', foreground: 'AF00DB'},
            {token: 'keyword.flow.scss', foreground: '0000FF'},

            {token: 'operator.scss', foreground: '666666'},
            {token: 'operator.sql', foreground: '778899'},
            {token: 'operator.swift', foreground: '666666'},
            {token: 'predefined.sql', foreground: 'C700C7'},
        ],
        colors: {
            'editor.background': '#FFFFFF',
            'editorLineNumber.foreground': '#3F424B',
            'editorLineNumber.activeForeground': '#8A8070',
            'editorGutter.background': '#DFD8CC',
            ['editorForeground']: '#000000',
            ['editorInactiveSelection']: '#E5EBF1',
            ['editorIndentGuides']: '#D3D3D3',
            ['editorActiveIndentGuides']: '#939393',
            ['editorSelectionHighlight']: '#ADD6FF4D'
        }
    })

}
const ItemConfig: FC<ItemConfigProps> = (props) => {
    const [data, setData] = useState<WikiItem | { error: string } | undefined>(undefined);
    const [copyBtnLabel, setCopyBtnLabel] = useState("Copy to clipboard");
    const searchable = useSearchableItems()

    const selectOptions = useMemo(() => searchable?.map((data) => ({
        label: data.name + ` [${data.id}]`,
        value: data.id
    })), [searchable])

    const getData = async (itemId: number | string) => {
        const req = await fetch(`https://raw.githubusercontent.com/0xNeffarion/osrsreboxed-db/master/docs/items-json/${itemId}.json`);

        if (req.status === 200) {
            setData(await req.json());
            setCopyBtnLabel("Copy to clipboard");
        } else {
            console.error({error: `Failed to get item with id ${itemId}`});
        }
    }
    const output = useMemo(() => {
        if (data === undefined) {
            return
        }
        if (data === null) {
            return
        }
        if ('error' in data) {
            return JSON.stringify(data, null, 2);
        }
        return JSON.stringify(WikiToItem(data), null, 2);


    }, [data])

    function copyTextToClipboard(text: string) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            setCopyBtnLabel("Something went wrong");
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            // console.log('Async: Copying to clipboard was successful!');
            setCopyBtnLabel("Copied configuration!");
        }, function(err) {
            setCopyBtnLabel("Something went wrong");
            console.error('Async: Could not copy text: ', err);
        });
    }

    return (
        <div className={styles.dataContainer}>
            <div className={styles.searchBoxWrapper}>
                <WindowedSelect
                    className={styles.searchBox}
                    components={{
                        Control: ({children, ...rest}) => (
                            <components.Control {...rest}><Image style={{paddingLeft: 8}} src={searchIcon}
                                                                alt={'Search'}/>{children}
                            </components.Control>)
                    }}
                    styles={{
                        placeholder: (base, state) => ({
                            ...base,
                            color: '#B4AC9E',
                            
                        }),
                        dropdownIndicator: (base) => ({
                            ...base,
                            color: '#B4AC9E',
                        }),
                        indicatorSeparator: (base) => ({
                            ...base,
                            backgroundColor: '#B4AC9E',
                        }),
                        input: (base) => ({
                            ...base,
                            color: '#B4AC9E',
                        }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? '#DFD8CC' : null,
                            color: state.isFocused ? '#3F424B' : '#B4AC9E',
                        })
                    }}
                    // @ts-ignore
                    onChange={(e: {label: string, value: number} | undefined) => {
                        if(e?.value) {
                            getData(e.value);
                        }
                    }}
                    placeholder={"Search for an item by name or id"}
                    isLoading={!searchable}
                    isClearable
                    options={selectOptions}
                    windowThreshold={100}
                    filterOption={createFilter({ ignoreAccents: false })}
                />
            </div>
            {output &&<div className={styles.editorWrapper}>
                <div className={styles.copyButton}>
                    <button onClick={(e) => copyTextToClipboard(output)}>
                        <Image style={{paddingRight: 4}} height={12} width={12} src={clipboard} alt={copyBtnLabel}/>
                        {copyBtnLabel}
                    </button>

                </div>
                 <Editor
                    beforeMount={handleEditorWillMount}
                    value={output}
                    className={styles.editor}
                    options={{
                        readOnly: true
                    }}
                    defaultLanguage="json"
                    theme={'rjs'}
                    defaultValue=""
                />
            </div>}
        </div>
    );
}

export default ItemConfig


