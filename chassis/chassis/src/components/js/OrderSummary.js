import CartItem from "./CartItem";
import styles from "../css/OrderSummary.module.css"


function OrderSummary({ items, subtotal, shipping, fees, total }) {
    return (
        <div className={styles.summary}>
            <div className={styles.top}>
                <p className={styles.title}>Order Summary</p>

                <div className={styles.items}>
                    {items.map((item, id) =>
                        <CartItem item={item} added={true} key={id} />
                    )}
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.details}>
                    <div className={styles.detailsection}>
                        <div className={styles.detailline}>
                            <p className={styles.detailname}>Subtotal ({items.length} {items.length === 1 ? "item" : "items"})</p>
                            <p className={styles.price}>${parseFloat(subtotal).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className={styles.detailsection}>
                        <div className={styles.detailline}>
                            <p className={styles.detailname}>Estimated Shipping</p>
                            <p className={styles.price}>${parseFloat(shipping).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className={styles.detailsection}>
                        <div className={styles.detailline}>
                            <p className={styles.detailname}>Fees & Estimated Tax</p>
                            <p className={styles.price}>${parseFloat(fees).toFixed(2)}</p>
                        </div>
                        <div className={styles.detailmore}>
                            <p>Transaction fee</p>
                            <p>Estimated tax (CA)</p>
                        </div>
                    </div>
                </div>

                <div className={styles.total}>
                    <p className={styles.totaltext}>Total</p>
                    <p className={styles.totalprice}>${parseFloat(total).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;