//this component represents the modal background to handle visibility


import {motion} from 'framer-motion'
import './backDrop.css';

const BackDrop = ({children, onClick})=>{

    return(
        <motion.div 
            onClick = {onClick}
            className = 'backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

export default BackDrop;