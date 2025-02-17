import styles from './PostCard.module.css';

const PostCard = (props) =>{
    return(
        <div className={styles.postCard}>
            <img
                src={props.coverImage}
                alt={props.title}
                className={styles.postCard__coverImage}
            />
            <div className={styles.postCard__content}>

                <div className={styles.postCard__about}>
                    <h3 className={styles.postCard__filter}>
                        {props.filter}
                    </h3>
                    <h1 className={styles.postCard__title}>
                        {props.title}
                    </h1>
                </div>

                <div className={styles.postCard__author}>
                    <div>
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
    )
}

export default PostCard;