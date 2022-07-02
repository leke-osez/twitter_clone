import { Button } from '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import React from 'react';
import './listForm.css'


//button that handles the date of birth input
function ListForm({name,sendName, showList,list,date, sendDate}) {
    const handleListForm = ()=>{
        sendName(name)
    }

  return (
    <div className = {`listForm ${name === 'month' ? 'listForm__big' : ''}`} onClick = {(e)=> e.stopPropagation()}>
        
        {list.length > 0 && <ul className = {`listForm__list ${showList ? '' : 'hideList'} ${name === 'month' && 'listForm__list__large'}`}>
            {list.map((item,id)=>{ 
                const handleDate = ()=>{
                     sendDate({name, item, id: id+1}) 
                    
                }
                return(
                    <li key = {item}>
                        <Button onClick = {handleDate} style ={{textTransform: 'none', margin:0, }}>{item}</Button>
                    </li>
                )}
            )}   
        </ul>}
      
        
        <Button className = {`${showList ? 'buttonActive' : ''} listForm__buttonContainer `} onClick = {handleListForm}>
            <div className = 'listForm__button'>

                <div className='listForm__buttonHead'>
                    <p className = {`listForm__name ${showList ? 'textActive' : ''}`}>{name}</p>
                    <KeyboardArrowDown className = {`listForm__icon ${showList ? 'textActive' : ''}`}/>
                </div>
                <p className = 'listForm__date'>{`${date ? date : ' '}`} &nbsp;</p>
            </div>
        </Button>
    </div>
  )
}

export default ListForm