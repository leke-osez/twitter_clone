import React from 'react'
import './authForm.css';
// import { Button, } from '@material-ui/core';
import InputField from '../input/Input';
import ListForm from '../listForm/ListForm';

export default function AuthFormEntry({
    isSignUp, handleChangeInput, handleListForm,list_DOB, sendDate, handleBlur, emailExist
    })
    { 
        
        return(
      
      <>    
          <h2>{isSignUp ? 'Create your account' : 'Sign In'}</h2>
  
          <div className = 'authForm__content'>
          <InputField name = 'name' label ='name' handleChange={handleChangeInput} className = 'authForm__nameInput' type = 'text' fullWidth autoFocus={true}/>
          <InputField name = 'email' label = 'email' handleChange= {handleChangeInput} type = 'email' fullWidth handleBlur = {handleBlur}/>
          <p style = {{color:'red', fontSize: 14}}>{emailExist}</p>
            {
              isSignUp && (
              <>
                <h2>Date of birth </h2>
                <div className = 'authForm__dateOfBirth'>
                  {/* <InputField name = 'month' label ='Month' handleChange={handleChangeInput} className = 'authForm__monthInput' type = 'text'/>
                  <InputField name = 'day' label ='Day' handleChange={handleChangeInput} className = 'authForm__dayInput' type = 'number'/>
                  <InputField name = 'year' label ='Year' handleChange={handleChangeInput} className = 'authForm__yearInput' type = 'number'/> */
                    list_DOB.map(({name, showList, list, date})=>
                    <ListForm name = {name} sendName = {handleListForm} showList = {showList} list = {list} sendDate= {sendDate} date ={date} key = {name}/>
                    )
                  }
                    
                    
                    {/* <ListForm name = 'month' handleListForm = {handleListForm} showList = {showList} list = {monthList}/>
                    <ListForm name = 'day' handleListForm = {handleListForm} showList = {showList} list = {dayList}/>
                    <ListForm name = 'year' handleListForm = {handleListForm} showList = {showList} list = {yearList}/> */}

                </div>
              </>
  
              )
  
            }
            
            {/* <Button 
              type= 'submit'
              disabled = {disableButton()}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button> */}
            
          </div>
  
  
    </>
    )
  }
