import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import "./style.css"
export default function PaginationComponent({ pageNumber, onChangePage }) {
    return (
        <div className='pagination-div'>

            <Pagination
                count={10}
                page={pageNumber}
                onChange={(e, v) => onChangePage(e, v)}
                sx={{
                    color: "var(--white)",
                    "& .Mui-selected ": {
                        backgroundColor: "var(--blue) !important",
                        color: "#fff !important",
                        borderColor: "var(--blue) !important",
                    },
                    "& .MuiPaginationItem-ellipsis": {
                        border: "0px solid var(--grey) !important",
                    },
                    "& .MuiPaginationItem-text": {
                        color: "var(--white)",
                        border: "1px solid var(--grey)",
                    },
                }}

            />

        </div>
    );
}