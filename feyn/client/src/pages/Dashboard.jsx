import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { authTokens } = useContext(AuthContext);

  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    area_type: "city",
  });

  useEffect(() => {
    const fetchMyShop = async () => {
      try {
        const res = await api.get("shops/", {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });
        if (res.data.length > 0) {
          setShop(res.data[0]);
        }
      }catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchMyShop();
  }, [authTokens]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const createShop = async (e) => {
    e.preventDefault();

    try{
      const res = await api.post("shops/", formData, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
      setShop(res.data);
    } catch (error){
      console.log(error.response.data);
    }
  };

  if(loading) return <div className="">Loading...</div>

  return (
    <>
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
{!shop ? (
  <form
  onSubmit={createShop}
          className="bg-white p-6 rounded-xl shadow w-96"
        >
          <h2 className="text-xl font-semibold mb-4">
            Create Your Shop
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            className="w-full mb-3 px-4 py-2 border rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full mb-3 px-4 py-2 border rounded"
            onChange={handleChange}
          />

          <select
            name="area_type"
            className="w-full mb-4 px-4 py-2 border rounded"
            onChange={handleChange}
          >
            <option value="city">City</option>
            <option value="main_area">Main Area</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Shop
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            {shop.name}
          </h2>

          <p className="text-gray-600">{shop.address}</p>

          <p className="text-sm text-gray-500 mt-2">
            Area Type: {shop.area_type}
          </p>
        </div>
      )}
      <div className="p-4 flex items-end justify-end">
        <button type="button" className="bg-blue-500 px-4 py-1 rounded-full hover:bg-blue-700">add</button>
      </div>
    </div>
    <div className="w-screen h-20 bg-gray-400 text-black fixed bottom-0 left-0">
      <div className="flex justify-between p-5">
        <div><img src="ecommerce.png" alt="Add Products" className="w-10 h-10"/></div>
        <div><img src="features.png" alt="Add Products" className="w-10 h-10"/></div>
        <div><img src="crown.png" alt="Add Products" className="w-10 h-10"/></div>
        <div><img src="data-analytics.png" alt="Add Products" className="w-10 h-10"/></div>
      </div>
    </div>
    
  </>
  );
}

export default Dashboard;