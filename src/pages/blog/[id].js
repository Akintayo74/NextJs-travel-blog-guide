import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from '@/styles/BlogPost.module.css';
import Image from "next/image";

export default function BlogPost() {
    const router = useRouter();
    const { id } = router.query;
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!id) return

        const fetchBlog = async() => {
            try{
                const response = await fetch(`/api/proxy/blogs/${id}`);

                if(!response.ok) {
                    throw new Error('Failed to fetch blog post');
                }

                const data = await response.json();
                setBlog(data.data);
            } catch(err) {
                console.error('Error fetching blog post: ', err);
                setError(err.message);
            } finally{
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if(loading) return <div className={styles.idLoading}>Loading...</div>;
    if(error) return <div className={styles.idError}>Error: {error}</div>;
    if(!blog) return <div className={styles.idNotFound}>Blog post not found</div>;

    return (
        <article className={styles.blogPost}>
            <div className={styles.blogPost__header}>
                <h1 className={styles.blogPost__title}>{blog.title}</h1>
                <div className={styles.blogPost__meta}>

                    <div className={styles.blogPost__author}>
                        <Image
                            src={blog.authorImage || '/images/avatarBlank.svg'}
                            alt={blog.author}
                            className={styles.blogPost__authorImage}
                        />
                        <span className={styles.blogPost__authorName}>{blog.author}</span>
                    </div>

                    <span className={styles.blogPost__date}>
                        {new Date(blog.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>
            </div>

            {blog.image && (
                <div className={styles.blogPost__imageContainer}>
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        className={styles.blogPost__image}
                    />
                </div>
            )}

            <div
                className={styles.blogPost__content}
                dangerouslySetInnerHTML={{ __html: blog.description }}
            />
        </article>
    );
}