import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Header from "@/components/header";
import WindowedSelect from 'react-windowed-select';
import {components} from 'react-select';
import searchIcon from '@/public/Search.svg'
import clipboard from '@/public/Clipboard.svg'
import Editor, {Monaco} from "@monaco-editor/react";
import ItemConfig from "@/components/ItemConfig";
// import { editorBackground, editorForeground, editorInactiveSelection, editorSelectionHighlight } from 'vs/platform/theme/common/colorRegistry';

const inter = Inter({subsets: ['latin']})

export default function Home() {


    return (
        <>
            <Head>
                <title>RuneJS Config Generator</title>
                <meta name="description" content="Item config generator compatible with runejs"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className={'content-padding'}>
                <div className={styles.container}>
                    <div>
                        <h1 className={'center'}>
                            Welcome to the RuneJS Config generator.
                        </h1>
                        <p className={'center'}>
                            Search and select for an item to generate its RuneJS compatible configuration.
                        </p>
                    </div>
                    <ItemConfig />
                </div>
            </main>
        </>
    )
}
