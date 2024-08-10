import React, { useState, useEffect, useRef } from 'react'
import styles from '../css/Search.module.css'
import { supabase } from '../../helpers/supabaseClient'
import search_icon from '../../img/search-icon.svg'
import partsData from '../../helpers/partsData.json'

function Search({ handleEnter }) {
    const searchRef = useRef();
    const [value, setValue] = useState('');
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showListbox, setShowListbox] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, []);

    async function fetchAllData() {
        /* -- SUPABASE PARTS FETCH -- */
        // const { data } = await supabase.from('parts').select();
        // setAllData(data);

        /* -- LOCAL DATA PARTS FETCH -- */
        setAllData(partsData);
    }

    const handleChange = (query) => {
        if (query === value) return;

        setValue(query);
        if (!query) return;

        query = query[0].toUpperCase() + query.slice(1);
        setFilteredData((allData.filter(item => (item.name).includes(query)).slice(0, 10)));
    }

    const handleBlur = () => {
        setTimeout(() => {
            setShowListbox(false);
        }, 100);
    }

    const handleSelectItem = (selected) => {
        setValue(selected);
        setShowListbox(false);
        handleEnter(selected);
    }

    const handleInputEnter = (e) => {
        if (e.key === "Enter") {
            searchRef.current.blur();
            setShowListbox(false);
            handleEnter(value);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <img src={search_icon} className={styles.icon} alt="search icon" />
                <input 
                    placeholder="Enter part name or number" 
                    value={value}
                    onFocus={() => setShowListbox(true)}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)} 
                    onKeyDown={(e) => handleInputEnter(e)}
                    className={styles.input}
                    ref={searchRef}
                />
            </div>

            {showListbox && value.length > 0 && 
                <ul className={filteredData.length > 0 ? styles.listbox : "display: none; "}>
                    {filteredData.map((data) => 
                        <li key={data.id} className={styles.listdata} onClick={(e) => handleSelectItem(e.target.textContent)}>
                            {(data.name).substring(0, (data.name).indexOf(value[0].toUpperCase()+value.slice(1)))}
                            <span style={{fontWeight: 600}}>{(data.name).substring((data.name).indexOf(value[0].toUpperCase()+value.slice(1)), (data.name).indexOf(value[0].toUpperCase()+value.slice(1))+value.length)}</span>
                            {(data.name).substring((data.name).indexOf(value[0].toUpperCase()+value.slice(1))+value.length, (data.name).length)}
                        </li>
                    )}
                </ul>
            }
        </div>
    )
}

export default Search;