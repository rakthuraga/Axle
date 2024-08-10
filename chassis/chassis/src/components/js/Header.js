import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'
import Search from './Search'
import Cart from '../../js/Cart'
import Filter from './Filter'
import styles from '../css/Header.module.css'
import filter_icon from '../../img/filter-icon.svg'
import cart_icon from '../../img/cart-icon--black.svg'
import user_icon from '../../img/user-icon.svg'

function Header({ title, addedItem, dismissCartParam=null, hasSearch=true }) {
    const navigate = useNavigate();
    const [items, ] = useLocalStorageState('cart', { defaultValue: [] });
    const [numItems, setNumItems] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        setNumItems(items.length);
    }, [items]);

    useEffect(() => {
        if (addedItem) {
            setAdded(true);
            setIsCartOpen(true);
        }
    }, [addedItem]);

    function dismissCart() {
        setIsCartOpen(false);

        setTimeout(() => {
            setAdded(false);
            if (dismissCartParam) dismissCartParam();
        }, 300);
    }

    function dismissFilter() {
        setIsFilterOpen(false);
    }

    const handleCartClick = () => {
        setIsCartOpen(true)
    }

    const handleFilterClick = () => {
        setIsFilterOpen(true);
    }

    const handleEnter = (query) => {
        if (query) {
            navigate(`/shop/${encodeURI(query)}`);
        }
    }

    return (
        <>
            {hasSearch && 
            <>
                <Filter isOpen={isFilterOpen} dismiss={dismissFilter} />
                <Cart isOpen={isCartOpen} dismiss={dismissCart} added={added} addedItem={addedItem} />
            </>
            }

            <div className={styles.header}>
                <p className={styles.title}>{title}</p>

                {hasSearch && 
                    <div className={styles.row}>
                        <div className={styles.search}>
                            <Search handleEnter={handleEnter} />
                            <button className={`${styles.filters} blue-grey-btn`} onClick={handleFilterClick}><img src={filter_icon} alt="Filter icon" className={styles.filtericon} />Filter</button>
                        </div>

                        <div className={styles.left}>
                            <div className={styles.carticon}>
                                {numItems > 0 &&
                                    <div className={styles.cartnumber}>{numItems}</div>
                                }
                                <button onClick={handleCartClick}><img src={cart_icon} alt="Cart icon" className={styles.icon} /></button>
                            </div>
                            <button><img src={user_icon} alt="User profile icon" className={styles.icon} /></button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Header;