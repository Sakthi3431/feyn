import React from "react";
import { Link } from "react-router-dom";
import ServiceProviders from "./ServiceProviders";

export default function App() {
    const products = [
        {
            id: 1,
            name: "wireless Headphones",
            price: "599",
            image: "./4466.jpg",
        },
        {
            id: 2,
            name: "Smart watch",
            price: "149",
            image: "./4455.jpg"
        },
        {
            id:3,
            name: "Gaming Mouse",
            price: "599",
            image: "./4444.jpg"
        },
        {id: 4,
        name: "Charger",
        price: "399",
        image: "4433.jpg"
   }
    ];
    return (<div style={{fontFamily: "ariel, sans-serif"}}>
        <nav style={{
            display: "flex",
            justityContent: "space-between",
            padding: "20px 50px",
            background: "#111",
            color: "white"
        }}
        >
            <h2>Shop Now</h2>        <div>
           <a href="#" style={linkStyle}>Home</a>
           <a href="#" style={linkStyle}>Products</a>
           <a href="#" style={linkStyle}>Contact</a>
           <Link to="/service-providers">Plumbers</Link>
           
           

       </div>
       </nav>
       <section style={
           {textAlign: "center",
               padding: "100px 20px",
               background: "#f4f4f4"
           }
       }
        >
            <h1 style={{fontSize: "3rem"}}>Best Deals Online</h1>
            <p>Discover premium at unbeatable prices</p>
            <button style={buttonStlye}>Shop Now</button>
        </section>
        {/* Products */}
        <section style={{padding: "50px"}}>
            <h2 style={{textAlign: "center"}}>Featured Products</h2>
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                flexWrap: "wrap",
                marginTop: "30px"
            }}
            >
                {products.map((product) =>(
                    <div key={product.id} style={
                        {
                            width:"250px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                        }
                    }>
                        <img 
                        style={{width: "100%", height: "200px", objectFit: "cover"}} src={product.image} 
                        alt={product.name} />
                        <div style={{padding: "20px"}}>
                            <h3>{product.name}</h3>
                            <p>{product.price}</p>
                            <button style={buttonStlye}>Buy now</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        {/* Features */}

        <section style={{
            background: "#222",
            color: "white",
            padding: "60px",
            textAlign: "center"
        }}
       >
           <h2>Why choose us?</h2>
        <p>Fast delivery | Secure payment | 24*7 Support</p>
           </section>
           {/* Footer */}
           <footer style={{
               textAlign: "center",
               padding: "20px",
               background: "#111",
               color: "white"
           }}
            >@ 2026 ShopNow. All rights reserved</footer>
    </div>);
}

const buttonStlye = {    padding: "10px 20px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

const linkStyle = {
    color: "white",
    margin: "0 15px",
    textDecoraion: "none"
};
