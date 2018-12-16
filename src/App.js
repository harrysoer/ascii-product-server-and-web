import React, { Component } from 'react';
import ProductCard from './components/ProductCard';

export default class App extends Component {

    render() {
        return (<>
            <header>
                <h1>Products Grid</h1>

                <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

                <p>But first, a word from our sponsors:</p>
                <img class="ad" src={`/ads/?r=${Math.floor(Math.random() * 1000)}`} />
            </header>

            <section class="products">
                <ProductCard
                    data={{
                        "id": "77526-0t3zoarp321o",
                        "size": 33,
                        "price": 880,
                        "face": "(ಥ_ಥ)",
                        "date": "Sat Dec 08 2018 12:31:51 GMT+0800 (Philippine Standard Time)"
                    }}
                />
            </section>
        </>)
    }
}