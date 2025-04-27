import { NotebookPen } from "lucide-react";
import { useRouter } from "next/router";
import styles from '@/styles/WriteButton.module.css'

export default function WriteButton(){
    const router = useRouter();

    const handleClick = () => {
        router.push('/blog/create')
    }

    return (
        <div className={styles.write__container} onClick={handleClick}>
            <NotebookPen size={24} className={styles.icon} />
        </div>
    )
}