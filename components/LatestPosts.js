import styles from '@/styles/Latestposts.module.css';
import PostCard from './PostCard';

const LatestPosts = () =>{
    const posts =[
        {
            id: 1,
            coverImage: '/images/coverImage1.svg',
            title: "The Impact of Technology on the Workplace: How Technology is Changing",
            filter: "Technology",
            authorImage: '/images/avatar3.svg',
            authorName: "Tracey Wilson",
            date: "August 20, 2022",
        },
        {
            id: 2,
            coverImage: '/images/coverImage2.webp',
            title: "The Impact of Technology on the Workplace: How Technology is Changing",
            filter: "Technology",
            authorImage: '/images/avatar.webp',
            authorName: "Jason Francisco",
            date: "August 20, 2022",
        },
        {
            id: 3,
            coverImage: '/images/coverImage3.webp',
            title: "The Impact of Technology on the Workplace: How Technology is Changing",
            filter: "Technology",
            authorImage: '/images/avatar2.svg',
            authorName: "Elizabeth Slavin",
            date: "August 20, 2022",
        },
        {
            id: 2,
            coverImage: '/images/coverImage2.webp',
            title: "The Impact of Technology on the Workplace: How Technology is Changing",
            filter: "Technology",
            authorImage: '/images/avatar.webp',
            authorName: "Jason Francisco",
            date: "August 20, 2022",
        },
        {
            id: 3,
            coverImage: '/images/coverImage3.webp',
            title: "The Impact of Technology on the Workplace: How Technology is Changing",
            filter: "Technology",
            authorImage: '/images/avatar2.svg',
            authorName: "Elizabeth Slavin",
            date: "August 20, 2022",
        },
        {
            id: 1,
            coverImage: '/images/coverImage1.svg',
            title: "The Impact of Technology on the Workplace: How Technology is Changing",
            filter: "Technology",
            authorImage: '/images/avatar3.svg',
            authorName: "Tracey Wilson",
            date: "August 20, 2022",
        },
        {
            id: 3,
            coverImage: '/images/coverImage3.webp',
            title: "The Impact of Technology on the Workplace: How Technology is Changing",
            filter: "Technology",
            authorImage: '/images/avatar2.svg',
            authorName: "Elizabeth Slavin",
            date: "August 20, 2022",
        },
        {
            id: 1,
            coverImage: '/images/coverImage1.svg',
            title: "The Impact of Technology on the Workplace: How Technology is Changing",
            filter: "Technology",
            authorImage: '/images/avatar3.svg',
            authorName: "Tracey Wilson",
            date: "August 20, 2022",
        },
        {
            id: 2,
            coverImage: '/images/coverImage2.webp',
            title: "The Impact of Technology on the Workplace: How Technology is Changing",
            filter: "Technology",
            authorImage: '/images/avatar.webp',
            authorName: "Jason Francisco",
            date: "August 20, 2022",
        },
    ]

    return (
        <div className={styles.latestPosts}>
            <h2>Latest Posts</h2>
            <div className={styles.latestPostsGrids}>
                {posts.map(post => (
                    <PostCard 
                        key={post.id}
                        coverImage={post.coverImage}
                        title={post.title}
                        filter={post.filter}
                        authorImage={post.authorImage}
                        authorName={post.authorName}
                        date={post.date}
                    />
                ))}
                <div className={styles.latestPosts__btnWrapper}>
                    <button className={styles.latestPosts__btn}>View All Posts</button>
                </div>        
            </div>
        </div>    
    );
};

export default LatestPosts;