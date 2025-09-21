import React from 'react';
import ProductHero from './components/ProductHero/ProductHero';
// İleride eklenecek diğer bileşenler
// import ProductImages from './components/ProductImages/ProductImages';
// import ProductInfo from './components/ProductInfo/ProductInfo';

const ProductPage = () => {
  return (
    <main>
      <ProductHero />
      {/* <ProductImages /> */}
      {/* <ProductInfo /> */}
      {/* Diğer bileşenler buraya gelecek */}
       <div style={{ height: '100vh', padding: '80px', boxSizing: 'border-box' }}>
        <h2>Ürün Detayları Alanı</h2>
      </div>
    </main>
  );
};

export default ProductPage;