import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "contexts/AuthContext";
import AdminLayout from "components/AdminLayout";
import styles from '@/styles/AdminDash.module.css';

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // useEffect(() => {
    //     if(!loading && !user) {
    //         router.push('/login');
    //     }
    // }, [user, loading, router]);

    // if(loading || !user) {
    //     return <div>Loading...</div>
    // }

    return (
        <AdminLayout>
            <div className={styles.dashContainer}>
                <h1>Welcome, {user.name || 'Admin'}</h1>
                <div className={styles.dashStatsGrid}>
                    <div className={styles.dashStatCard}>
                        <h3>Total Posts</h3>
                        <p className={styles.dashStatNumber}>0</p>
                    </div>

                    <div className={styles.dashStatCard}>
                        <h3>Published</h3>
                        <p className={styles.dashStatNumber}>0</p>
                    </div>

                    <div className={styles.dashStatCard}>
                        <h3>Drafts</h3>
                        <p className={styles.dashStatNumber}>0</p>
                    </div>
                </div>
                <div className={styles.dashQuickActions}>
                    <h2>Quck Actions</h2>
                    <div className={styles.dashActionsGrid}>
                        <button
                            onClick={() => router.push('/admin/create-blog')}
                            className={styles.dashActionButton}
                        >
                            Create New Post
                        </button>

                        <button
                            onClick={() => router.push('/admin/blogs')}
                            className={styles.dashActionButton}
                        >
                            Manage Posts
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
