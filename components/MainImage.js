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
        </div>
    )
}