import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useLocalStorageState from 'use-local-storage-state'
import { getPriceSummary } from '../helpers/cartUtils'
import Header from '../components/js/Header'
import CheckoutItem from '../components/js/CheckoutItem'
import styles from '../css/Checkout.module.css'
import logo from "../img/logo--grey.svg"

function Checkout() {
    const navigate = useNavigate();

    // Animation variables
    const [parent, ] = useAutoAnimate()

    // State variables 
    const [isEmpty, setIsEmpty] = useState(true);
    const [items, ] = useLocalStorageState('cart', { defaultValue: [] });
    const [subtotal, setSubtotal] = useState(0);
    const [fees, setFees] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        updatePriceSummary();

        if (items.length === 0) {
            const timeout = setTimeout(() => {
                setIsEmpty(true);
            }, 300);
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

    return (
        <div className="container">
            <Header title="Checkout" hasSearch={false} />

            {isEmpty ? 
                <div className={styles.none}>
                    <div className={styles.header}>
                        <p className={styles.title}>Your Shopping Cart</p>
                        <p className={styles.subtitle}>({items.length} items)</p>
                    </div>

                    <div className={styles.emptycontent}>
                        <img src={logo} alt="logo" className={styles.logo} />
                        <p className={styles.msg}>Your cart is empty</p>
                        <button className="button red-btn stretch-btn" onClick={() => navigate('/shop')}>CONTINUE SHOPPING</button>
                    </div>
                </div>
            :
                <div className={styles.checkout}>
                    <div className={styles.cart}>
                        <div className={styles.header}>
                            <p className={styles.title}>Your Shopping Cart</p>
                            <p className={styles.subtitle}>({items.length} {items.length === 1 ? "item" : "items"})</p>
                        </div>

                        <div className={styles.allitems}>
                            <div className={styles.vendor}>
                                {/* <p className={styles.vendorname}>Vendor 1</p> */}

                                <div className={styles.items} ref={parent}>
                                    {items.map((item) =>
                                        <CheckoutItem item={item} update={updatePriceSummary} key={item.id} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.summary}>
                        <p className={styles.header2}>Order Summary</p>

                        <div className={styles.details}>
                            <div className={styles.detailsection}>
                                <div className={styles.detailline}>
                                    <p className={styles.detailname}>Subtotal ({items.length} {items.length === 1 ? "item" : "items"})</p>
                                    <p className={styles.price}>${subtotal}</p>
                                </div>
                            </div>

                            <div className={styles.detailsection}>
                                <div className={styles.detailline}>
                                    <p className={styles.detailname}>Estimated Shipping</p>
                                    <p className={styles.price}>${shipping}</p>
                                </div>
                            </div>

                            <div className={styles.detailsection}>
                                <div className={styles.detailline}>
                                    <p className={styles.detailname}>Fees & Estimated Tax</p>
                                    <p className={styles.price}>${fees}</p>
                                </div>
                                <div className={styles.detailmore}>
                                    <p>Transaction fee</p>
                                    <p>Estimated tax (CA)</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.total}>
                            <p className={styles.totaltext}>Total</p>
                            <p className={styles.totalprice}>${total}</p>
                        </div>

                        <div className={styles.buttons}>
                            <button className="button red-btn stretch-btn" onClick={() => navigate('/shop')}>CONTINUE SHOPPING</button>
                            <button className="button red-outline-btn stretch-btn" onClick={() => navigate('/shop/checkout/payment')}>CHECKOUT</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Checkout;