import { useState, useContext, useEffect, useCallback, useRef, useMemo} from 'react';
import { blogService } from 'services/api';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import styles from '@/styles/CreateBlog.module.css';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Image from "@tiptap/extension-image"
import History from '@tiptap/extension-history';

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
  const debounceTimeout = useRef(null);
  const memoizedDescription = useMemo(() => blogData.description, [blogData.description]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Underline,
      Link,
      Placeholder.configure({
        placeholder: 'Write your amazing blog content here...',
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      History,
      Image.configure({
        HTMLAttributes: {
          loading: "lazy", // Add lazy loading
        },
      })      
    ],
    content: isClient ? memoizedDescription : '',
    onUpdate({ editor }) {
      clearTimeout(debounceTimeout.current);
  
      debounceTimeout.current = setTimeout(() => {
        setBlogData(prev => ({
          ...prev,
          description: editor.getHTML(),
        }));
      }, 300); // 300ms debounce delay
    },
    immediatelyRender: false,
  });
  

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
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

    if (!isClient || !editor) {
      return;
    }

    setLoading(true);
    setStatus('');

    const now = new Date().toISOString();
    const submissionData = {
      ...blogData,
      created_at: now,
      updated_at: now
    };

    try {
      const response = await blogService.createBlog(submissionData);
      setStatus('Success! Blog created successfully');

      setTimeout(() => {
        router.push('/blog');
      }, 2000);

    } catch (error) {
      setStatus(`Error: ${error.message || 'Failed to create blog'}`);
    } finally {
      setLoading(false);
    }
  };

  const addImage = useCallback(() => {
    if (!editor) return;
    
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!isClient) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!editor) {
    return null;
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
          <label>Content</label>
          
          {/* Toolbar */}
          {isClient && editor && (
            <div className={styles.toolbar}>
              <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
              <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
              <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
              <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
              <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
              <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
              <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
              <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>Ordered List</button>
              <button type="button" onClick={() => editor.chain().focus().undo().run()}>Undo</button>
              <button type="button" onClick={() => editor.chain().focus().redo().run()}>Redo</button>
              <button type="button" onClick={addImage}>Image</button>
            </div>
          )}
          
          {/* Editor Content */}
          {isClient ? (
            <EditorContent editor={editor} className={`${styles.editorContent} ${styles.tiptap_editor}`} />
          ) : (
            <div className={styles.editorPlaceholder}>Loading editor...</div>
          )}
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
