import styles from '@/styles/Header.module.css';
import Image from 'next/image';

export default function Header(){
    return (
        <div className={styles.header}>
            <div className={styles.header__stacked}>
                <div>
                    <span className={styles.header__stacked_header}>Technology</span>
                    <h2>The Impact of Technology on the Workplace: How Technology Is Changing</h2>
                </div>

                <div className={styles.header__author}>
                    <div className={styles.header__author_avatar}>
                        <Image
                            src='/images/avatarBlank2.svg'
                            width={28}
                            height={28}
                            alt='avatar'
                        />
                        <span>Tracey Wilson</span>
                    </div>
                    <span>August 20, 2022</span>
                </div>
            </div>
            <div className={styles.header__mainImage}>
                <Image
                    src='/images/castleNight.webp'
                    fill
                    sizes='100vw'
                    style={{objectFit: 'contain'}}
                    alt='castle at night'
                    priority
                />
            </div>
            <p>
            Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.
            One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.
            </p>
            
        </div>
    )
}