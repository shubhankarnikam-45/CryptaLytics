import React from 'react'
import "./style.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
//here we import the tooltip for the title purpose(this provided the `MATERIAL UI`)
import Tooltip from '@mui/material/Tooltip';
import { convertNumbers } from '../../../functions/convertNumbers';
import { Link } from 'react-router-dom';
function List({ coin, key }) {
    return (
        <Link to={`/coin/${coin.id}`}>
            <tr className='list-items'>
                <Tooltip title='bitcoin image'>
                    <td className='info-flex'>
                        <img src={coin.image} className='img-logo' />
                    </td>
                </Tooltip>

                <Tooltip title='symbol and name of bitcoin'>
                    <td className='name-col'>
                        <p className="coin-symbol">{coin.symbol}</p>
                        <p className='coin-name'>{coin.name}</p>
                    </td>

                </Tooltip>




                <Tooltip title='percentage of change in bitcoin'>
                    {coin.price_change_percentage_24h > 0 ? (<td className='chip-flex'>
                        <div className='chip-price'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                        <div className='icon-chip'><TrendingUpRoundedIcon /></div>
                    </td>)
                        : (
                            <td className='chip-flex '>
                                <div className='chip-price chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                                <div className='icon-chip chip-red'><TrendingDownRoundedIcon /></div>
                            </td>
                        )
                    }
                </Tooltip>


                {/* //here the //toLocaleString function is used to make the 1232 ==> 1,232 (here comma we see because of this) */}

                <Tooltip title='price change after 24 hours'>
                    {coin.price_change_percentage_24h > 0 ? (
                        <td className='coin-price td-center-align'>${coin.current_price.toLocaleString()}</td>
                    ) : (
                        <td className='coin-price price-red td-center-align'>${coin.current_price.toLocaleString()}</td>
                    )}
                </Tooltip>


                <Tooltip title='total volume'>
                    <td className='total-volume td-right-align'>{coin.total_volume.toLocaleString()}</td>
                </Tooltip>

                <Tooltip title='market cap '>
                    <td className='market-cap td-right-align desktop-view'>${coin.market_cap.toLocaleString()}</td>
                </Tooltip>


                <Tooltip title='market cap '>
                    <td className='market-cap td-right-align mobile-view'>{convertNumbers(coin.market_cap)}</td>
                </Tooltip>




            </tr>
        </Link>
    )
}

export default List