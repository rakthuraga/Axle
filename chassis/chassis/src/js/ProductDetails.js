import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { supabase } from '../helpers/supabaseClient'
import styles from '../css/ProductDetails.module.css'
import Header from '../components/js/Header'
import Stepper from '../components/js/Stepper'
import { addToCart } from '../helpers/cartUtils';
import shopData from '../helpers/shopData.json';

function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [imageIndex, setImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);  // State for quantity
    const [buttonText, setButtonText] = useState('ADD TO CART'); // New state for button text
    const [buttonStyle, setButtonStyle] = useState('grey-outline-btn'); // New state for button style

    useEffect(() => {
        fetchItem();
    }, [id]);

    async function fetchItem() {
        /* -- SUPABASE PRODUCT FETCH -- */
        // const { data } = await supabase
        //     .from('vendor_parts')
        //     .select(`
        //         id,
        //         price, 
        //         images,
        //         parts:part_id!inner (
        //             id,
        //             name,
        //             number,
        //             description
        //         ), 
        //         vendors:vendor_id (
        //             id,
        //             name,
        //             url
        //         )
        //     `)
        //     .eq('id', id);
        // setProduct(data[0]);

        /* -- LOCAL DATA FETCH -- */
        const data = shopData.find(item => item.id === parseInt(id));
        setProduct(data);
    }

    function increment() {
        setQuantity(quantity + 1);
    }

    function decrement() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    function updateQuantity(value) {
        setQuantity(value);
    }

    function handleAddToCart() {
        addToCart(product, quantity);
        setButtonText('ITEM ADDED'); // Change button text
        setButtonStyle('green-complete-button'); // Switch to green button style
    }

    function handleBuyNow() {
        addToCart(product, quantity);
        navigate('/shop/checkout');
    }

    if (!product) {
        return;
    }

    return (
        <>
            <div className="container">
                <Header title="Part Details" />
            </div>

            <div className = {styles.backgroundMaker}>
                <div className={styles.productContainer}>
                <div className={styles.fit}>
                    <div className={styles.smallImageContainer}>
                        {(product.images).map((image, index) =>
                            <div className={`product-img-container ${styles.singleImgContainer} ${index === imageIndex ? styles.smallImgContainerActive : ""}`} key={index}>
                                <img src={image} alt={`${product.parts.name} #${index}`} className={`product-img ${styles.singleImg}`} onClick={() => setImageIndex(index)} />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className={`product-img-container ${styles.bigImageContainer}`}>
                            <img className='product-img' src={product.images[imageIndex]} alt={product.parts.name + " 1"} />
                        </div>
                    </div>
                    <div className = {styles.productContent}>
                        <div className={styles.productContentTop}>
                            <h1 className={styles.title}>{product.parts.name}</h1>
                            <div className = {styles.separateTitle}>
                                <span>From <a href={product.vendors.url} className={styles.underlinedText} target="_blank" rel="noreferrer">{product.vendors.name}</a></span>
                                <h3 className={styles.partNumber}>Part #{product.parts.number}</h3>
                            </div>
                            <div className = {styles.deliveryDetails}>
                                <h3 className= {styles.deliveryDetails}> Delivery in 1 - 2 days </h3>
                            </div>
                        </div>
                        <div className={styles.productContentBottom}>
                            <div className = {styles.priceQuantity}>
                                <div className= {styles.sparkTotal}>
                                    ${product.price}
                                </div>
                                <Stepper quantity={quantity} increment={increment} decrement={decrement} update={updateQuantity} />
                            </div>
                            <button className={`button stretch-btn dark-btn ${styles.buyNow}`} onClick={handleBuyNow}>BUY NOW</button>
                            <button
                                className={`button stretch-btn ${buttonStyle} ${styles.addToCart}`}
                                onClick={handleAddToCart}
                            >
                                {buttonText}
                            </button>            
                        </div>
                    </div>
                </div>
                    <div className = {styles.bottom}>
                        <div className = {styles.bottomLeft}>
                            <div className= {styles.productSpecifications}>
                                Product Specifications
                            </div>
                            <div className = {styles.productTextSeperator}>
                                <div className = {styles.productText}>
                                    Part#
                                </div>
                                <div className = {styles.productText}>
                                    {product.parts.number}
                                </div>
                            </div>
                            <div className = {styles.productTextSeperator}>
                                <div className = {styles.productText}>
                                    Weight
                                </div>
                                <div className = {styles.productText}>
                                    0.4lbs
                                </div>
                            </div>
                            <div className = {styles.productTextSeperator}>
                                <div className = {styles.productText}>
                                    Resistor Type
                                </div>
                                <div className = {styles.productText}>
                                    Yes
                                </div>
                            </div>
                            <div className = {styles.productTextSeperator}>
                                <div className = {styles.productText}>
                                    Center Electrode Tip Material
                                </div>
                                <div className = {styles.productText}>
                                    Iridium
                                </div>
                            </div>
                            <div className = {styles.productTextSeperator}>
                                <div className = {styles.productText}>
                                    Pre-Gap Size
                                </div>
                                <div className = {styles.productText}>
                                    0.04
                                </div>
                            </div>
                            <div className = {styles.productTextSeperator}>
                                <div className = {styles.productText}>
                                    Center Electrode Core Material
                                </div>
                                <div className = {styles.productText}>
                                    Copper
                                </div>
                            </div>
                        </div>

                        <div className = {styles.bottomRight}>
                            <div className= {styles.productSpecifications}>
                                Product Description
                            </div>
                            <div className = {styles.productDetails}>
                                {product.parts.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
