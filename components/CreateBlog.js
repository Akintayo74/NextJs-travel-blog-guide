// // /components/CreateBlog.js
// import { useState, useContext, useEffect } from 'react';
// import { blogService } from 'services/api';
// import { AuthContext } from 'context/AuthContext';
// import { useRouter } from 'next/router';
// import styles from '@/styles/CreateBlog.module.css';
// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// const CreateBlog = () => {
//   const router = useRouter();
//   const { user } = useContext(AuthContext);
//   const [isClient, setIsClient] = useState(false);
//   const [blogData, setBlogData] = useState({
//     title: '',
//     description: '',
//     author: '',
//     image: 'https://cdn.dribbble.com/userupload/14898989/file/original-71db7cb2b174ad93235ff7585ad9ea3a.png?resize=1024x768&vertical=center',
//     user_id: 1
//   });
//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
    
//     // Populate user data when available
//     if (user) {
//       setBlogData(prev => ({
//         ...prev,
//         author: user.name || '',
//         user_id: user.id || 1
//       }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus('');
    
//     // Add timestamps for submission
//     const now = new Date().toISOString();
//     const submissionData = {
//       ...blogData,
//       created_at: now,
//       updated_at: now
//     };

//     try {
//       const response = await blogService.createBlog(submissionData);
//       setStatus('Success! Blog created successfully');
      
//       // Redirect to the newly created blog or blogs list page
//       setTimeout(() => {
//         router.push('/blog'); // Or to specific blog page if you have that route
//       }, 2000);
      
//     } catch (error) {
//       setStatus(`Error: ${error.message || 'Failed to create blog'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isClient) {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Create New Blog Post</h1>
      
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="description">Content</label>
//           <ReactQuill
//             theme="snow"
//             value={blogData.description}
//             onChange={(content) =>
//               setBlogData((prev) => ({ ...prev, description: content }))
//             }
//             placeholder="Write your blog content here..."
//             modules={{
//               toolbar: [
//                 [{ header: [1, 2, 3, false] }],
//                 ['bold', 'italic', 'underline'],
//                 [{ list: 'ordered' }, { list: 'bullet' }],
//                 ['link', 'image'],
//                 ['clean']
//               ],
//             }}
//           />
//         </div>


//         <div className={styles.formGroup}>
//           <label htmlFor="author">Author</label>
//           <input
//             type="text"
//             id="author"
//             name="author"
//             value={blogData.author}
//             onChange={handleChange}
//             placeholder="Enter author name"
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="image">Cover Image URL</label>
//           <input
//             type="url"
//             id="image"
//             name="image"
//             value={blogData.image}
//             onChange={handleChange}
//             placeholder="Enter image URL"
//             required
//           />
          
//           {blogData.image && (
//             <div className={styles.imagePreview}>
//               <img 
//                 src={blogData.image} 
//                 alt="Cover preview" 
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/placeholder-image.jpg";
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="description">Content</label>
//           <textarea
//             id="description"
//             name="description"
//             value={blogData.description}
//             onChange={handleChange}
//             rows="12"
//             placeholder="Write your blog content here..."
//             required
//           />
//         </div>

//         <button 
//           type="submit" 
//           disabled={loading} 
//           className={styles.submitButton}
//         >
//           {loading ? 'Publishing...' : 'Publish Blog'}
//         </button>
//       </form>

//       {status && (
//         <div className={status.includes('Error') ? styles.error : styles.success}>
//           {status}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateBlog;






























import { useState, useContext, useEffect } from 'react';
import { blogService } from 'services/api';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import styles from '@/styles/CreateBlog.module.css';

const CreateBlog = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [isClient, setIsClient] = useState(false);
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    author: '',
    image: 'https://cdn.dribbble.com/userupload/14898989/file/original-71db7cb2b174ad93235ff7585ad9ea3a.png?resize=1024x768&vertical=center',
    user_id: user ? user.id : null
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: blogData.description, // Initialize with current description
    onUpdate({ editor }) {
      setBlogData(prev => ({
        ...prev,
        description: editor.getHTML(), // Update description with the editor's HTML
      }));
    },
  });

  useEffect(() => {
    setIsClient(true);
    
    // Populate user data when available
    if (user) {
      setBlogData(prev => ({
        ...prev,
        author: user.name || '',
        user_id: user.id || null
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
    
    // Add timestamps for submission
    const now = new Date().toISOString();
    const submissionData = {
      ...blogData,
      created_at: now,
      updated_at: now
    };

    try {
      const response = await blogService.createBlog(submissionData);
      setStatus('Success! Blog created successfully');
      
      // Redirect to the newly created blog or blogs list page
      setTimeout(() => {
        router.push('/blog'); // Or to specific blog page if you have that route
      }, 2000);
      
    } catch (error) {
      setStatus(`Error: ${error.message || 'Failed to create blog'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Blog Post</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Cover Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={blogData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
          
          {blogData.image && (
            <div className={styles.imagePreview}>
              <img 
                src={blogData.image} 
                alt="Cover preview" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Content</label>
          <EditorContent editor={editor} />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={styles.submitButton}
        >
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>

      {status && (
        <div className={status.includes('Error') ? styles.error : styles.success}>
          {status}
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
