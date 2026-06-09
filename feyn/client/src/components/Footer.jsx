import React from 'react'

function Footer() {
  return (
    <>
    <div style={{fontFamily: "ariel, sans-serif"}}>
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
    </div>
    </>
    
  )
}

export default Footer;
