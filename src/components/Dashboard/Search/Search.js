import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import "./style.css"
const Search = ({ search, onChange }) => {
    return (
        <div className='search-bar'>
            <SearchIcon />
            <input
                type='text'
                value={search}
                onChange={(e) => { onChange(e.target.value) }}
            />
        </div>
    )
}

export default Search