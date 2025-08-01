import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from 'axios'
import Search from '../components/Dashboard/Search/Search'
import PaginationComponent from '../components/Dashboard/Pagination'
import Loader from '../components/Common/Loader'
import BackToTop from '../components/Common/BackToTop'
// import WatchListPage from './WatchListPage'


const DashboardPage = () => {
  const [coins, setCoins] = useState([]);

  // console.log("coins", coins)
  //creating state for the search bar in `grid` and `list` view.
  const [search, setSearch] = useState([]);

  //creting the state for the page number which required in the 'pagination'
  const [pageNumber, setPageNumber] = useState(1);


  //creting the state to show the data in the 'pagination page'.
  const [resultantArrOfPagination, setResultantArrOfPagination] = useState([]);

  //creating the loading state .
  const [loading, setLoading] = useState(true);



  //creating onchange function which triggered when pagination function render.
  //when we click on the button.
  const onChangePage = (e, v) => {
    setPageNumber(v)

    //here we use the formula. { (9-1) * 10 , (9-1) * 10 +10 } ==>80 to 90
    setResultantArrOfPagination(coins.slice(((v - 1) * 10), (v - 1) * 10 + 10))

  }


  //creating change function for the search bar.
  const onChange = (value) => {
    setSearch(value)
  }

  
  const resultArr = coins.filter((item) => item.name.toLowerCase().includes(search) || item.symbol.toLowerCase().includes(search));

  useEffect(() => {
    // console.log("In use effect.")
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
      .then((res) => {
        // console.log("res", res);

        //here we get the array of object.
        setCoins(res.data);

        setResultantArrOfPagination(res.data.slice(0, 10))
        //make load state to false.
        setLoading(false);
      })
      .catch((err) => { console.log(err) });
    setLoading(false);
  }, [])

  //when user click on the back to top button.



  return (

    <div>
      <BackToTop />
      {
        loading ? (<Loader />) : (
          <div>
            <Header />
            <Search search={search} onChange={onChange} />
            <TabsComponent coins={search[0] ? resultArr : resultantArrOfPagination} />
            <PaginationComponent pageNumber={pageNumber} onChangePage={onChangePage} />
          </div >
        )
      }
    </div>

  )
}

export default DashboardPage