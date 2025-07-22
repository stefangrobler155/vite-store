import ProductList from "../../components/ProductList";

export default function Home() {
    return (
        <main className="main">
            <section className="home__hero">
            <div className="home__hero-content">    
                <h1 className="home__hero-title">Welcome to My Vite Store</h1>
                <p className="home__hero-description">Explore our products and add them to your cart!</p>
            </div>
            </section>
               <ProductList /> 
        </main>
    );
}