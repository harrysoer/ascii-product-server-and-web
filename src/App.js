import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import ProductCard from './components/ProductCard';

const ProductsSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: cneter;
`
export default class App extends Component {

    state = {
        products: [],
        isEnd: false,
        isLoading: false,
        query: {
            "_page": 1,
            "_sort": '',
            "_limit": 52
        },
        loadingIcon: ''
    }

    componentDidMount() {
        this.loadingAnimate();
        this.fetch(this.state.query);

        window.addEventListener("scroll", () => {
            const { isLoading, isEnd, query } = this.state;
            let newQuery = { ...query };

            if (document.documentElement) {
                const fullHeight = document.body.offsetHeight,
                    heightTop = window.pageYOffset,
                    innerHeight = window.innerHeight;

                if (heightTop + innerHeight > fullHeight) {
                    if (!isLoading && !isEnd) {
                        newQuery = { ...newQuery, page: ++newQuery["_page"] }
                        this.fetch(newQuery)
                    }
                }
            }
        });
    }

    fetch = async (query) => {
        const { products } = this.state;
        const param = Object.keys(query).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        }).join('&')

        this.setState({ isLoading: true })

        try {
            const { data } = await axios.get(`http://localhost:3000/api/products?${param}`)
            this.setState({
                products: [...products, ...data],
                isLoading: false,
                isEnd: data.length ? false : true,
                query: query
            })
        } catch (err) {
            this.setState({ isLoading: false })
            console.error(err)
        }
    }

    loadingAnimate = (index) => {
        let newIndex = index === 3 ? 0 : index;
        const frequency = 5;
        const ASCIIs = ["–", "/", "|", "\\\\"];
        setInterval(_ => {
            setTimeout(() => {
                this.setState({
                    loadingIcon: ASCIIs[newIndex]
                })
            }, 1000 / frequency);
        }, 1000)
    }

    render() {
        const { isLoading, products, loadingIcon } = this.state;
        return (
            <>
                <header>
                    <h1>Products Grid</h1>
                    <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
                </header>

                <ProductsSection id="product-list">
                    {products.map((product, index) =>
                        <Fragment key={product.id}>
                            <ProductCard data={product} />
                            {((index + 1) % 20 === 0) && ((<div style={{ width: '100%', height: '255px', textAlign: 'center' }}>
                                <p>But first, a word from our sponsors:</p>
                                <img class="ad" src={`/ads/?r=1`} />
                            </div>))}
                        </Fragment>
                    )}
                    {isLoading && (<div style={{ width: '100%', height: '255px', textAlign: 'center' }}>{loadingIcon}</div>)}
                </ProductsSection>
            </>)
    }
}