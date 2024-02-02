import React, { useState } from "react";
import styles from './Pagination.module.css';

function Pagination({returnPageNumberAsParam, lengthOfTableData}){
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10;
    const totalPage = Math.floor(lengthOfTableData/dataPerPage);

    const handleButtonClick =(value) => {
        if(value == -1){
            const page = Math.max(currentPage+value,1);
            setCurrentPage(page);
            returnPageNumberAsParam(page);
        }
        else if(value == 1){
            const page = Math.min(currentPage+value,totalPage);
            setCurrentPage(page);
            returnPageNumberAsParam(page);
        }
    }

    return(
        <div>
            <button className={styles.btn} onClick={()=>{handleButtonClick(-1)}}>Previous</button>
            <div className={styles.pageNo}>{currentPage}</div>
            <button className={styles.btn} onClick={()=>{handleButtonClick(1)}}>Next</button>
        </div>
    )
}

export default Pagination;