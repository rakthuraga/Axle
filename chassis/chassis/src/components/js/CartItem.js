import { useState, useEffect } from 'react';
import { updateQuantity, deleteFromCart } from '../../helpers/cartUtils';
import styles from '../css/CartItem.module.css'
import Stepper from './Stepper'

function CartItem({ item, update, added }) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item]);

    function increment() {
        updateQuantity(item.id, quantity+1);
        setQuantity(quantity + 1);
        update();
    }

    function decrement() {
        if (quantity === 1) {
            deleteFromCart(item);
        }
        else {
            updateQuantity(item.id, quantity-1);
            setQuantity(quantity - 1);
        }
        update();
    }

    function updateQuantityValue(value) {
        updateQuantity(item.id, value);
        setQuantity(value);
        update();
    }

    return (
        <div className={styles.item}>
            <div className={`product-img-container ${styles.imgcontainer}`}>
                <img className={`product-img ${styles.img}`} src={item.images[0]} alt={item.parts.name} />
            </div>

            <div className={styles.info}>
                <p className={styles.name}>{item.parts.name}</p>


                {added ? 
                    <div className={styles['price-quantity']}>
                        <p className={styles.quantity}>QTY: {quantity}</p>
                        <p className={styles.price}>${item.price}</p>
                    </div> 
                : 
                    <div className={styles['price-quantity']}>
                        <p className={styles.price}>${item.price}</p>
                        <Stepper quantity={quantity} increment={increment} decrement={decrement} update={updateQuantityValue} />
                    </div>
                }
            </div>
        </div>
    )
}

export default CartItem;