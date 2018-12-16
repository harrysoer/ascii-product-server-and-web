import React from 'react';

const ProductCard = (props) => {
    const { size, price, face, date } = props.data;


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
        <div class="card">
            <div class="product" fontSize={`${size}px`}>{face}</div>
            <div class="description">
                <div class="price" >${Number(price).toFixed(2)}</div>
                <div class="size" style={{ fontSize: `${size}px !important` }}>{size} pixels</div>
            </div>
            <div class="date-added">{formatDate(date)}</div>
        </div>
    )
}

export default ProductCard;