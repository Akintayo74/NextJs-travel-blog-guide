import styles from '@/styles/SignUpForm.module.css';
import Image from 'next/image'

// Okay, I want to create a react form template using the thumbnail image from the figma file on the right and a signup and login form on the left like what i found on dribble. I'll then use GSAP to make the ui sleeker and better.

export default function SignUp(){
    return (
        <div className = {styles.signup__container}>
            <div className={styles.signup__wrapper}>
                <div className = {styles.signup__left}>
                    <h1>Bienvidos, Register!</h1>
                    <div className={styles.signup__leftForm}>
                        <form className={styles.signup__form}>
                            <label>
                                <input placeholder='Your Name' type='text'/>
                            </label>
                            <label>
                                <input placeholder='Your Email' type='email'/>
                            </label>
                            <label>
                                <input placeholder='Password' type='password'/>
                            </label> 
                        </form>
                    </div>
                    <div className={styles.signup__button}>
                        <button>
                            Login
                        </button>
                    </div>
                </div>
                <div className={styles.signup__right}>
                    {/* <h1>Everyday Life</h1> */}
                    <Image 
                        src='/images/thumbnail2.jpg'
                        fill
                        className={styles.signup__image}
                        priority
                        alt='thumbnail'
                    />
                </div>
            </div>
        </div>
    )
}