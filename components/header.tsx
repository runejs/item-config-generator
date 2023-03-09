import {FC} from 'react';
import styles from '@/styles/header.module.scss';
import Link from "next/link";
import Image from "next/image";
import logo from'@/public/Logo.png'
interface HeaderProps {
}

const Header: FC<HeaderProps> = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image src={logo} alt={'Runejs logo'} />
            </div>
            
            <div className={styles.links}>
                <Link href={'https://github.com/runejs/'}>Github</Link>
                <Link href={'https://discord.gg/5P74nSh'}>Discord</Link>
            </div>
        </header>
    );
}

export default Header


