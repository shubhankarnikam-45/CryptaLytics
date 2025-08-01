import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import TabsComponent from '../components/Dashboard/Tabs';
import axios from 'axios';
import { useTestMode } from '../Context/watchlistContext';
import LoginSignUpMenu from '../components/LoginSignUpMenu';
import Header from '../components/Common/Header';
// import Button from '../components/Common/Button';
const WatchListPage = () => {
    //firebase.
    const [user] = useAuthState(auth);
    console.log("user loading ", user)
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true);

    //using context for the watchlist.
    //getting watchlist using context.
    const { watchlist } = useTestMode();
    console.log("watchlistd", watchlist)

    // if (watchlist == undefined) {
    //     return;
    // }

    //here we get the currentt watchlist data from current API CALL.
    let filterData = coins.filter((coin) => {

        if (watchlist === undefined) {
            return [];
        }
        else {
            return watchlist.includes(coin.id);
        }
    })


    // console.log("Filtered data", filterData)

    useEffect(() => {
        console.log("In use effect.")
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
            .then((res) => {
                console.log("res", res);
                setCoins(res.data);
                // setResultantArrOfPagination(res.data.slice(0, 10))
                //make load state to false.


                setLoading(false);
            })
            .catch((err) => {

                console.log("in error ioc")
                console.log(err)
            });
        // setLoading(false);
    }, [])

    return (
        <div>
            <Header />
            {user ? !loading ? ((<TabsComponent coins={filterData} isWatchListPage={true} />)) : (<div>loading</div>) : <div className='watchlist'><LoginSignUpMenu /> <p className='des'>to use <b>Watchlist</b> you must <b>login </b>or<b> Signup</b></p></div>}
        </div>
    )
}

export default WatchListPage