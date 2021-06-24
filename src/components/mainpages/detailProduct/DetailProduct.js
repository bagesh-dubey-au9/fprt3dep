import React, {useContext, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    // console.log(params)

    useEffect(() => {
        // console.log('re-render')
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product) 
            })
        }
    }, [params.id, products])

    // console.log(detailProduct)
    
    if(detailProduct.length === 0) return null

    return (
        <div className="detatil">
            <img src={detailProduct.images.url} alt="" />
            <div className="box-detail">
                <div className="row">
                    <h2>{detailProduct.title}</h2>
                    <h6>#id: {detailProduct.product_id}</h6>
                </div>
                <span>&#8377;{detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.content}</p>
                <p>Sold: {detailProduct.sold}</p>
                <Link to="/cart" className="cart">Buy Now</Link>
            </div>
            <div>
                <h2>Related Products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                            ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailProduct