import Image from 'next/image';
import styles from '@/styles/Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faToggleOff} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Hero(){
    return(
        <div className={styles.hero}>
            <div className={styles.hero__container}>
                <div className={styles.hero__logo}>
                    <Image
                        src='/images/Logo.svg'
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

                        <div className={styles.hero__searchTheme_theme}>
                            <FontAwesomeIcon icon={faToggleOff} />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}