import { Link, useParams } from 'react-router-dom';
import products from "../data/products.js"
import BreadCrumb from "../components/BreadCrumb.jsx"
import ProductImages from '../components/ProductImages.jsx';
import ProductDetails from '../components/ProductDetails.jsx';

export default function ProductCard() {
  const { id } = useParams();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return <h1>Product not found</h1>;
  }
  return (
    <div className="container mx-auto p-4">    
    <div>
    </div>
  <BreadCrumb items={
    [
      {label: "Home", path: "/"},
      {label: "Electronics", path: "/electronics"},
      {label: "Laptops", path: "/laptops"},
      {label: "ASUS Vivobook", path: "/"},
    ]
  }/>
  
  <div className="pcard flex flex-col">
  <ProductImages product= {product}/>
  <ProductDetails product= {product} />
      
    </div>
    </div>
  );
}
