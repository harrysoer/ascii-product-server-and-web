import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { unionBy } from 'lodash';

import ProductCard from './components/ProductCard';
import Advertisement from './components/Advertisement';
import LoadingIcon from './components/LoadingIcon';
import Sort from './components/Sort';

const CancelToken = axios.CancelToken

export default class App extends Component {

    state = {
        adsId: [],
        products: [],
        queuedProducts: [],
        isEnd: false,
        isDoneFetching: false,
        isLoading: false,
        cancelSource: CancelToken.source(),
        willContinue: true,
        sortContainerOffsetTop: 0,
        sortContainerFixed: false,
        query: {
            "_page": 1,
            "_sort": '',
            "_limit": 40
        },
    }

    componentDidMount() {
        this.fetch(true);
        const sortContainer = document.getElementById('sort-container')
        this.setState({ sortContainerOffsetTop: sortContainer.offsetTop})

        window.onscroll = () => {

            if (document.documentElement) {
                const fullHeight = document.body.offsetHeight,
                    heightTop = window.scrollY,
                    innerHeight = window.innerHeight;

                if (heightTop + innerHeight >= fullHeight) {
                    console.log('GETTING')
                    this.fetchQueuedList()
                }

                this.setSortSticky(heightTop)
            }
        };
    }

    setSortSticky = (heightTop) =>{
        const { sortContainerOffsetTop } = this.state
        const willStick = ( heightTop > sortContainerOffsetTop)? true : false
        console.log(heightTop, sortContainerOffsetTop)
        console.log('cs',willStick)
        this.setState({ sortContainerFixed: willStick})
    }

    fetch = async (isInitialFetch = true) => {
        const { query } = this.state;
        const param = Object.keys(query).map((key) => `${key}=${query[key]}`).join('&');
        let newQuery = { ...query };

        this.setState({ isLoading: true })

        try {
            const { data } = await axios.get(`http://localhost:3000/api/products?${param}`, { cancelToken: this.state.cancelSource.token })
            const { queuedProducts } = this.state;

            let newProducts = isInitialFetch ? data : [...queuedProducts, ...data]
            newQuery = { ...newQuery, '_page': 1 + query["_page"] }

            this.setState({
                [isInitialFetch ? 'products' : 'queuedProducts']: newProducts,
                isLoading: false,
                isDoneFetching: data.length ? false : true,
                cancelSource: CancelToken.source(),
                query: newQuery
            })

            data.length && this.fetch(false)
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('canceled')
            }
            this.setState({ isLoading: false })
        }
    }

    onSort = (option) => {
        const { query, cancelSource } = this.state
        cancelSource.cancel()

        this.setState({
            query: { ...query, '_page': 1, '_sort': option.value },
            isDoneFetching: false,
            isEnd: false,
            isLoading: true,
            products: [],
            cancelSource: CancelToken.source(),
            queuedProducts: []
        }, _ => setTimeout(this.fetch, 1000))
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
        const { isEnd, isLoading, products, queuedProducts, isDoneFetching, sort, sortContainerFixed } = this.state;
        console.log(sortContainerFixed)
        return (
            <>
                <header>
                    <h1>Products Grid</h1>
                    <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
                </header>
                <Sort onSort={this.onSort} value={sort} isFixed={sortContainerFixed} />
                <div class="product-section">
                    {products.map((product, index) =>
                        <Fragment key={product.id}>
                            <ProductCard data={product} />
                            {((index + 1) % 20 === 0) && <Advertisement Id={Math.floor(Math.random() * 20)} />}
                        </Fragment>
                    )}
                    {isLoading && (<LoadingIcon />)}
                    {(isEnd && isDoneFetching && !queuedProducts.length)
                        && <div class="end">~ end of catalogue ~</div>}
                </div >
            </>)
    }
}