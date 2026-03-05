import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
    const {authTokens}=useContext(AuthContext);
    const [shop, setShop] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        area_type: "city",
    });

    useEffect(() => {
        const fetchMyShop = async ()=>{
            try {
                const response = await api.get("shops/", {
                    headers: {
                        Authorization: `Bearer ${authTokens?.access}`,
                    },
                });
                if (response.data.length > 0) {
                setShop(response.data[0]);
                }
            } catch (error) {
             console.error(error);
             }
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
            try {
            const response = await api.post("shops/", formData, {
                headers: {
                    Authorization: `Bearer ${authTokens?.access}`,
                },
            });
            setShop(response.data);
        } catch (error) {
            alert("Error creating shop");
        }
    };
return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

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
          <h2 className="text-xl font-semibold">{shop.name}</h2>
          <p>{shop.address}</p>
          <p className="text-sm text-gray-500">{shop.area_type}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;