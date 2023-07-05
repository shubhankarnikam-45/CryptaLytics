import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import axios from 'axios';
import { coinObject } from '../functions/coinObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LIneChart';
import { convertDate } from '../functions/convertDate';

const CoinPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [charData, setChartData] = useState({});
    //this used in the chart for how far you want the data in chart.
    const [days, setDays] = useState(30);


    // //creating stae for th watchlist.
    // const [inWatchList, setInWatchlist] = useState([])
    useEffect(() => {
        if (id) {
            getData();

        }
    }, [id])

    //add to watchlist.
    // const addToWatchlist = async (id, coin) => {



    //     //here we getting the current user bcoz when we according to user-id,of logged.
    //     //user we fetch the data in user page.
    //     //here due to snapshot we get the all data to filter we want [uid]
    //     const { uid } = auth.currentUser;

    //     // variable to chekc the in watchlist someting is added or not
    //     const inWatchList = watchlist.includes(coin?.id);
    //     //getting watchlist using context.
    //     const { watchlist } = useTestMode();

    //     const coinRef = doc(db, "watchlist", uid);
    //     try {
    //         await setDoc(coinRef, {
    //             coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
    //         });


    //         alert("successfully added in watchlist")
    //     }
    //     catch (error) {
    //         alert("not added in watchlist")

    //     }

    //     //    if(resultsRef)
    //     //    {
    //     //         resultsRef.where('userId','==',uid)
    //     //         .get().then((snapshot)=>{
    //     //             snapshot.docs.forEach((doc)=>{

    //     //             })
    //     //         })
    //     //    }

    //     // let tempData = [];
    //     // // let tempGraphData = [];
    //     // resultsRef.where('userId', '==', uid)
    //     //     .get().then((snapshot) => {
    //     //         snapshot.docs.forEach((doc) => {
    //     //             tempData.push({ ...doc.data() });
    //     //             // tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(",")[0], doc.data().wpm])
    //     //         });
    //     //         setData(tempData);
    //     //         setGraphData(tempGraphData.reverse());
    //     //         setDataLoading(false);
    //     //     })

    //     // let items = localStorage.getItem("watchlist");
    //     // if (items) {
    //     //     let arr = JSON.parse(items);
    //     //     if (!arr.includes(id)) {
    //     //         arr.push(id);
    //     //         localStorage.setItem("watchlist", JSON.stringify(arr));
    //     //     }
    //     // } else {
    //     //     var arr = JSON.stringify([id]);
    //     //     localStorage.setItem("watchlist", arr);
    //     // }
    //     // toast.success(
    //     //     `${id.slice(0, 1).toUpperCase() + id.slice(1)} - Added To The Watchlist!`
    //     // );
    // };
    //getData fun.
    async function getData() {
        const data = await getCoinData(id);
        if (data) {
            coinObject(setData, data);
            const prices = await getCoinPrices(id, days);
            if (prices.length > 0) {

                console.log("prices", prices)
                setChartData({
                    labels: prices.map((price) => convertDate(price[0])),
                    datasets: [
                        {
                            data: prices.map((price) => price[1]),
                            borderColor: "#3a80e9",
                            backgroundColor: "trasparent",
                            borderWidth: 2,
                            fill: true,
                            tension: 0.25,
                            backgroundColor: "rgba(58, 128, 233,0.1)",
                            borderCoIor: "#3a80e9",
                            pointRadius: 0,
                        }
                    ]
                })

                setLoading(false)
            }

        }
    }
    console.log(data)
    // console.log(data.desc)
    return (
        <div>
            <Header />
            {
                loading ? (<Loader />) : (
                    <div>
                        <div className='grey-wrapper'><List coin={data} /></div>
                        <div className='grey-wrapper second'><LineChart chartData={charData} /></div>
                    </div>)
            }
            {/* <CoinInfo name={data.name} desc={data.desc} /> */}
        </div>
    )
}

export default CoinPage