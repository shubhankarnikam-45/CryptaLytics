import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, onSnapshot } from '@firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
const WatchListContext = createContext();


export const WatchListContextProvider = ({ children }) => {
    // const { uid } = auth.currentUser();
    const [user, loading] = useAuthState(auth);

    const [watchlist, setWatchlist] = useState([]);


    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user?.uid);
            var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    console.log("co do", coin.data().coins)
                    setWatchlist(coin.data().coins);
                }
                else {
                    console.log("no item in watchlist")
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, [user])
    // console.log(testTime)

    const values = {
        watchlist, setWatchlist
    }

    return (<WatchListContext.Provider value={values}>{children}</WatchListContext.Provider>)
}


//now we use the `useContext` hook for the passing state between the different componenets.
//here we use the one method which is 'consumer' but we use the 'useContext' hook because we dot's want to export the 
//context in line no. 3.
export const useTestMode = () => useContext(WatchListContext);