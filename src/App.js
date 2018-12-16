import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import ProductCard from './components/ProductCard';

const ProductsSection = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export default class App extends Component {

    state = {
        products: [],
        query: {
            "_page": 0,
            "_sort": '',
            "_limit": 40
        }
    }

    componentDidMount() {
        this.fetch()
    }

    fetch = async (page, sortKey) => {
        const { query, products } = this.state
        const param = Object.keys(query).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        }).join('&')

        try {
            const { data } = await axios.get(`http://localhost:3000/api/products?${param}`)
            this.setState({
                products: [...products, ...data]
            })
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { products } = this.state;
        return (
            <>
                <header>
                    <h1>Products Grid</h1>
                    <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
                </header>

                <ProductsSection id="">
                    {products.map((product, index) =>
                        <>
                            <ProductCard key={product.id} data={product} />
                            {((index + 1) % 20 === 0) && ((<div style={{ width: '100%' }}>
                                <p>But first, a word from our sponsors:</p>
                                <img class="ad" src={`/ads/?r=${Math.floor(Math.random() * 1000)}`} />
                            </div>))}
                        </>
                    )}
                </ProductsSection>
            </>)
    }
}