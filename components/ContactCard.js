import styles from '@/styles/ContactCard.module.css';
import Image from 'next/image';

export default function ContactCard(){
    return (
        <div className={styles.contact}>
            <div className={styles.contact__container}>
                <div className={styles.contact__author}>
                    <Image
                        src='/images/avatar.webp'
                        width={64}
                        height={64}

                    />
                    <div className={styles.contact__authorText}>
                        <h4>Jonathan Doe</h4>
                        <span>Collaborator & Editor</span>
                    </div>
                </div>
                <p>
                    Meet Jonathan Doe, a passionate writer and blogger with a love for technology and travel. Jonathan holds a degree in Computer Science and has spent years working in the tech industry, gaining a deep understanding of the impact technology has on our lives.
                </p>
                <div className={styles.contact__icons}>
                    <a href='https://web.facebook.com' target='_blank' rel='noreferrer noopener'>
                        <Image
                            src='/images/facebook.svg'
                            width={32}
                            height={32}
                            
                        />
                    </a>
                    <a href='https://twitter.com' target='_blank' rel='noreferrer noopener'>
                        <Image
                            src='/images/twitter.svg'
                            width={32}
                            height={32}
                        />
                    </a>
                    <a href='https://instagram.com' target='_blank' rel='noreferrer noopener'>
                        <Image
                            src='/images/instagram.svg'
                            width={32}
                            height={32}
                        />
                    </a>
                    <a href='https://youtube.com' target='_blank' rel='noreferrer noopener'>
                        <Image
                            src='/images/youtube.svg'
                            width={32}
                            height={32}
                        />
                    </a>
                   
                </div>
                
            </div>
        </div>
    )
}