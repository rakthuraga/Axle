import { useState } from "react";
import { animated } from '@react-spring/web'
import { useSpring } from '@react-spring/core'
import Dropdown from "./Dropdown";
import styles from "../css/Filter.module.css"
import x_icon from "../../img/x-icon--grey.svg"

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

function Filter({ isOpen, dismiss }) {
    // Animation variables
    const boxProps = useSpring({ scale: isOpen ? 1 : 0 });
    const backgroundProps = useSpring({
        backgroundColor: isOpen ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)",
        visibility: isOpen ? "visible" : "hidden"
    })

    const [make, setMake] = useState(1);

    function onChange(option) {
        setMake(option.id);
    }

    return (
        <>
        {isOpen ? 
        <>
            <animated.div className={styles.background} style={backgroundProps} onClick={dismiss}></animated.div>

            <animated.div className={styles.filters} style={boxProps}>
                <div className={styles.filterbox}>
                    <div className={styles.headerbox}>
                        <div className={styles.header}>
                            <p className={styles.title}>Filters</p>
                            <button className={styles.xbtn} onClick={dismiss}><img src={x_icon} alt="X icon" /></button>
                        </div>
                    </div>

                    <div className={styles.form}>
                        <div className={`${styles.formcontent} ${styles.details}`}>
                            <div className={styles.formheader}>
                                <p className={styles.formtitle}>Car Details</p>
                                <p className={styles.formsubtitle}>Enter car details to find parts that fit your car</p>
                            </div>
                            
                            <div className={styles.carform}>
                                <div className={styles.formgroup}>
                                    <label class={styles.formlabel}>Make</label>
                                    <Dropdown options={makeOptions} onChange={onChange} />
                                </div>

                                <div className={styles.formgroup}>
                                    <label class={styles.formlabel}>Model</label>
                                    <Dropdown options={make === 1 ? allModelOptions : modelOptions} />
                                </div>

                                <div className={styles.formgroup}>
                                    <label class={styles.formlabel}>Year</label>
                                    <Dropdown options={yearOptions} />
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.formcontent} ${styles.categories}`}>
                            <div className={styles.formheader}>
                                <p className={styles.formtitle}>Category</p>
                                <p className={styles.formsubtitle}>Search by parts categories</p>
                            </div>

                        </div>

                        <div className={styles.formcontent}>
                            <div className={styles.formheader}>
                                <p className={styles.formtitle}>Vendors</p>
                                <p className={styles.formsubtitle}>Search by vendors</p>
                            </div>

                        </div>
                    </div>

                    <div className={styles.footer}>
                        <button className={styles.clearbtn}>CLEAR ALL</button>
                        <button className="button red-btn normal-size-btn" onClick={dismiss}>CONFIRM</button>
                    </div>
                </div>
            </animated.div>
        </> : <></>
        }
        </>
    )
}

export default Filter;