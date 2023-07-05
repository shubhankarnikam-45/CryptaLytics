import axios from "axios";

export const getCoinPrices = (id, days) => {
    //second axios call to bulid the chart.
    const price = axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
        .then((res) => {

            console.log("prise-->", res.data.prices)
            return res.data.prices;

        })
        .catch((err) => {
            console.log(err)

        })

    return price;
}