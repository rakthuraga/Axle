import { useState, useEffect } from 'react'
import { updateQuantity, deleteFromCart } from '../../helpers/cartUtils';
import Stepper from './Stepper'
import styles from '../css/CheckoutItem.module.css'
import x_icon from '../../img/x-icon--grey.svg'

function CheckoutItem({ item, update }) {
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

    function deleteItem() {
        deleteFromCart(item);
        update();
    }

    return (
        <div className={styles.item}>
            <div className={`product-img-container ${styles.imgcontainer}`}>
                <img src={item.images[0]} alt={item.parts.name} className="product-img" />
            </div>

            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.row}>
                        <p className={styles.title}>{item.parts.name}</p>
                        <button onClick={deleteItem}><img src={x_icon} alt="X icon" /></button>
                    </div>

                    <p className={styles.subtitle}>Part #{item.parts.number}</p>
                </div>

                <div className={styles.price}>${item.price}</div>

                <div className={styles.bottom}>
                    <p className={styles.subtitle}>Estimated Delivery: May 6, 2024</p>

                    <div className={styles.quantity}>
                        <p className={styles.subtitle}>Qty</p>
                        <Stepper quantity={item.quantity} increment={increment} decrement={decrement} update={updateQuantityValue} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutItem;