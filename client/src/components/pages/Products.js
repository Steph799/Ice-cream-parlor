import React from 'react'
import { products } from '../../shared/constants'
import MyCard from '../utils/MyCard'
import { Route, Routes } from 'react-router'
import ProductDetails from '../products/ProductDetails';

function Products() {
    return (
        <div style={{ backgroundColor: "brown" }} >
            <Routes>
                {products.map(({ route, name }, index) => <Route key={index} path={route} element={<ProductDetails product={name} />} />)}
            </Routes>
            <div style={{ display: 'flex', flexWrap: "wrap", textAlign: "center" }}>
                {products.map(({ name, image, route }, index) => <MyCard key={index} name={name} image={image} route={route} ></MyCard>)}
            </div>
        </div>
    )
}

export default Products
