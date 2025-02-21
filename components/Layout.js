import Hero from "./Hero";
import Footer from "./Footer";

export default function Layout({ children }){
    return(
        <div>
            <Hero />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}