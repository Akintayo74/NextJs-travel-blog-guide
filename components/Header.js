import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import Advert from './Advert';

export default function Header(){
    return (
        <div className={styles.header__container}>
            <div className={styles.header}>
                <div className={styles.header__stacked}>
                    <div className={styles.header__content}>
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
                        <span className={styles.header__date}>August 20, 2022</span>
                    </div>
                </div>
                <div className={styles.header__mainImage}>
                    <Image
                        src='/images/castleNight.webp'
                        fill
                        sizes="(max-width: 759px) 100vw, (max-width: 1024px) 90vw, 800px"
                        style={{objectFit: 'cover'}}
                        alt='castle at night'
                        priority
                    />
                </div>
                <div className={styles.header__content_wrapper}>
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
                            " Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy. "
                        </p>
                    </div>
                </div>
                
                <div className={styles.header__mainImage}>
                    <Image 
                        src='/images/packBags.webp'
                        fill
                        sizes="(max-width: 759px) 100vw, (max-width: 1024px) 90vw, 800px"
                        style={{objectFit: 'cover'}}
                        alt='person packing bags'
                    />
                </div>

                <Advert reduced={true}/>

                <div className={styles.header__content_wrapper}>
                    <h3>Pack Lightly and Smartly</h3>
                    <p>
                        Packing can be a daunting task, but with some careful planning and smart choices, you can pack light and efficiently. Start by making a packing list and sticking to it, focusing on versatile and comfortable clothing that can be mixed and matched. Invest in quality luggage and packing organizers to maximize space and minimize wrinkles.
                    </p>

                    <h3>Stay Safe and Healthy</h3>
                    <p>
                        Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy. This includes researching any required vaccinations or medications, staying hydrated, washing your hands frequently, and using sunscreen and insect repellent. It's also essential to keep your valuables safe and secure and to be aware of your surroundings at all times.
                    </p>

                    <h3>Immerse Yourself in the Local Culture</h3>
                    <p>
                        One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.
                    </p>

                    <h3>Capture Memories</h3>
                    <p>
                        Finally, don't forget to capture memories of your journey. Whether it's through photographs, journaling, or souvenirs, preserving the moments and experiences of your travels can bring joy and nostalgia for years to come. However, it's also essential to be present in the moment and not let technology distract you from the beauty of your surroundings.
                    </p>

                    <h3>Conclusion:</h3>
                    <p>
                        Traveling is an art form that requires a blend of planning, preparation, and spontaneity. By following these tips and tricks, you can make the most of your journey and create memories that last a lifetime. So pack your bags, embrace the adventure, and enjoy the ride.
                    </p>
                </div>
            </div>
        </div>
    )
}