import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Shop() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const shopRes = await api.get(`shops/${id}/`);
      const productRes = await api.get(`products/?shop=${id}`);

      setShop(shopRes.data);
      setProducts(productRes.data);
    };

    fetchData();
  }, [id]);

  if (!shop) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
      <p className="text-gray-600 mb-4">{shop.address}</p>

      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-bold">
              ₹ {product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;