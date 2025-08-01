import React from 'react'
import "./style.css"
import iphone from "../../../assets/iphone.png"
import gradient from "../../../assets/gradient.png"
import Button from '../../Common/Button'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
function MainComponent() {
  return (
    <div className='flex-info'>
      <div className='left-component'>
        <motion.h1 className='track-crypto-heading'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >Track Crypto</motion.h1>

        <motion.h1 className='real-time-heading'
        // initial={{opacity:0,y:50}}
        // animate={{opacity:1,y:0}}
        // transition={{duration:0.5,delay:0.5}}
        >Real Time.</motion.h1>

        <motion.p className='info-text'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}

        >Track crypto through a public api in real time. Visit the dashboard to do so!
        </motion.p>

        <motion.div className='btn-flex'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >


          <Link to="dashboard">
            <Button text={"Dashboard"} />
          </Link>


          {/* <Button text={"Shared"} outlined={true} /> */}
        </motion.div>
      </div>
      <div className='right-container'>
        <motion.img src={iphone} className='iphone'
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={
            {
              type: "smooth",
              repeatType: "mirror",
              duration: 2,
              repeat: Infinity
            }
          }
        />
        
      </div>
    </div>
  )
}

export default MainComponent