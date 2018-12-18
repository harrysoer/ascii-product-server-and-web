import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { unionBy } from 'lodash';

import ProductCard from './components/ProductCard';
import Advertisement from './components/Advertisement';
import LoadingIcon from './components/LoadingIcon';

export default class App extends Component {

    state = {
        adsId: [],
        products: [],
        queuedProducts: [],
        isEnd: false,
        isDoneFetching: false,
        isLoading: false,
        query: {
            "_page": 1,
            "_sort": '',
            "_limit": 40
        },
    }

    componentDidMount() {
        this.fetch(true);

        window.onscroll = () => {

            if (document.documentElement) {
                const fullHeight = document.body.offsetHeight,
                    heightTop = window.pageYOffset,
                    innerHeight = window.innerHeight;

                if (heightTop + innerHeight > fullHeight) {
                    this.fetchQueuedList()
                }
            }
        };
    }

    fetch = async (isInitialFetch) => {
        const { query } = this.state;
        const param = Object.keys(query).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        }).join('&')
        let newQuery = { ...query };

        this.setState({ isLoading: true })

        try {
            const { data } = await axios.get(`http://localhost:3000/api/products?${param}`)
            const { queuedProducts } = this.state;

            let newProducts = isInitialFetch ? data : [...queuedProducts, ...data]
            newQuery = { ...newQuery, page: ++newQuery["_page"] }

            this.setState({
                [isInitialFetch ? 'products' : 'queuedProducts']: newProducts,
                isLoading: false,
                isDoneFetching: data.length ? false : true,
                query: newQuery
            })

            data.length && this.fetch(false)
        } catch (err) {
            this.setState({ isLoading: false })
            console.error(err)
        }
    }

    fetchQueuedList = () => {
        const { isEnd, queuedProducts } = this.state

        if (!isEnd && queuedProducts.length) {
            const { isDoneFetching, products } = this.state
            let newQueuedProducts = [...queuedProducts];
            let newProducts = newQueuedProducts.slice(0, 40);
            newQueuedProducts.splice(0, 40)

            let isEnd = (isDoneFetching && !newQueuedProducts.length) ? true : false;
            let prodlist = unionBy(products, newProducts, 'id')

            this.setState({
                products: prodlist,
                queuedProducts: newQueuedProducts,
                isEnd
            }, _ => console.log(this.state))

        } else {
            const { isDoneFetching, queuedProducts } = this.state

            let isEnd = (isDoneFetching && queuedProducts) ? true : false;
            this.setState({ isEnd })
        }
    }

    render() {
        const { isEnd, isLoading, products, queuedProducts, isDoneFetching } = this.state;
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
                    {(isEnd && isDoneFetching && !queuedProducts.length) && <div class="end">~ end of catalogue ~</div>}
                </div >
            </>)
    }
}