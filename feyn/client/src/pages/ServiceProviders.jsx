import React, { useState }  from "react"; 
import { Link } from "react-router-dom";

function ServiceProviders(){
    
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");


    const cardStyle = {
        width: "250px",
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0px 8px 24px rgba(0,0,0, 0.08)",
        transition: "0.3s ease",
        cursor: "pointer"
    }
    const imageStyle = {
        width: "100%",
        height: "180px",
        objectFit: "cover"
    }
    const buttonStyle = {
        width: "100%",
        padding: "12px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer"

    }
    const plumbers = [
        {
            id: 1,
            name: "Ravi Kumar",
            rating: 4.8,
            experience: "5 Years",
            price: "$300",
            location: "Erode",
            image: "./p1.jpg"

        },
        {
            id: 2,
            name: "Arun",
            rating: 4.6,
            experience: "4 Years",
            price: "$250",
            location: "Coimbatore",
            image: "./p2.jpg"
        },
        {
            id: 3,
            name: "Vijay",
            rating: 5.0,
            experience: "7Years",
            price: "$400",
            location: "Tirupur",
            image: "./p3.jpg"
        },
        {
            id: 4,
            name: "Ajay",
            rating: 4.0,
            experience: "2Years",
            price: "$200",
            location: "Tirupur",
            image: "./p4.jpg"
        }
        

    ];
    const filteredPlumbers = plumbers.filter((plumber)=>
    plumber.name.toLowerCase().includes(search.toLowerCase()));
    return(
        <div>
            {/* navbar */}
            <nav style={{
                display: "flex",
                background: "#AEE2FF",
                color: "Blue",
                border: "1px",
                padding: "15px",
                justifyContent: "space-between"
                
            }}>
                <h2>Local Connect</h2>
                <button style={{
                    padding: "0 15px",
                    background: "blue",
                    color: "white",
                    borderRadius: "7px",
                    


                }}>Login</button>
            </nav>

            {/* Search */}
            <div>
                <input 
                style={{
                    padding: "10px",
                    border: "1px solid gray",
                    borderRadius: "8px",
                    width: "100%",
                    margin: "15px 0px"
                    
                }}
                type="text" 
                placeholder="Search plumbers"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                margin: "25px 0"
            }}>
                <button onClick={()=> setFilter("all")}>All</button>
                <button onClick={()=> setFilter("nearby")}>Nearby</button>
                <button onClick={()=> setFilter("top")}>Top Rated</button>
            </div>
            
            {/* Servide Card */}
            <div style={{padding: "18px", display: "flex", gap: "10px", justifyContent: "center", overflow: "hidden", flexWrap: "wrap"}}>
                {filteredPlumbers.map((plumber) => (
                    <div key={plumber.id} 
                    style={
                      cardStyle}
                    >
                        <img src={plumber.image} 
                        style={imageStyle}
                        alt="" />
                        <h3 style={{
                            fontFamily: "Arial, sans-serif",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "2rem"
                            
                        }}>{plumber.name}</h3>
                        <p style={{
                            background: "orange",
                            width: "10%",
                            border: "1px solid orange",
                            borderRadius: "10px",

                        }}>⭐{plumber.rating}</p>
                        <p style={{
                            color: "#666"
                        }}>{plumber.experience}</p>
                        <p style={{fontWeight: "bold"}}>{plumber.price}</p>
                        <p>{plumber.location}</p>
                        <button 
                        style={buttonStyle}>
                            <Link 
                            to={`/service-provider/${plumber.id}`}
                            style={{buttonStyle,
                                display: "block",
                                textAlign: "center",
                                textDecoration: "none"
                            }}
                            > Book Now</Link></button>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default ServiceProviders;