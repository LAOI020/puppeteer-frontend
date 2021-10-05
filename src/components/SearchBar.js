import React, { useEffect, useState } from 'react';
import '../styles/searchBar.css';


let oldValueScrollY = 0;
let directionScroll;

export const SearchBar = ({searchResults}) => {

    const [directionY, setDirectionY] = useState('top');

    const [inputValue, setInputValue] = useState('');
    
    const detectScrollDirection = () => {

        let getValue = window.scrollY;

        if(oldValueScrollY < getValue){
            directionScroll = 'down';

        } else if(oldValueScrollY > getValue){
            directionScroll = 'top';
        }
        
        if(directionY !== directionScroll){
            setDirectionY(directionScroll);
            console.log('cambiaaa');
        }

        oldValueScrollY = getValue;
    };
    
    useEffect(() => {
        
        window.addEventListener('scroll', detectScrollDirection);

        return () => {
            window.removeEventListener('scroll', detectScrollDirection);
        }

    }, [detectScrollDirection]);

    const submitForm = (e) => {
        e.preventDefault();

        if(inputValue.trim().length > 0){
            searchResults(inputValue);
            
            document.getElementById('inputSearch').blur();
        }
    };

    return (
        directionY === 'top' ?
            <div className="searchBar-container">
                <h3>Buscar</h3>
            
                <form onSubmit={submitForm}>
                    <input
                        id="inputSearch"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </form>
            </div>
            :
            null
    )
}
