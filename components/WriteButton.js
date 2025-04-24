import { NotebookPen } from "lucide-react";
import { useRouter } from "next/router";
import styles from '@/styles/WriteButton.module.css'

export default function WriteButton(){
    const router = useRouter();

    return (
        <div className={styles.write__container}>
            <NotebookPen size={24}/>
        </div>
    )
}