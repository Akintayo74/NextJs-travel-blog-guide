import Image from 'next/image';
import styles from '@/styles/MainImage.module.css';

export default function MainImage(){
    return(
        <div className={styles.MainImage}>
            <Image
                src='/images/womanWithLaptop.webp'
                fill
                sizes='100vw'
                style={{objectFit: 'contain'}}
                alt='woman with laptop'
                priority
            />
            <div className={styles.MainImage__text}>
                <div className={styles.MainImage__header}>
                    <span className={styles.main__stacked_header}>Technology</span>
                    <h2>The Impact of Technology on the Workplace: How Technology Is Changing</h2>
                </div>

                <div className={styles.main__author}>
                    <div className={styles.main__author_avatar}>
                        <Image
                            src='/images/avatarBlank.svg'
                            width={60}
                            height={60}
                            alt='Blank avatar'
                        />
                        <span>Jason Francisco</span>
                    </div>
                    <span>August 20, 2022</span>
                </div>
            </div>
        </div>
    )
}