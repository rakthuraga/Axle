import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../helpers/supabaseClient";
import Header from "../components/js/Header";
import OrderCard from "../components/js/OrderCard";
import styles from "../css/Orders.module.css";
import ordersData from "../helpers/ordersData.json";

function Orders() {
    const [orders, setOrders] = useState([]);

    const containerAnim = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.25 }
        }
    }

    const cardAnim = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    useEffect(() => {
        getOrders();
    }, []);

    async function getOrders() {
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
        //     .order('id', { ascending: false });
        // setOrders(data);

        /* -- LOCAL DATA ORDER FETCH -- */
        setOrders(ordersData);
    }

    return (
        <div className="container">
            <Header title="Your Orders" hasSearch={false} />

            <div className={styles.page}>
                <div className={styles.section}>
                    <p className={styles.title}>Orders in Progress</p>

                    <motion.ul 
                        className={styles.orders} 
                        variants={containerAnim} 
                        initial="hidden"
                        animate="visible"
                    >
                        {orders.map((order) => 
                            <motion.li key={order.id} variants={cardAnim}>
                                <OrderCard order={order} key={order.id} />
                            </motion.li>
                        )}
                    </motion.ul>
                </div>
            </div>
        </div>
    )
}

export default Orders;