//creates a modal view of Components.

import React from 'react'
import {motion} from 'framer-motion'
import BackDrop from '../backDrop/BackDrop';
import './modal.css'
import css from 'styled-jsx/macro';
 

const { className, styles } = css.resolve`
  div {
    display: flex;
    justify-content: center;
    
  }

  
`;

const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  
  const gifYouUp = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };

function Modal({ handleClose, type, content,}) {

  return(
    <div className=''>
        <BackDrop onClick={handleClose}>
            <div>
              {type === 'dropIn' && (
                  <motion.div
                      onClick = {(e)=> e.stopPropagation()}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants = {dropIn}
                      className = 'modal__dropIn'
                  >
                    {content}
                  </motion.div>
              )}

              {type === 'gifYouUp' && (
                  <motion.div
                      onClick = {(e)=> e.stopPropagation()}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants = {gifYouUp}
                      className = {className}
                  >
                      {content}
                  </motion.div>
              )}
              {styles}
            </div>
            
            
        </BackDrop>
    </div>
  )
}

export default Modal