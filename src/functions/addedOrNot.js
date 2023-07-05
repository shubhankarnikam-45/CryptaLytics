import React from 'react'

export const addOrRemove = (id) => {
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
}

