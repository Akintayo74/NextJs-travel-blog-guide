import { useState, useContext, useEffect } from 'react';
import { blogService } from 'services/api';
import { AuthContext } from 'context/AuthContext';
import withAuth from 'components/withAuth';
import styles from '@/styles/TestBlog.module.css';

const TestBlogPage = () => {
  const { user } = useContext(AuthContext);
  const [isClient, setIsClient] = useState(false);
  // Use empty strings as initial values to avoid hydration mismatch
  const [blogData, setBlogData] = useState({
    title: 'Test Blog Title',
    description: 'This is a test blog description to verify the API endpoint is working correctly.',
    author: 'Test Author',
    image: 'https://cdn.dribbble.com/userupload/14898989/file/original-71db7cb2b174ad93235ff7585ad9ea3a.png?resize=1024x768&vertical=center',
    created_at: '',
    updated_at: '',
    user_id: 1
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Set isClient to true when component mounts on client side
  useEffect(() => {
    setIsClient(true);
    
    // Initialize date fields after component mounts on client
    const now = new Date().toISOString();
    setBlogData(prev => ({
      ...prev,
      created_at: now,
      updated_at: now
    }));
  }, []);
  
  // Update user data when available
  useEffect(() => {
    if (user) {
      setBlogData(prev => ({
        ...prev,
        author: user.name || prev.author,
        user_id: user.id || prev.user_id
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    
    // Update timestamps right before submission
    const now = new Date().toISOString();
    const submissionData = {
      ...blogData,
      created_at: now,
      updated_at: now
    };

    try {
      const response = await blogService.createBlog(submissionData);
      setStatus(`Success! Blog created with ID: ${response.id || 'N/A'}`);
      console.log('Blog created successfully:', response);
    } catch (error) {
      setStatus(`Error: ${error.message || 'Failed to create blog'}`);
      console.error('Blog creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Only render the form once we're on the client side
  if (!isClient) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Test Blog Creation</h1>
      <p>This page tests the blog creation endpoint with all required fields.</p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Blog Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author Name:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Blog Content:</label>
          <textarea
            id="description"
            name="description"
            value={blogData.description}
            onChange={handleChange}
            rows="10"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={blogData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="user_id">User ID:</label>
          <input
            type="number"
            id="user_id"
            name="user_id"
            value={blogData.user_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.imagePreview}>
          {blogData.image && (
            <>
              <h4>Image Preview:</h4>
              <img 
                src={blogData.image} 
                alt="Blog post preview" 
                className={styles.previewImg} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.jpg";
                  e.target.style.opacity = 0.5;
                }}
              />
            </>
          )}
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Creating...' : 'Create Test Blog'}
        </button>
      </form>

      {status && (
        <div className={status.includes('Error') ? styles.error : styles.success}>
          {status}
        </div>
      )}

      <div className={styles.requestPreview}>
        <h3>Request Payload Preview:</h3>
        <pre>{JSON.stringify(blogData, null, 2)}</pre>
        <p><small>Note: Timestamps will be updated at submission time</small></p>
      </div>
    </div>
  );
};

export default withAuth(TestBlogPage);