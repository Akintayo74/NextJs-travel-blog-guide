import Image from 'next/image';
import styles from './Hero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faToggleOff} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

export default function Hero(){
    return(
            <div className={styles.hero}>
                <div className={styles.hero__logo}>
                    <Image
                        src='/images/Logo.svg'
                        width={60}
                        height={60}
                        alt='logo'
                    />
                    <h2>MetaBlog</h2>
                </div>

                <div className={styles.hero__nav}>
                    <ul className={styles.hero__navLinks}>
                        <li>Home</li>
                        <li>Blog</li>
                        <li>Single Post</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className={styles.hero__search}>
                    <input type='search' placeholder='Search...'/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

                <div className={styles.hero__toggleState}>
                    <FontAwesomeIcon icon={faToggleOff} beat/>
                </div>
            
            </div>

    )
}