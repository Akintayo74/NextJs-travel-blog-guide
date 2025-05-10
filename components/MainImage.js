// import Image from 'next/image';
// import styles from '@/styles/MainImage.module.css';

// export default function MainImage(){
//     return(
//         <div className={styles.MainImage}>
//             <Image
//                 src='/images/womanWithLaptop.webp'
//                 fill
//                 sizes='100vw'
//                 style={{objectFit: 'contain'}}
//                 alt='woman with laptop'
//                 priority
//             />
//             <div className={styles.MainImage__text}>
//                 <div className={styles.MainImage__header}>
//                     <span className={styles.main__stacked_header}>Technology</span>
//                     <h2>The Impact of Technology on the Workplace: How Technology Is Changing</h2>
//                 </div>

//                 <div className={styles.main__author}>
//                     <div className={styles.main__author_avatar}>
//                         <Image
//                             src='/images/avatarBlank.svg'
//                             width={36}
//                             height={36}
//                             alt='Blank avatar'
//                         />
//                         <span>Tracey Wilson</span>
//                     </div>
//                     <span>August 20, 2022</span>
//                 </div>
//             </div>
//         </div>
//     )
// }






















import Image from 'next/image';
import styles from '@/styles/MainImage.module.css';

export default function MainImage(){
    return(
        <div className={styles.MainImage}>
            <div className={styles.MainImage__overlay}></div>
            <Image
                src='/images/womanWithLaptop.webp'
                fill
                sizes="(max-width: 759px) 100vw, (max-width: 1024px) 100vw, 100vw"
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
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
                            width={36}
                            height={36}
                            alt='Blank avatar'
                        />
                        <span>Tracey Wilson</span>
                    </div>
                    <span className={styles.main__date}>August 20, 2022</span>
                </div>
            </div>
        </div>
    )
}