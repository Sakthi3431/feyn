import { useEffect, useState } from "react";
import api  from "../services/api";
import { Link } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await api.get("product/");
                setProducts(response.data);
            }catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Nearyby Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product)=>(
                    <Link to={`/shop/${shop_id}`} key={product.id}>

                    <div key={product.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transiton">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.decsription}</p>
                        <p className="text-blue-600  font-bold">₹{product.price}</p>
                        <p className="text-sm text-gray-500 mt-2">Shop: {product.shop}</p>
                        </div>
                </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;