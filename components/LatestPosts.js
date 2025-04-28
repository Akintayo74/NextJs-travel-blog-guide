import { useState, useEffect } from 'react';
import styles from '@/styles/Latestposts.module.css';
import PostCard from './PostCard';
import api from 'services/api';

const LatestPosts = ({showHeader=true}) =>{
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/blogs');
                console.log(response.data.data)
                setPosts(response.data.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);
 
    return (
        <div className={styles.latestPosts}>
            {showHeader && <h2>Latest Posts</h2>}
            <div className={styles.latestPostsGrids}>
                {posts.map(post => (
                    <PostCard 
                        key={post.ID}
                        coverImage={post.image}
                        title={post.title}
                        filter={"General"}
                        authorImage={`https://api.dicebear.com/9.x/lorelei/svg?seed=${post.author}`}
                        authorName={post.author}
                        // date={post.date}
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