import { Link, useParams } from 'react-router-dom';
import products from "../data/products.js"
import BreadCrumb from "../components/productdetails/BreadCrumb.jsx"
import ProductImages from '../components/productdetails/ProductImages.jsx';
import ProductDetails from '../components/productdetails/ProductDetails.jsx';
import Navbar from "../components/Navbar.jsx"

export default function ProductCard() {
  const { category, id } = useParams();

  const product = products.find(
    (p) => p.id === Number(id)
  );
  
  if (!product) {
    return <h1>Product not found</h1>;
  }
  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">    
  <BreadCrumb product={product}/>
  
  <div className="pcard flex flex-col md:flex-row gap-10">
  <ProductImages product= {product}/>
  <ProductDetails />
  
    </div>
    </div>
    </>
  );
}
