// import styles from '@/styles/Latestposts.module.css';
// import PostCard from './PostCard';

// const LatestPosts = ({showHeader=true}) =>{
//     const posts =[
//         {
//             id: 1,
//             coverImage: '/images/coverImage1.svg',
//             title: "The Impact of Technology on the Workplace: How Technology is Changing",
//             filter: "Technology",
//             authorImage: '/images/avatar3.svg',
//             authorName: "Tracey Wilson",
//             date: "August 20, 2022",
//         },
//         {
//             id: 2,
//             coverImage: '/images/coverImage2.webp',
//             title: "The Impact of Technology on the Workplace: How Technology is Changing",
//             filter: "Technology",
//             authorImage: '/images/avatar.webp',
//             authorName: "Jason Francisco",
//             date: "August 20, 2022",
//         },
        
//     ]

//     return (
//         <div className={styles.latestPosts}>
//             {showHeader && <h2>Latest Posts</h2>}
//             <div className={styles.latestPostsGrids}>
//                 {posts.map(post => (
//                     <PostCard 
//                         key={post.id}
//                         coverImage={post.coverImage}
//                         title={post.title}
//                         filter={post.filter}
//                         authorImage={post.authorImage}
//                         authorName={post.authorName}
//                         date={post.date}
//                     />
//                 ))}
//                 <div className={styles.latestPosts__btnWrapper}>
//                     <button className={styles.latestPosts__btn}>View All Posts</button>
//                 </div>        
//             </div>
//         </div>    
//     );
// };

// export default LatestPosts;











// components/LatestPosts.js
import { useState, useEffect } from 'react';
import styles from '@/styles/Latestposts.module.css';
import PostCard from './PostCard';

const LatestPosts = ({ showHeader = true, limit = 6 }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/proxy/blogs');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                
                const data = await response.json();
                // Limit the number of posts if needed
                setPosts(data.data?.slice(0, limit) || []);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [limit]);

    if (loading) return <div className={styles.loading}>Loading posts...</div>;
    if (error) return <div className={styles.error}>Error loading posts: {error}</div>;
    if (posts.length === 0) return <div className={styles.noPosts}>No posts available</div>;

    return (
        <div className={styles.latestPosts}>
            {showHeader && <h2>Latest Posts</h2>}
            <div className={styles.latestPostsGrids}>
                {posts.map(post => (
                    <PostCard
                        key={post.ID}
                        id={post.ID}
                        coverImage={post.image || '/images/default-cover.jpg'}
                        title={post.title}
                        filter={post.category || 'Blog'}
                        authorImage={post.authorImage || '/images/avatar.webp'}
                        authorName={post.author}
                        date={new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
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