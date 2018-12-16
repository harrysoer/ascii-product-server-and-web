import React from 'react';
import styled from 'styled-components'

const ProductCard = (props) => {
    const { size, price, face, date } = props.data;

    const Card = styled.div`
        background: #FFFF;
        -webkit-box-shadow: 0 2px 6px 0 hsla(0 ,0% ,0%, 0.2);
        -moz-box-shadow: 0 2px 6px 0 hsla(0 ,0% ,0%, 0.2);
        box-shadow: 0 2px 6px 0 hsla(0 ,0% ,0%, 0.2);
        border-radius: 10px;
        display: grid;
        display: grid;
        font-family: 'Lato', sans-serif;
        margin: 20px;
        width: 22%;
    `

    const Description = styled.div`
        padding: 10px;
    `

    const Product = styled.div`
        color: #3c3b3b;
        font-size: 33px;
        font-family: unset !important;
        padding: 35px 0;
        text-align: center;
        background: #e8e8e8;
    `

    const Price = styled.div`
        font-weight: 700;
        font-size: 20px;
        color: #41d46a;
    `

    const Size = styled.div`
        font-size: 16px;
    `

    const DateAdded = styled.div`
        color: #484848;
        font-size: 14px;
        text-align: right;
        padding: 2px 5px;
    `

    const formatDate = (dateAdded) => {
        let newDateAddedMs = new Date(dateAdded).getTime(),
            dateTodayMs = new Date().getTime(),
            dayDifference = 0;
        const dayMs = 1000 * 60 * 60 * 24,
            timeDifference = Math.abs(dateTodayMs - newDateAddedMs);

        dayDifference = Math.ceil(timeDifference / dayMs);

        if (dayDifference > 7) {
            return new Date(dateAdded).toDateString().slice(4);
        } else {
            let dayText = ''

            if (dayDifference === 7) {
                dayText = 'A week ago'
            } else if (dayDifference === 1) {
                dayText = 'Today'
            } else {
                dayDifference = dayDifference - 1; //Corrects the format
                dayText = `${dayDifference} day${dayDifference > 1 ? 's' : ''} ago`
            }

            return dayText;
        }
    }

    return (
        <Card>
            <Product fontSize={`${size}px`}>{face}</Product>
            <Description>
                <Price>${Number(price).toFixed(2)}</Price>
                <Size>{size} pixels</Size>
            </Description>
            <DateAdded>{formatDate(date)}</DateAdded>
        </Card>
    )
}

export default ProductCard;