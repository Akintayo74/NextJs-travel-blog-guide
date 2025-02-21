import Navigation  from "./Navigation";
import Hero from "./Hero";

export default function Layout({ children }){
    return(
        <div>
            <Navigation />
            <main>
                {children}
            </main>

        </div>
    )
}