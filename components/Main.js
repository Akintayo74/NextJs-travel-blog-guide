import Image from 'next/image';
import styles from '@/styles/Main.module.css';


export default function Main(){
    return (
        <div className={styles.main}>
            <div className={styles.main__image}>
                <Image
                    src='/images/womanWithLaptop.webp'
                    fill
                    sizes='100vw'
                    style={{objectFit: 'contain'}}
                    alt='woman with laptop'
                    priority
                />
                
            </div>
            {/* <div className={styles.main__stacked}>
                <div>
                    <span className={styles.main__stacked_header}>Technology</span>
                    <h2>The Impact of Technology on the Workplace: How Technology Is Changing</h2>
                </div>

                <div className={styles.main__author}>
                    <div className={styles.main__author_avatar}>
                        <Image
                            src='/images/avatar.webp'
                            width={60}
                            height={60}
                            alt='avatar'
                        />
                        <span>Jason Francisco</span>
                    </div>
                    <span>August 20, 2022</span>
                </div>
            </div> */}
        </div>
    )
}