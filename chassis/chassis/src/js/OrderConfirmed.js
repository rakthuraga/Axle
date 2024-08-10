import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { supabase } from "../helpers/supabaseClient";
import Header from "../components/js/Header"
import OrderSummary from "../components/js/OrderSummary"
import styles from "../css/OrderDetails.module.css"
import continueShoppingButton from '../css/Checkout.module.css'
import checkmark from "../img/checkmark.svg"


function OrderConfirmed() {
    const navigate = useNavigate();
    const { orderNumber } = useParams();
    const [order, setOrder] = useState({});
    const [items, setItems] = useState([]);

    const containerAnim = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.25 }
        }
    }

    const sectionAnim = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    async function fetchOrder() {
        const { data } = await supabase
            .from("orders")
            .select(`
                *,
                ordered_parts (
                    quantity,
                    vendor_parts:vendor_part_id (
                        id,
                        price, 
                        images,
                        parts:part_id!inner (
                            id,
                            name,
                            number,
                            description
                        ), 
                        vendors:vendor_id (
                            id,
                            name,
                            url
                        )
                    )
                )
            `)
            .eq('number', orderNumber);

        setOrder(data[0]);

        let orderItems = [];
        for (let i=0; i < data[0].ordered_parts.length; i++) {
            orderItems.push({
                id: data[0].ordered_parts[i].id,
                quantity: data[0].ordered_parts[i].quantity,
                price: data[0].ordered_parts[i].vendor_parts.price,
                images: data[0].ordered_parts[i].vendor_parts.images,
                parts: {
                    name: data[0].ordered_parts[i].vendor_parts.parts.name
                }
            })
        }

        setItems(orderItems);
    }

    return (
        <div className="container">
            <Header title="Your Orders" hasSearch={false} />

            {order && 
                <div className={styles.detailscontainer}>
                    <div className={styles.left}>
                        <motion.ul
                            className={styles.statement} 
                            variants={containerAnim} 
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.li key={1} variants={sectionAnim}>
                                <div className={styles.header}>
                                    <div className={styles.confirmedTitle}>
                                        <img src={checkmark} alt="Checkmark icon" />
                                        <p className={styles.title}>Order Confirmed</p>
                                    </div>
                                    <p className={styles.subheading}>Order #{orderNumber}</p>
                                    <p className={styles.paragraph}>April 24, 2024</p>
                                </div>
                            </motion.li>

                            <div className={styles.content}>
                                <motion.li key={2} variants={sectionAnim}>
                                    <div>
                                        <p className={styles.heading}>Order Summary</p>

                                        <div className={styles.total}>
                                            <p className={styles.subheading}>Total</p>
                                            <p className={styles.price}>${order.total}</p>
                                        </div>
                                    </div>
                                </motion.li>

                                <motion.li key={3} variants={sectionAnim}>
                                    <div>
                                        <p className={styles.heading}>Order Details</p>

                                        <div className={styles.details}>
                                            <div className={styles.row}>
                                                <div className={styles.col}>
                                                    <p className={styles.subheading}>Contact Information</p>
                                                    <p className={styles.paragraph}>Avery Park</p>
                                                    <p className={styles.paragraph}>averyp@usc.edu</p>
                                                    <p className={styles.paragraph}>+1 (561) 303 4937</p>
                                                </div>

                                                <div className={styles.col}>
                                                    <p className={styles.subheading}>Payment Method</p>
                                                    <p className={styles.paragraph}>Visa ---- ---- ---- 1234</p>
                                                    <p className={styles.paragraph}>Exp 05/27</p>
                                                </div>
                                            </div>
                                            
                                            <div className={styles.row}>
                                                <div className={styles.col}>
                                                    <p className={styles.subheading}>Shipping Address</p>
                                                    <p className={styles.paragraph}>Avery Park</p>
                                                    <p className={styles.paragraph}>2585 S Hoover St</p>
                                                    <p className={styles.paragraph}>Apt 3001</p>
                                                    <p className={styles.paragraph}>Los Angeles, California 90007</p>
                                                </div>

                                                <div className={styles.col}>
                                                    <p className={styles.subheading}>Billing Address</p>
                                                    <p className={styles.paragraph}>Avery Park</p>
                                                    <p className={styles.paragraph}>2585 S Hoover St</p>
                                                    <p className={styles.paragraph}>Apt 3001</p>
                                                    <p className={styles.paragraph}>Los Angeles, California 90007</p>
                                                </div>
                                            </div>

                                            <div className={styles.row}>
                                                <div className={styles.col}>
                                                    <p className={styles.subheading}>Shipping Method</p>
                                                    <p className={styles.paragraph}>Standard</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.li>
                            </div>
                        </motion.ul>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 0.75
                        }}
                        className={styles.right}
                    >
                        <OrderSummary items={items} subtotal={order.subtotal} shipping={order.shipping} fees={order.fees} total={order.total} />
                        <div className = {styles.summary}>
                            <div className={continueShoppingButton.buttons}>
                                <button className="button red-btn stretch-btn" onClick={() => navigate('/shop')}>CONTINUE SHOPPING</button>
                            </div>
                        </div>    
                    </motion.div>
                </div>
            }
        </div>
    )
}

export default OrderConfirmed;