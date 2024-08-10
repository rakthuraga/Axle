import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'
import { getPriceSummary } from '../helpers/cartUtils'
import { supabase } from "../helpers/supabaseClient";
import Header from "../components/js/Header"
import OrderSummary from "../components/js/OrderSummary"
import styles from "../css/Payment.module.css"
import React from 'react';
import checkoutButton from '../css/Checkout.module.css'


function Payment() {
    const navigate = useNavigate();
    const [items, ] = useLocalStorageState('cart', { defaultValue: [] });
    const [subtotal, setSubtotal] = useState(0);
    const [fees, setFees] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [orderNumber, setOrderNumber] = useState(Math.floor(Math.random() * (899999999) + 100000000));

    useEffect(() => {
        updatePriceSummary();
    }, [items]);

    function updatePriceSummary() {
        const [subtotal, fees, shipping, total] = getPriceSummary();
        setSubtotal(subtotal);
        setFees(fees);
        setShipping(shipping);
        setTotal(total);
    }

    const handlePlaceOrder = () => {
        placeOrder();
        setTimeout(() => {
            navigate(`/shop/checkout/payment/confirmation/${orderNumber}`);
            localStorage.setItem('cart', JSON.stringify([]));
        }, 300);
    }

    async function placeOrder() {
        const { data } = await supabase
            .from('orders')
            .insert({
                status: "Processing",
                subtotal: subtotal,
                shipping: shipping,
                fees: fees,
                total: total,
                number: orderNumber
            })
            .select();

        let orderedParts = [];
        for (let i=0; i < items.length; i++) {
            orderedParts.push({
                vendor_part_id: items[i].id,
                order_id: data[0].id,
                quantity: items[i].quantity
            })
        }

        const { error } = await supabase
            .from('ordered_parts')
            .insert(orderedParts);
    }
    
    return (
        <div className="container">
            <Header title="Payment" hasSearch={false} />

            <div className={styles.detailscontainer}>
                <div className={styles.left}>
                    <div className={styles.statement}>
                        <div className={styles.header}>
                            <p className={`${styles.title}`}>Your Details</p>
                            <p className={styles.subheading}>Shipping Address</p> 
                            <div className = {styles.detailContent}>
                                <input placeholder="Select Country/Region" className={styles.input} />
                                <div className={styles.inputGroup}>
                                <input placeholder="First Name" className={styles.input} />
                                <div className={styles.gap}></div> {/* Add a div to create a gap */}
                                <input placeholder="Last Name" className={styles.input} />
                                </div>
                                <input placeholder="Address" className={styles.input} />
                                <input placeholder="Apt, Suite, etc." className={styles.input} />
                                <div className={styles.inputGroup}>
                                <input placeholder="City" className={styles.input} />
                                <div className={styles.secondGap}></div> {/* Add a div to create a gap */}
                                <input placeholder="State" className={styles.input} />
                                <div className={styles.secondGap}></div> {/* Add a div to create a gap */}
                                <input placeholder="ZIP Code" className={styles.input} />
                                </div>
                                <input placeholder="Email" className={styles.input} />
                                <input placeholder="Phone (optional)" className={styles.input} />
                            </div>
                            <div className={styles.heightGap}></div> 
                            <p className={styles.subheading}>Billing Address</p> 
                            <div className = {styles.detailContent}>
                                <input placeholder="Select Country/Region" className={styles.input} />
                                <div className={styles.inputGroup}>
                                <input placeholder="First Name" className={styles.input} />
                                <div className={styles.gap}></div> {/* Add a div to create a gap */}
                                <input placeholder="Last Name" className={styles.input} />
                                </div>
                                <input placeholder="Address" className={styles.input} />
                                <input placeholder="Apt, Suite, etc." className={styles.input} />
                                <div className={styles.inputGroup}>
                                <input placeholder="City" className={styles.input} />
                                <div className={styles.secondGap}></div> {/* Add a div to create a gap */}
                                <input placeholder="State" className={styles.input} />
                                <div className={styles.secondGap}></div> {/* Add a div to create a gap */}
                                <input placeholder="ZIP Code" className={styles.input} />
                                </div>
                                <input placeholder="Email" className={styles.input} />
                                <input placeholder="Phone (optional)" className={styles.input} />
                            </div>
                            <div className={styles.heightGap}></div> 
                            <p className={styles.subheading}>Shipping Method</p>
                            <div className = {styles.shippingBox}>
                            <div className = {styles.separate}>
                                <input className= {styles.checkBox} type="checkbox" checked />
                                <p className = {styles.shippingText}>Standard Shipping (4-5 business days)</p>  
                            </div>
                                <p className = {styles.shippingText}>${shipping}</p>                   
                            </div>          
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <OrderSummary items={items} subtotal={subtotal} shipping={shipping} fees={fees} total={total} />

                    <div className = {styles.summary}>
                    <div className={checkoutButton.buttons}>
                        <button className="button red-btn stretch-btn" onClick={handlePlaceOrder}>PLACE ORDER</button>
                    </div>
                    </div>                   
                </div>
            </div>
        </div>
    )
}

export default Payment;