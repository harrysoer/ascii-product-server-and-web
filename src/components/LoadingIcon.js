import React, { Component } from 'react';

export default class LoadingIcon extends Component {
    intervalQueue = 0;
    timeoutQueue = 0;
    state = {
        loadingIcon: ''
    };

    componentDidMount() {
        clearInterval(this.intervalQueue);
        let index = 0;
        const frequency = 5;
        const ASCIIs = ["–", "/", "|", "\\\\"];
        this.intervalQueue = setInterval(() => {
            this.timeoutQueue = setTimeout(() => {
                this.setState({
                    loadingIcon: ASCIIs[index]
                })
                index = index === 3 ? 0 : ++index;
            }, 1000 / frequency);
        }, 200)

    }

    render() {
        return (
            <div class="loading">
                {this.state.loadingIcon}  Loading...
            </div>
        )
    }

    componentWillUnmount() {
        clearInterval(this.intervalQueue);
        clearTimeout(this.timeoutQueue)
    }
}      