import React from 'react';
import '../styles/itemContainer.css';


export const ItemContainer = ({item}) => {

    const {link, name, price, imageSrc} = item;

    const clickItem = () => {
        window.open(link, '_blank');
    };

    return (
        <div 
            className="container-item"
            onClick={clickItem}
        >
            <img 
                src={imageSrc}
                alt=""
                // height="100%"
                width="100%"
            />

            <h4>{name}</h4>

            <h4>{price}</h4>
        </div>
    )
};
