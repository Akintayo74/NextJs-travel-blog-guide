import Image from 'next/image';
import styles from '@/styles/Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export default function Hero(){
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const logoSrc = theme === 'dark' ? '/images/Logo3.svg' : '/images/Logo.svg';

    return(
        <div className={styles.hero}>
            <div className={styles.hero__container}>
                <div className={styles.hero__logo}>
                    <Image
                        src={logoSrc}
                        width={45}
                        height={45}
                        alt='logo'
                    />
                    <p>Meta<span>Blog</span></p>
                </div>
                
                <div className={styles.hero__main}>
                    <div className={styles.hero__nav}>
                        <ul className={styles.hero__navLinks}>
                            <li>
                                <Link href='/'>Home</Link>
                            </li>
                            <li>
                                <Link href='/blog'>Blog</Link>
                            </li>
                            <li>
                                <Link href='/single-post'>Single Post</Link>
                            </li>
                            <li>
                                <Link href='/contact'>Contact</Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className={styles.hero__searchTheme}>
                        <div className={styles.hero__searchTheme_search}>
                            <input type='search' placeholder='Search...'/>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>

                        <div
                            className={styles.hero__searchTheme_theme}
                            onClick={toggleTheme}
                            role='button'
                            aria-label={`Switch to ${theme === 'light' ? 'light' : 'dark'} mode`}
                        >
                            { mounted &&(
                                <FontAwesomeIcon
                                    icon={theme==='dark' ? faToggleOn : faToggleOff}
                                    style={{cursor: 'pointer'}}
                                />
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}