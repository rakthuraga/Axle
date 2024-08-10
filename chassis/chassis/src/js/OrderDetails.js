import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { supabase } from '../helpers/supabaseClient';
import Header from "../components/js/Header"
import OrderSummary from "../components/js/OrderSummary"
import CartItem from "../components/js/CartItem"
import styles from "../css/OrderDetails.module.css"
import orderTracking from "../img/order-tracking.svg"
import ordersData from "../helpers/ordersData.json"

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [statusClass, setStatusClass] = useState(styles.processing);
    const [orderDate, setOrderDate] = useState("Apr 26, 2024");
    const [attention, setAttention] = useState(false);

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
        /* -- SUPABASE ORDER FETCH -- */
        // const { data } = await supabase
        //     .from("orders")
        //     .select(`
        //         *,
        //         ordered_parts (
        //             quantity,
        //             vendor_parts:vendor_part_id (
        //                 id,
        //                 price, 
        //                 images,
        //                 parts:part_id!inner (
        //                     id,
        //                     name,
        //                     number,
        //                     description
        //                 ), 
        //                 vendors:vendor_id (
        //                     id,
        //                     name,
        //                     url
        //                 )
        //             )
        //         )
        //     `)
        //     .eq('id', orderId);
        // setOrder(data[0]);

        /* -- LOCAL DATA ORDER FETCH -- */
        const data = ordersData.filter(order => order.id === parseInt(orderId));
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
        
        setTimeout(() => {
            if ((data[0].status).includes("Attention")) {
                setStatusClass(styles.attention);
                setOrderDate("Apr 24, 2024");
                setAttention(true);
            }
        }, 100);
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
                        <motion.li key="order-details-1" variants={sectionAnim}>
                            <div className={styles.header}>
                                <p className={`${styles.title} ${statusClass}`}>{order.status}</p>
                                <p className={styles.subheading}>Order #{order.number}</p>
                                <p className={styles.paragraph}>{orderDate}</p>
                            </div>
                        </motion.li>

                        <motion.li key="order-details-2" variants={sectionAnim}>
                            <div className={styles.notification}>
                                {attention ?
                                <>
                                    <p className={styles.notificationtitle}>Some items you ordered are <span style={{fontWeight: 700}}>out of stock</span>:</p>

                                    <div className={styles.item}>
                                        <div className={styles.cartitem}>
                                            <CartItem item={items[0]} added={true} />
                                        </div>

                                        <div className={styles.options}>
                                            <button className="button small-btn blue-grey-btn">Change Vendor</button>
                                            <button className="button small-btn blue-grey-btn">Order from OEM</button>
                                            <button className={`button ${styles.blankbtn}`}>Cancel</button>
                                        </div>
                                    </div>
                                </>
                                :
                                    <img src={orderTracking} alt="Order tracking timeline" style={{width: "100%"}}/>
                                }
                            </div>
                        </motion.li>

                        <div className={styles.content}>
                            <motion.li key="order-details-3" variants={sectionAnim}>
                                <p className={styles.heading}>Order Summary</p>

                                <div className={styles.total}>
                                    <p className={styles.subheading}>Total</p>
                                    <p className={styles.price}>${order.total}</p>
                                </div>
                            </motion.li>

                            <motion.li key="order-details-4" variants={sectionAnim}>
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
                            </motion.li>
                        </div>
                    </motion.ul>
                </div>

                <motion.div 
                    className={styles.right}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 1
                    }}
                >
                    <OrderSummary items={items} subtotal={order.subtotal} shipping={order.shipping} fees={order.fees} total={order.total} />
                </motion.div>
            </div>
            }
        </div>
    )
}

export default OrderDetails;