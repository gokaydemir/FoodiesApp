
import Link from 'next/link';
import Image from 'next/image';
import NavLink from './nav-link'
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css'
import MainHeaderBackground from './main-header-background';

export default function MainHeader() {

    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image className={classes.Image} src={logoImg} alt='A plate with food on it' priority />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li><NavLink href="/meals">Browse Meals</NavLink></li>
                        <li><NavLink href="/community">Foodies Community</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}