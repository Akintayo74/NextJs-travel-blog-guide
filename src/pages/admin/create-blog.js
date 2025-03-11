import { useState } from 'react';
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try{
            const response = await fetch('https://meta-blog-api-2n32.onrender.com/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    author: formData.author,
                    image: formData.image
                })
            });

            if(!response.ok){
                throw new Error('Failed to create blog');
            }

            router.push('/admin/blogs');
        }catch(err) {
            setError(err.message);
            console.error(err);
        }finally {
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
            {error && <div className={styles.createErrorMessage}></div>}

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
                        required
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

