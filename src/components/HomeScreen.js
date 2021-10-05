import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SearchBar } from './SearchBar';
import { ItemContainer } from './ItemContainer';
import '../styles/homeScreen.css';
import loadingItems from '../styles/cargandoItems.gif';


const socket = io.connect('http://localhost:9000');

export const HomeScreen = () => {

    const [items, setItems] = useState([]);

    const [showSearchBar, setShowSearchBar] = useState(true);

    const [showItems, setShowItems] = useState(false);

    useEffect(() => {
        socket.on('getItemsResults', (data) => {
            setItems((value) => [...value, ...data]);
            console.log(data);
        });
    }, []);

    const searchItems = (text) => {
        socket.emit('requestItemResults', {value: text});

        setShowItems(true);

        setShowSearchBar(false);

        setTimeout(() => {
            setShowSearchBar(false);
        }, 120000);
    }

    console.log('ITEMSSS');
    console.log(items);
    return (
        <div className='home-container'>
            {showSearchBar &&
                <SearchBar
                    searchResults={searchItems}
                />
            }

            {showItems &&
                <>
                <div className="itemsList-container">
                    {items.length > 0 ?
                        items.map((item) => (
                            <ItemContainer
                                key={`${item.link}${item.name}`}
                                item={item}
                            />
                        ))
                        :
                        null
                    }
                </div>

                <LoadingContainer/>
                </>
            }
        </div>
    )
};


const LoadingContainer = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15px'
        }}>
            <img
                className="loadingImg"
                src={loadingItems}
                alt=""
            />
        </div>
    )
}

