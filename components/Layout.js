import {useRouter} from 'next/router';
import Hero from "./Hero";
import Footer from "./Footer";
import WriteButton from './WriteButton';

export default function Layout({ children }){
    const router = useRouter();
    const isHeroPage = router.pathname === '/';
    
    return(
        <div>
            <Hero />
            <WriteButton />
            <main>
                {children}
            </main>
            <Footer isBlueLogo={!isHeroPage}/>
        </div>
    )
}