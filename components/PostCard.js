import styles from '@/styles/PostCard.module.css';

const PostCard = (props) =>{
    return(
        <div className={styles.postCard}>
            <div className={styles.postCard__container}>
                <img
                    src={props.coverImage}
                    alt={props.title}
                    className={styles.postCard__coverImage}
                />
                <div className={styles.postCard__content}>

                    <div className={styles.postCard__about}>
                        <span className={styles.postCard__filter}>
                            {props.filter}
                        </span>
                        <span className={styles.postCard__title}>
                            {props.title}
                        </span>
                    </div>

                    <div className={styles.postCard__author}>
                        <div className={styles.postCard__authorInfo}>
                            <img
                                src={props.authorImage}
                                alt={props.authorName}
                                className={styles.postCard__authorImage}
                            />
                            <span className={styles.postCard__authorName}>{props.authorName}</span>
                        </div>
                        <span className={styles.postCard__publishDate}>{props.date}</span>

                    </div>
                    
                </div>
            </div>   
        </div>
    )
}

export default PostCard;