import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import Header from '../components/js/Header'
import Dropdown from "../components/js/Dropdown";
import styles from '../css/Home.module.css'
import name_logo from '../img/name-logo.svg'
import car from '../img/car.svg'

const makeOptions = [
    {
        id: 1,
        name: "All Makes",
    },
    {
        id: 2,
        name: "Honda",
    },
]

const modelOptions = [
    {
        id: 1,
        name: "All Models",
    },
    {
        id: 2,
        name: "Accord",
    },
    {
        id: 3,
        name: "Accord Crosstour",
    },
    {
        id: 4,
        name: "City",
    },
    {
        id: 5,
        name: "Civic",
    },
    {
        id: 6,
        name: "Clarity",
    },
    {
        id: 7,
        name: "CRX",
    },
    {
        id: 8,
        name: "CR-Z",
    },
    {
        id: 9,
        name: "Element",
    },
    {
        id: 10,
        name: "Fit",
    },
]

const allModelOptions = [
    {
        id: 1,
        name: "All Models",
    },
]

const yearOptions = [
    {
        id: 1,
        name: "All Years",
    },
    {
        id: 2,
        name: "2024",
    },
    {
        id: 3,
        name: "2023",
    },
    {
        id: 4,
        name: "2022",
    },
    {
        id: 5,
        name: "2021",
    },
    {
        id: 6,
        name: "2020",
    },
    {
        id: 7,
        name: "2019",
    },
    {
        id: 8,
        name: "2018",
    },
    {
        id: 9,
        name: "2017",
    },
    {
        id: 10,
        name: "2016",
    },
]

function Home() {
    const navigate = useNavigate();
    const visited = sessionStorage.getItem('home');
    const [make, setMake] = useState(1);

    function onChange(option) {
        setMake(option.id);
    }

    setTimeout(() => {
        sessionStorage.setItem('home', true);
    }, 3000)

    return (
        <div className={styles.home}>
            <div className={`container ${styles.container}`}>
                <Header title="Home" />

                <div className={styles.top}>
                    <div className={styles.branding}>
                        <motion.div 
                            initial={visited ? {} : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: 1.5
                            }}
                        >
                            <img src={name_logo} alt="Name and logo" className={styles.namelogo} />
                        </motion.div>

                        <motion.div 
                            initial={visited ? {} : { opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 2
                            }}
                        >
                            <p className={styles.slogan}>Simply the parts ordering process and save valuable time</p>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={visited ? {} : { x: -1500}}
                        animate={{ x: 0 }}
                        transition={{
                            duration: 0.75,
                            delay: 0.5
                        }}
                        className={styles.carimg}
                    >
                        <img src={car} alt="Car" />
                    </motion.div>
                </div>
            </div>

            <div className={styles.details}>
                <motion.div 
                    initial={visited ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 2.5
                    }}
                >
                    <div className={styles.formbox}>
                        <p className={styles.formtitle}>Enter Vehicle Details</p>

                        <div className={styles.form}>
                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Make</label>
                                <Dropdown options={makeOptions} onChange={onChange} />
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Model</label>
                                <Dropdown options={make === 1 ? allModelOptions : modelOptions} />
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Year</label>
                                <Dropdown options={yearOptions} />
                            </div>

                            <button className="button red-btn normal-size-btn" onClick={() => navigate('/shop')}>CONFIRM</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Home;