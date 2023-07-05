//this function only tells that the in grid or list the watchlist button is selected or not.
export const hasBeenAdded = (id) => {
    const watchlist = localStorage.getItem("watchlist");
    if (watchlist) {
        let arr = JSON.parse(watchlist);
        if (arr.includes(id)) {
            return true;
        } else {
            return false;
        }
    }
    return false;
};

