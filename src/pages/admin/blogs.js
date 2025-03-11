import { useState, useEffect } from "react";
import AdminLayout from "components/AdminLayout";
import styles from '@/styles/AdminBlogs.module.css';

export default function ManageBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async() => {
            try{
                const response = await fetch('/api/proxy/blogs', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json;
                setBlogs(data.data || []);

            }catch(error) {
                console.error("Error fetching blogs: ", error);
            }finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <AdminLayout>
            <h1>Manage Blogs</h1>
            { loading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.blogsList}>
                    {blogs.length === 0 ? (
                        <p>No blogs found</p>
                    ) : (
                        <table>

                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {blogs.map(blog => (
                                    <tr>
                                        <td>{blog.title}</td>
                                        <td>{blog.author}</td>
                                        <td>
                                            <a href={`/admin/edit-blog/${blog.ID}`}>Edit</a>
                                            <button onClick={() => handleDelete(blog.ID)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}