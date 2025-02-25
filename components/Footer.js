import styles from '@/styles/Footer.module.css';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const Footer = ( {isBlueLogo = false} ) => {

    const { theme } = useContext(ThemeContext);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    const getLogoSrc = () => {
        if (mounted && theme === 'dark') {
            return '/images/Logo3.svg';
        }
        
        return isBlueLogo ? '/images/Logo2.svg' : '/images/Logo.svg';
    };

    const logoSrc = getLogoSrc();

    return(
        <div className={styles.footer}>

            <div className={styles.footer__info}>
                <div className={styles.footer__aboutSection}>
                    <h3>About</h3>
                    <span className={styles.footer__lorem}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut rutrum purus. Etiam lacinia quam at feugiat semper. Mauris imperdiet eros pulvinar massa convallis, vel lacinia nibh pharetra. Vestibulum gravida.</p>
                    </span>
                    <div className={styles.footer__contact}>
                        <p><span>Email: </span>info@jstemplate.net</p>
                        <p><span>Phone: </span>880 123 456 789</p>
                    </div>
                </div>

                <div className={styles.footer__links}>
                    <div className={styles.footer__quickLinks}>
                        <h3>Quick link</h3>
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Blog</li>
                            <li>Archived</li>
                            <li>Author</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className={styles.footer__category}>
                        <h3>Category</h3>
                        <ul>
                            <li>Lifestyle</li>
                            <li>Technology</li>
                            <li>Travel</li>
                            <li>Business</li>
                            <li>Economy</li>
                            <li>Sports</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footer__newsletter}>
                    <div className={styles.footer__newsletterHeading}>
                        <h2>Weekly Newsletter</h2>
                        <span>Get blog articles and offers via email</span>
                    </div>
                    <div className={styles.footer__inputNewsletter}>
                        <div className={styles.footer__inputNewsletter_input}>
                            <input placeholder='Your Email' />
                            <Image 
                                src='/images/mail.svg'
                                width={20}
                                height={20}
                                alt='A mail svg image'
                            />
                        </div>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>

            <hr className={styles.footer__hr}/>

            <div className={styles.footer__copyright}>
                <div className={styles.footer__logo}>
                    <Image
                        src={logoSrc}
                        width={48}
                        height={48}
                        alt='logo'
                    />
                    <div className={styles.footer__meta}>
                        <p>Meta<span>Blog</span></p>
                        <span>&copy;JS Template 2023. All Rights Reserved.</span>
                    </div>
                </div>

                <div className={styles.footer__terms}>
                    <a className={styles.footer__vl}>Terms of Use</a>
                    <a className={styles.footer__vl}>Privacy Policy</a>
                    <a className={styles.footer__vl}>Cookie Policy</a>
                </div>
            </div>

        </div>
    )
}

export default Footer;