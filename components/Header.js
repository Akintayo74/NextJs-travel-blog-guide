import styles from '@/styles/Header.module.css';
import Image from 'next/image';

export default function Header(){
    return (
        <div className={styles.header__container}>
            <div className={styles.header}>
                <div className={styles.header__stacked}>
                    <div>
                        <span className={styles.header__stacked_header}>Technology</span>
                        <h2>The Impact of Technology on the Workplace: How Technology Is Changing</h2>
                    </div>

                    <div className={styles.header__author}>
                        <div className={styles.header__author_avatar}>
                            <Image
                                src='/images/avatarBlank2.svg'
                                width={28}
                                height={28}
                                alt='avatar'
                            />
                            <span>Tracey Wilson</span>
                        </div>
                        <span>August 20, 2022</span>
                    </div>
                </div>
                <div className={styles.header__mainImage}>
                    <Image
                        src='/images/castleNight.webp'
                        fill
                        sizes='100vw'
                        style={{objectFit: 'contain'}}
                        alt='castle at night'
                        priority
                    />
                </div>
                <p>
                    Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.
                    One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.
                </p>

                <h3>Research Your Destination</h3>
                <p>
                    Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Viverra adipiscing at in tellus.
                </p>

                <h3>Plan Your Itinerary</h3>
                <p>
                    While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget. Identify the must-see sights and experiences and prioritize them according to your interests and preferences. This will help you avoid overscheduling and ensure that you have time to relax and enjoy your journey.
                </p>
                <p>
                    Vitae sapien pellentesque habitant morbi tristique. Luctus venenatis lectus magna fringilla. Nec ullamcorper sit amet risus nullam eget felis. Tincidunt arcu non sodales neque sodales ut etiam sit amet.
                </p>

                <div className={styles.header__highlight}>
                    <p>
                        “ Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy. ”
                    </p>
                </div>
                <div className={styles.header__mainImage}>
                    <Image 
                        src='/images/packBags.webp'
                        fill
                        sizes='100vw'
                        style={{objectFit: 'contain'}}

                    />
                </div>
            </div>
        </div>
    )
}