import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { doc, setDoc, onSnapshot } from '@firebase/firestore';
export const removeFromWatchlist = async (id, coin, setWatchlist, watchlist) => {

    const resultsRef = db.collection("Result");
    console.log("in remve id", id, coin)
    // console.log("resultRef", resultsRef)
    // console.log("wl", watchlist)
    //here we getting the current user bcoz when we according to user-id,of logged.
    //user we fetch the data in user page.
    //here due to snapshot we get the all data to filter we want [uid]
    const { uid } = auth.currentUser;
    // const inWatchList = watchlist.includes(coin?.id);
    // console.log("in watch list", inWatchList)
    console.log("watchlistttt", watchlist)
    const coinRef = doc(db, "watchlist", uid);
    try {
        await setDoc(coinRef, {
            coins: watchlist.filter((watch) => watch !== coin?.id),
        }, { merge: "true" });

        if (uid) {
            var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    setWatchlist(coin.data().coins);
                }
                else {
                    console.log("no item in watchlist")
                }
            });

            return () => {
                unsubscribe();
            }
        }
        setWatchlist([...watchlist, coin?.id])
        alert("removed from watchlist")
    }
    catch (error) {
        alert("not remove in watchlist")

    }




};