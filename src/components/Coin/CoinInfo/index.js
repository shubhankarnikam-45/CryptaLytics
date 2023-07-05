import React, { useState } from 'react'
import "./styles.css"
import { ConstructionOutlined } from '@mui/icons-material';
const CoinInfo = ({ name, desc }) => {

    const [flag, setFlag] = useState(true);
    console.log(typeof (desc))
    const shortDesc = desc.slice(0, 500) + "<span style=color:var(--grey)> Read more</span>"
    const fullDesc = desc + "<span style=color:var(--grey)> Read less</span>";

    function handleClick() {
        setFlag(!flag);
    }

    return (
        <div className='grey-wrapper'>
            <h2>{name}</h2>
            {!flag ? (<p dangerouslySetInnerHTML={{ __html: shortDesc }} onClick={handleClick} />) : (

                <p dangerouslySetInnerHTML={{ __html: fullDesc }} onClick={handleClick} />
            )}
        </div>
    )
}

export default CoinInfo