import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Pagination from './Components/Pagination';

function App() {
  const [tableData, setTableData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(()=>{
      fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
                  .then((res)=>{
                    if (!res.ok) {
                      throw new Error('Network response was not ok');
                    }
                    return res.json();
                  })
                  .then((res) => {
                    console.log(res); // Log the entire response object
                    setTableData(res);
                    setDisplayData(res.slice(0,10))
                  })
                  .catch((ex)=>console.log(ex))
  },[]);

  const returnPageNumberAsParam = (currentPage)=>{
      if(currentPage == 1){        
        setDisplayData(tableData.slice(0,10))
      }
      else{
        const firstIndex = (currentPage*10)-10;
        const lastIndex = (currentPage*10);
        setDisplayData(tableData.slice(firstIndex,lastIndex));
      }
  }
  const row ={
    border:'1px solid black'
  }

  const colHeader = {
    backgroundColor:'green',
    color:'white'
  }

  return (
    <div>
      <table style={{margin:'10px', padding:'5px'}}>
        <tr style={row}>
          <th style={colHeader}>ID</th>
          <th style={colHeader}>Name</th>
          <th style={colHeader}>Email</th>
          <th style={colHeader}>Role</th>
        </tr>
        {displayData.map((item)=>
          (<tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
          </tr>)
        )}
      </table>
      <Pagination returnPageNumberAsParam={returnPageNumberAsParam} lengthOfTableData={tableData?.length}/>
    </div>
  );
}

export default App;
