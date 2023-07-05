import React, { useState } from 'react'
import './style.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
// import { addToWatchlist } from '../../../functions/addToWatchList';
// import { removeFromWatchlist } from '../../../functions/removeFromWatchList';
import { Link } from 'react-router-dom';

import { IconButton } from '@mui/material';
import { useTestMode } from '../../../Context/watchlistContext';

// import { hasBeenAdded } from '../../../functions/hasbeenAdded';
// import { addOrRemove } from '../../../functions/addedOrNot';
import { toast } from "react-toastify";
import { auth, db } from '../../../firebase';
// import { auth, db } from "../firebase";
import { doc, setDoc, onSnapshot } from '@firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function Grid({ coin, isWatchListPage }) {
    console.log("Coins in the grid", coin)
    // const { uid } = auth.currentUser;
    const [user, loading] = useAuthState(auth);

    //getting watchlist using context.
    const { watchlist } = useTestMode();
    console.log("wactch list", watchlist)
    console.log("coin", coin)

    function hasbeenAdded(id) {
        console.log("id", id)
        if (watchlist) {
            if (watchlist.includes(id)) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    }
    const [added, setAdded] = useState(hasbeenAdded(coin.id));

    console.log("addddd", added)
    //creating stae for th watchlist.
    // const [inWatchList, setInWatchlist] = useState([])
    //add to watchlist.
    // check that coin is added or not
    // const inWatchList = watchList.includes(coin?.id);
    const addToWatchlist = async (id) => {

        console.log("coin id", id)


        //here we getting the current user bcoz when we according to user-id,of logged.
        //user we fetch the data in user page.
        //here due to snapshot we get the all data to filter we want [uid]


        // variable to chekc the in watchlist someting is added or not
        const inWatchList = watchlist?.includes(coin?.id);


        const coinRef = doc(db, "watchlist", user?.uid);
        try {
            await setDoc(coinRef, {
                coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
            });


            alert("successfully added in watchlist")
        }
        catch (error) {
            alert("not added in watchlist")

        }


    };


    //remove
    const removeFromWatchlist = async (id) => {



        //here we getting the current user bcoz when we according to user-id,of logged.
        //user we fetch the data in user page.
        //here due to snapshot we get the all data to filter we want [uid]


        // variable to chekc the in watchlist someting is added or not
        // const inWatchList = watchlist.includes(coin?.id);


        const coinRef = doc(db, "watchlist", user?.uid);
        try {
            await setDoc(coinRef, {
                coins: watchlist.filter((watch) => watch !== coin?.id),
            },
                { merge: "true" }
            );


            alert("removed from watchlist")
        }
        catch (error) {
            alert("not removed from watchlist")

        }


    };


    return (
        <Link to={`/coin/${coin.id}`}>
            <div>
                <div className={`grid-container ${coin.price_change_percentage_24h < 0 && 'grid-container-red'}`} style={{ display: isWatchListPage && !added && "none" }}>
                    <div className='info-flex'>
                        <img src={coin.image} className='img-logo' />
                        <div className='name-col'>
                            <p className="coin-symbol">{coin.symbol}</p>
                            <p className='coin-name'>{coin.name}</p>
                        </div>
                        {user && <div className='watchlist-logo'>
                            <IconButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (added) {
                                        removeFromWatchlist(coin.id);
                                        setAdded(false);
                                    } else {
                                        addToWatchlist(coin.id);
                                        setAdded(true);
                                    }
                                }}
                            >
                                {added ? (
                                    <StarRoundedIcon
                                        className={`watchlist-icon ${coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                                            } `}
                                        sx={{ fontSize: "2rem !important" }}
                                    />
                                ) : (
                                    <StarBorderRoundedIcon
                                        className={`watchlist-icon ${coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                                            } `}
                                        sx={{ fontSize: "2rem !important" }}
                                    />
                                )}
                            </IconButton>

                        </div>}

                    </div>




                    {coin.price_change_percentage_24h > 0 ? (<div className='chip-flex'>
                        <div className='chip-price'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                        <div className='icon-chip'><TrendingUpRoundedIcon /></div>
                    </div>)
                        : (
                            <div className='chip-flex '>
                                <div className='chip-price chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                                <div className='icon-chip chip-red'><TrendingDownRoundedIcon /></div>
                            </div>
                        )
                    }
                    {/* //here the //toLocaleString function is used to make the 1232 ==> 1,232 (here comma we see because of this) */}
                    <div className='info-container'>
                        {coin.price_change_percentage_24h > 0 ? (
                            <h3 className='coin-price'>{coin.current_price.toLocaleString()}</h3>
                        ) : (
                            <h3 className='coin-price price-red'>{coin.current_price.toLocaleString()}</h3>
                        )}

                        <div>
                            <p className='total-volume'>Total Volume: {coin.total_volume.toLocaleString()}</p>
                            <p className='market-cap'>Market Cap: ${coin.market_cap.toLocaleString()}</p>

                        </div>

                    </div>

                </div>
            </div>
        </Link>
    )
}

export default Grid