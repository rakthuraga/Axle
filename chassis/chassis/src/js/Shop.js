import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { supabase } from '../helpers/supabaseClient'
import styles from '../css/Shop.module.css'
import Header from '../components/js/Header'
import Card from '../components/js/Card'
import defaultData from '../helpers/defaultShopData.json'
import shopData from '../helpers/shopData.json'

function Shop() {
    const { query } = useParams();
    const [items, setItems] = useState(defaultData);
    const [numItems, setNumItems] = useState(0);
    const [addedItem, setAddedItem] = useState(null);

    const cardContainerAnim = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const cardAnim = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    useEffect(() => {
        if (query) {
            setItems([]);
            fetchData();
        }
    }, [query]);

    async function fetchData() {
        /* -- SUPABASE QUERY FETCH -- */
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
        //     .ilike('parts.name', `%${decodeURI(query)}%`);

        // if (data) {
        //     setItems(data);
        // }

        /* -- LOCAL DATA QUERY FETCH -- */
        const queryFormatted = query[0].toUpperCase() + query.slice(1);
        const data = shopData.filter(item => (item.parts.name).includes(queryFormatted));
        setItems(data);
    }

    const addItem = (item) => {
        setNumItems(numItems + 1);
        setAddedItem(item);
    }

    function dismissCart() {
        setAddedItem(null);
    }
    
    return (
        <div className="container">
            <Header title="Order Parts" addedItem={addedItem} dismissCartParam={dismissCart} />

            {items.length > 0 ? 
                <motion.ul 
                    className={styles.cardscontainer} 
                    variants={cardContainerAnim} 
                    initial="hidden"
                    animate="visible"
                >
                    {items.map((item, index) => (
                        <motion.li className={styles.cardsbox} key={index} variants={cardAnim}>
                            <Card item={item} addItem={addItem} />
                        </motion.li>
                    ))}
                </motion.ul>
            :
                <p className={styles.noresults}>No results for "{query}"</p>
            }
        </div>
    )
}

export default Shop;