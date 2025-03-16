import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import AdminLayout from 'components/AdminLayout';
import styles from '@/styles/CreateBlog.module.css';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import 'react-quill/dist/quill.snow.css';

export default function CreateBlog() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: '',
        image: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);





    // FOR TESTING ONLY - Add this in your component
    useEffect(() => {
        // Only for testing - remove in production
        if (!localStorage.getItem('token')) {
            // Replace with a valid token from your system
            localStorage.setItem('token', 'djfefpwefbewfewfjekfepf');
            console.log("Set a test token for debugging purposes");
        }
    }, []);





    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({
            ...prev,
            description: content
        }));
    };

    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     setSubmitting(true);
    //     setError(null);

    //     try{
    //         const response = await fetch('/api/proxy/blogs', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify({
    //                 title: formData.title,
    //                 description: formData.description,
    //                 author: formData.author,
    //                 image: formData.image
    //             })
    //         });

    //         if(!response.ok){
    //             throw new Error('Failed to create blog');
    //         }

    //         router.push('/admin/blogs');
    //     }catch(err) {
    //         setError(err.message);
    //         console.error(err);
    //     }finally {
    //         setSubmitting(false);
    //     }
    // };





    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     setSubmitting(true);
    //     setError(null);
        
    //     // Debug logging
    //     console.log("Form data being submitted:", formData);
    //     console.log("Token available:", localStorage.getItem('token') ? "Yes" : "No");
    
    //     try {
    //         console.log("Starting fetch request...");
    //         const response = await fetch('/api/proxy/blogs', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify({
    //                 title: formData.title,
    //                 description: formData.description,
    //                 author: formData.author,
    //                 image: formData.image
    //             })
    //         });
            
    //         console.log("Response status:", response.status);
            
    //         // Try to get the response body regardless of status
    //         const responseData = await response.json().catch(e => {
    //             console.error("Failed to parse response:", e);
    //             return null;
    //         });
            
    //         console.log("Response data:", responseData);
    
    //         if (!response.ok) {
    //             throw new Error(responseData?.message || 'Failed to create blog');
    //         }
    
    //         router.push('/admin/blogs');
    //     } catch (err) {
    //         setError(err.message);
    //         console.error("Error details:", err);
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };



    const handleSubmit = async(e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        
        // Check for token first
        const token = localStorage.getItem('token');
        console.log("Form data being submitted:", formData);
        console.log("Token available:", token ? "Yes" : "No");
    
        if (!token) {
            setError("Authentication token is missing. Please log in first.");
            setSubmitting(false);
            return;
        }
    
        try {
            console.log("Starting fetch request...");
            const response = await fetch('/api/proxy/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    author: formData.author,
                    image: formData.image || "" // Ensure image has a default value
                })
            });
            
            console.log("Response status:", response.status);
            
            // Try to get the response body regardless of status
            const responseText = await response.text();
            console.log("Response text:", responseText);
            
            let responseData;
            try {
                responseData = JSON.parse(responseText);
                console.log("Parsed response data:", responseData);
            } catch (e) {
                console.log("Could not parse response as JSON:", responseText);
            }
    
            if (!response.ok) {
                throw new Error(responseData?.message || `Error: ${response.status}`);
            }
    
            router.push('/admin/blogs');
        } catch (err) {
            setError(err.message);
            console.error("Error details:", err);
        } finally {
            setSubmitting(false);
        }
    };


    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <AdminLayout>
            <h1>Create New Blog</h1>
            <div id="error-container" style={{ display: error ? 'block' : 'none' }}>
                {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
                )}
            </div>
            

            <form onSubmit={handleSubmit}>
                <div className={styles.createFormGroup}>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.createFormGroup}>
                    <label htmlFor='author'>Author</label>
                    <input
                        type='text'
                        id='author'
                        name='author'
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.createFormGroup}>
                    <label htmlFor='image'>Featured Image URL</label>
                    <input
                        type='text'
                        id='image'
                        name='image'
                        value={formData.image}
                        onChange={handleChange}
                        // required
                    />
                </div>

                <div className={styles.createFormGroup}>
                    <label htmlFor='description'>Content</label>
                    {typeof window !== 'undefined' && (
                        <ReactQuill
                            theme='snow'
                            value={formData.description}
                            onChange={handleEditorChange}
                            modules={modules}
                        />
                    )}
                </div>

                <div className={styles.createButtonGroup}>
                    <button
                        type='button'
                        onClick={() => router.push('/admin/blogs')}
                        disabled={submitting}
                    >
                        Cancel
                    </button>

                    <button
                        type='submit'
                        disabled={submitting}
                    >
                        {submitting ? 'Creating...' : 'Create Blog'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

