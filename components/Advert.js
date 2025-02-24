import styles from '@/styles/Advert.module.css';


export default function Advertisement({reduced}){
    return(
        <div className={`${styles.advert} ${reduced ? styles.advert__reduced : ''}`} >
            <a className={styles.advert__content} href='https://discord.com/' target='_blank' rel='noreferrer'>
                <span>Advertisement</span>
                <span className={styles.advert__content_ads}>You can place ads</span>
                <span>750x100</span>
            </a>
        </div>
    )
}