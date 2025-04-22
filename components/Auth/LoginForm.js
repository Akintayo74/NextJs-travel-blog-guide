import styles from '@/styles/LoginForm.module.css';
import Image from 'next/image'

// Okay, I want to create a react form template using the thumbnail image from the figma file on the right and a signup and login form on the left like what i found on dribble. I'll then use GSAP to make the ui sleeker and better.

export default function Login(){
    return (
        <div className = {styles.login__container}>
            <div className={styles.login__wrapper}>
                <div className = {styles.login__left}>
                    <h1>Holla, Welcome back!</h1>
                    <div className={styles.login__leftForm}>
                        <form className={styles.login__form}>
                            <label>
                                <input placeholder='Your Email' type='email'/>
                            </label>
                            <label>
                                <input placeholder='Password' type='password'/>
                            </label> 
                        </form>
                    </div>
                    <div className={styles.login__button}>
                        <button>
                            Login
                        </button>
                    </div>
                </div>
                <div className={styles.login__right}>
                    {/* <h1>Everyday Life</h1> */}
                    <Image 
                        src='/images/thumbnail.jpg'
                        fill
                        className={styles.login__image}
                        priority
                        alt='thumbnail'
                    />
                </div>
            </div>
        </div>
    )
}