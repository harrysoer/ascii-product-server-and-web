import React, { Component, Fragment } from 'react';
import axios from 'axios';

import ProductCard from './components/ProductCard';
import Advertisement from './components/Advertisement';
import LoadingIcon from './components/LoadingIcon';

export default class App extends Component {

    state = {
        adsId: [],
        products: [],
        isEnd: false,
        isLoading: false,
        query: {
            "_page": 1,
            "_sort": '',
            "_limit": 52
        },
    }

    componentDidMount() {
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

    render() {
        const { isEnd, isLoading, products } = this.state;
        return (
            <>
                <header>
                    <h1>Products Grid</h1>
                    <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
                </header>
                <div class="product-section" id="product-list">
                    {products.map((product, index) =>
                        <Fragment key={product.id}>
                            <ProductCard data={product} />
                            {((index + 1) % 20 === 0) && <Advertisement Id={Math.floor(Math.random() * 20)} />}
                        </Fragment>
                    )}
                    {isLoading && (<LoadingIcon />)}
                    {isEnd && <div class="end">~ end of catalogue ~</div>}
                </div >
            </>)
    }
}