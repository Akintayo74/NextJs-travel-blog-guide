import Image from 'next/image';
import styles from '@/styles/Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faToggleOff, faToggleOn, faBars, faXmark} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { useRouter } from 'next/router';
import { AuthContext } from 'context/AuthContext';

export default function Hero(){
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Disable body scroll when menu is open on mobile/tablet
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        // Cleanup function
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    const { user, logout } = useContext(AuthContext);
    const router = useRouter();
    
    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

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
                
                {/* Hamburger Menu Button for Mobile/Tablet */}
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <FontAwesomeIcon 
                        icon={menuOpen ? faXmark : faBars} 
                        className={styles.hamburger__icon}
                    />
                </div>
                
                <div className={`${styles.hero__main} ${menuOpen ? styles.hero__main_active : ''}`}>
                    <div className={styles.hero__nav}>
                        <ul className={styles.hero__navLinks}>
                            <li>
                                <Link href='/' onClick={closeMenu}>Home</Link>
                            </li>
                            <li>
                                <Link href='/blog' onClick={closeMenu}>Blog</Link>
                            </li>
                            <li>
                                <Link href='/single-post' onClick={closeMenu}>Single Post</Link>
                            </li>
                            <li>
                                <Link href='/contact' onClick={closeMenu}>Contact</Link>
                            </li>
                            {user ? (
                                <>
                                    <li>
                                        <a onClick={() => {handleLogout(); closeMenu();}} style={{cursor: 'pointer'}}>Logout</a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href='/auth/login' onClick={closeMenu}>Login</Link>
                                    </li>
                                </>
                            )}
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
                            { mounted && (
                                <FontAwesomeIcon
                                    icon={theme === 'dark' ? faToggleOn : faToggleOff}
                                    style={{cursor: 'pointer'}}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}