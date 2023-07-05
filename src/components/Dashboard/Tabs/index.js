import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '../Grid';
import "./style.css"
import List from '../List';

export default function TabsComponent({ coins, isWatchListPage }) {

  // console.log("cois in the tabls component", coins)
  // console.log("in tabls compoent", watchlist)
  const [value, setValue] = useState('grid');
  console.log("coins in table", coins)
  //DATABASE: 
  // const resultRef = db.collection("Result");
  const handleChange = (event, newValue) => {
    setValue(newValue);


  };

  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 'Inter',
    textTransform: 'capilalize'
  }

  return (
    <div>
      <TabContext value={value}>
        <div>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Grid" value="grid" sx={style} />
            <Tab label="List" value="list" sx={style} />
          </TabList>
        </div>


        <TabPanel value="grid">

          <div className="grid-flex">
            {
              coins.map((coin, i) => {
                return <Grid coin={coin} key={i} isWatchListPage={isWatchListPage} />
              })
            }
          </div>
        </TabPanel>
        <TabPanel value="list">

          <table className='list-flex'>
            {
              coins.map((coin, i) => {
                return <List coin={coin} key={i} />
              })
            }
          </table>
        </TabPanel>
      </TabContext>
    </div>
  );
}