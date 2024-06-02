import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; // Ensure you import your main CSS file where Tailwind directives are included

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products.slice(0, 8)); // Limit to 8 products
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
        setError('There was an error fetching the products!');
        setLoading(false);
      });
  }, []);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  if (loading) {
<div class="flex justify-center items-center h-screen">
    <div class="relative inline-flex">
        <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
        <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div class="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
</div>  
}

  if (error) {
    return <div className="text-center text-white">{error}</div>;
  }

  const cardColors = ['bg-orange-500', 'bg-teal-500', 'bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500'];

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-1 flex flex-wrap items-center justify-center">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`flex-shrink-0 m-6 relative overflow-hidden ${cardColors[index % cardColors.length]} rounded-lg max-w-xs shadow-lg transition-transform transform hover:scale-105`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: 0.1 }}>
              <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
              <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
            </svg>
            <div className="relative pt-10 px-10 flex items-center justify-center">
              <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2 }}></div>
              <img className="relative w-40 skew-x-12" src={product.thumbnail} alt={product.title} />
              {hoveredIndex === index && (
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black font-semibold px-4 py-2 rounded shadow">
                  Add to Cart
                </button>
              )}
            </div>
            <div className={`relative text-white px-6 pb-6 mt-6 ${hoveredIndex !== index ? 'opacity-0' : ''}`}>
              <span className="block text-white opacity-75 -mb-1">{product.category}</span>
              <div className="flex justify-between">
                <span className="block text-white font-semibold text-xl">{truncateText(product.title, 5)}</span>
                <span className=" bg-black rounded-full text-xs font-bold px-3 py-2 leading-none flex items-center text-slate-900" style={{ color: cardColors[index % cardColors.length].split('-')[1] === 'white' ? 'black' : 'white' }}>
                  ${product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
