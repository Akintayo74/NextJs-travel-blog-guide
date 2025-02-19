import styles from './Footer.module.css';

const Footer = () => {
    return(
        <div className={styles.footer}>

            <div className={styles.footer__info}>
                <div className={styles.footer__aboutSection}>
                    <h3>About</h3>
                    <div className={styles.footer__about}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut rutrum purus. Etiam lacinia quam at feugiat semper. Mauris imperdiet eros pulvinar massa convallis, vel lacinia nibh pharetra. Vestibulum gravida.</p>
                    </div>
                    <div className={styles.footer__contact}>

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
                    <div>
                        <h2>Weekly Newsletter</h2>
                        <span>Get blog articles and offers via email</span>
                    </div>
                    <div className={styles.footer__inputNewsletter}>
                        <input placeholder='Your Email'/>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>

            <hr></hr>

            <div className={styles.footer__copyright}>
                <h2>MetaBlog</h2>
            </div>

        </div>
    )
}

export default Footer;