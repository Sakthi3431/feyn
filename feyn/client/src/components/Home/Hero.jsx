import React from 'react'
import "/home/emperor/Documents/projects/feyn/client/src/index.css"
function Hero() {
    const buttonStlye = {    padding: "10px 20px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};
  return (
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
  )
}

export default Hero;