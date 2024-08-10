import { Link } from 'react-router-dom'
import styles from '../css/OrderCard.module.css'

function OrderCard({ order }) {
    const statusClass = (order.status).includes("Attention") ? styles.attention : styles.processing;
    const delivery = (order.status).includes("Attention") ? "part out of stock" : "by May 1";
    const orderDate = (order.status).includes("Attention") ? "Apr 24, 2024" : "Apr 26, 2024";

    return (
        <div className={styles.row}>
            <div className={styles.left}>
                <div className={`product-img-container ${styles.img}`}>
                    <img src={order.ordered_parts[0].vendor_parts.images[0]} alt="ordered part" className="product-img" />
                </div>

                <div className={styles.info}>
                    <p className={styles.orderNumber}>Order #{order.number}</p>
                    <p className={styles.orderDate}>{orderDate}</p>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.status}>
                    <p className={`${styles.orderStatus} ${statusClass}`}>{order.status}</p>
                    <p className={styles.deliveryDate}>{delivery}</p>
                </div>

                <Link to={`/orders/detail/${order.id}`} className={styles.details}>View Order Details</Link>
            </div>
        </div>
    )
}

export default OrderCard;