import Link from 'next/link';
import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import styles from '@/styles/AdminLayout.module.css';

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const router = useRouter();

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminSidebar}>

                <div className={styles.adminSidebarHeading}>
                    <h2>Admin Dashboard</h2>
                </div>

                <nav className={styles.adminSidebarNav}>
                    <Link href='/admin' className={router.pathname === '/admin' ? styles.adminActiveLink : styles.adminLink}>
                        Dashboard
                    </Link>
                    <Link href='/admin/blogs' className={router.pathname === '/admin/blogs' ? styles.adminActiveLink : styles.adminLink}>
                        Manage Blogs
                    </Link>
                    <Link href='/admin/create-blog' className={router.pathname === '/admin/create-blog' ? styles.adminActiveLink : styles.adminLink}>
                        Create Blog
                    </Link>
                    <button onClick={logout} className={styles.adminLogoutBtn}>
                        Logout
                    </button>
                </nav>

            </div>
            <main className={styles.adminContent}>
                { children }
            </main>
        </div>
    );
};

export default AdminLayout;