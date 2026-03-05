import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await api.post("users/register/", formData);
            alert("Account created successfully!");
            navigate("/login");
        } catch (error) {
            alert("Registration failed");
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96"> 
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <input type="text" name="username" placeholder="Username" className="w-full mb-4 px-4 py-2 border rounded-lg" onChange={handleChange}/>
                <input type="email" name="email" placeholder="Email" className="w-full mb-4 px-4 py-2 border rounded-lg" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" className="w-full mb-4 px-4 py-2 border rounded-lg" onChange={handleChange}/>
                
                <button type="submit" className="w-full bg-blue-600 text-white py-2 border rounded-lg hover:bg-blue-700">
                    Register
                </button>
            </form>

        </div>
    );
}

export default Register;