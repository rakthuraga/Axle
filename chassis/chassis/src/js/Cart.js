import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { animated } from '@react-spring/web'
import { useSpring } from '@react-spring/core'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useLocalStorageState from 'use-local-storage-state'
import { getPriceSummary } from '../helpers/cartUtils'
import CartItem from "../components/js/CartItem"
import styles from "../css/Cart.module.css"
import x_icon from "../img/x-icon.svg"
import logo from "../img/logo--grey.svg"
import checkmark from "../img/checkmark.svg"

function Cart({ isOpen, dismiss, added, addedItem }) {
    const navigate = useNavigate();

    // Animation variables
    const cartProps = useSpring({ right: isOpen ? '0%' : '-28%' });
    const backgroundProps = useSpring({
        backgroundColor: isOpen ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)",
        visibility: isOpen ? "visible" : "hidden"
    })
    const [parent, ] = useAutoAnimate()

    // State variables 
    const [isEmpty, setIsEmpty] = useState(true);
    const [items, ] = useLocalStorageState('cart', { defaultValue: [] });
    const [subtotal, setSubtotal] = useState(0);
    const [fees, setFees] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (items) {
            updatePriceSummary();
        }

        if (items.length === 0) {
            const timeout = setTimeout(() => {
                setIsEmpty(true);
            }, 500);
            return () => clearTimeout(timeout);
        }
        else {
            setIsEmpty(false);
        }
    }, [items]);

    function updatePriceSummary() {
        const [subtotal, fees, shipping, total] = getPriceSummary();
        setSubtotal(subtotal);
        setFees(fees);
        setShipping(shipping);
        setTotal(total);
    }

    function handleContinue() {
        dismiss();
        navigate('/shop');
    }

    function handleCheckout() {
        dismiss();
        navigate('/shop/checkout');
    }

    return (
        <>
            <animated.div className={styles.background} style={backgroundProps} onClick={dismiss}></animated.div>

            <animated.div className={styles.cart} style={cartProps}>
                {added ? 
                    <>
                        <div className={styles.header}>
                            <p className={`${styles.title} ${styles.icontitle}`}>
                                <img src={checkmark} alt="Checkmark icon" />
                                Added to Cart
                            </p>
                            <button className={styles.title}><img src={x_icon} alt="X icon" onClick={dismiss}/></button>
                        </div>

                        <CartItem item={addedItem} key={addedItem.id} update={updatePriceSummary} added={true} />

                        <div className={styles.addedSummary}>
                            <p className={styles.subtitle}>Cart ({items.length} {items.length === 1 ? "item" : "items"})</p>

                            <div className={styles.addedInfo}>
                                <div className={`${styles['info-item']}`}>
                                    <p className={styles.total}>Total</p>
                                    <p className={styles['total-price']}>${total}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cartbtns}>
                            <button className="button stretch-btn red-btn" onClick={handleContinue}>CONTINUE SHOPPING</button>
                            <button className="button stretch-btn grey-outline-btn" onClick={handleCheckout}>CHECKOUT</button>
                        </div>
                    </>  
                : (isEmpty ? 
                    <>
                        <div className={styles.header}>
                            <p className={styles.title}>Your Shopping Cart</p>
                            <button className={styles.title}><img src={x_icon} alt="X icon" onClick={dismiss}/></button>
                        </div>

                        <div className={styles.emptycontent}>
                            <img src={logo} alt="logo" />
                            <p className={styles.msg}>Your cart is empty</p>
                            <button className="button red-btn stretch-btn" onClick={handleContinue}>CONTINUE SHOPPING</button>
                        </div>
                    </>
                    :
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <div className={styles.header}>
                                <p className={styles.title}>Your Shopping Cart</p>
                                <button className={styles.title}><img src={x_icon} alt="X icon" onClick={dismiss}/></button>
                            </div>

                            <div className={styles.items} ref={parent}>
                                {items.map((item) =>
                                    <CartItem item={item} key={item.id} update={updatePriceSummary} added={false} />
                                )}
                            </div>
                        </div>

                        <div className={styles.summary}>
                            <p className={styles.subtitle}>Summary</p>
                            
                            <div className={styles.info}>
                                <div className={styles['info-item']}>
                                    <p className={styles['info-name']}>Items</p>
                                    <p className={styles['info-price']}>${subtotal}</p>
                                </div>

                                <div className={styles['info-item']}>
                                    <p className={styles['info-name']}>Fees & Estimated Tax</p>
                                    <p className={styles['info-price']}>${fees}</p>
                                </div>

                                <div className={styles['info-item']}>
                                    <p className={styles['info-name']}>Shipping</p>
                                    <p className={styles['info-price']}>${shipping}</p>
                                </div>
                            </div>

                            <div className={`${styles['info-item']} ${styles['total-box']}`}>
                                <p className={styles.total}>Total</p>
                                <p className={styles['total-price']}>${total}</p>
                            </div>

                            <div className={styles.cartbtns}>
                                <button className="button red-btn stretch-btn" onClick={handleContinue}>CONTINUE SHOPPING</button>
                                <button className="button red-outline-btn stretch-btn" onClick={handleCheckout}>CHECKOUT</button>
                            </div>
                        </div>
                    </div>
                )}
            </animated.div>
        </>
    )
}

export default Cart;