import React, { useState,useEffect,useRef } from 'react'
import './authForm.css';
import {useDispatch, useSelector} from 'react-redux'
import { modalStateOff } from '../../actions/ModalState';
// import { modalTypeSwitchMode } from '../../actions/ModalType';
import { Button, } from '@material-ui/core';
import { ArrowBack, Twitter } from '@material-ui/icons';
import CloseIcon from '@mui/icons-material/Close';
import InputField from '../input/Input';
import AuthFormEntry from './AuthFormEntry';
import AuthFormSetPassword from './AuthFormSetPassword';
import AuthFormVerification from './AuthFormVerification';
import AuthFormDisplay from './AuthFormDisplay';
import { signIn, signUp, checkIfMailExist } from '../../actions/Auth';
import {useNavigate} from 'react-router-dom';


const Pages = ['authFormEntry', 'authFormDisplay', 'authFormVerification', 'authFormSetPassword'];

function AuthForm({isSignUp, switchMode}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //redux state
  const error = useSelector((state)=>state.authReducer.error)

  //states*
  const [textField, setTextField] = useState({name: '', email: '', password: '',  month: '', year: '', day:'',username:''})
  const [showPassword, setShowPassword] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);
  
  //check if month has been entered for reg to update number of days in month
  const isMonthRef = useRef(true);

  //check if email exists
  const [emailExists,setEmailExists] = useState(false)

  //gets three object properties: months, days and years as list
  const cal = Calendar(textField.month, textField.year);

  //date of birth registration properties
  const [list_DOB, setList_DOB]= useState([
    {name: 'month', showList: false, list: cal.months, date: null}, {name: 'day', showList: false, list: cal.days, date:null}, {name: 'year', showList: false, list: cal.years, date: null}
  ])

  //handles entry into textField state
  const handleChangeInput = (e)=>{
    setTextField({...textField, [e.target.name]: e.target.value})
  }

  //create RegExp for password and email input???

  //checks boolean for button activation
  const disableButton = ()=>{

    const {name,username, email, password, month, year, day,} = textField;
    
    if (!isSignUp){
      return !(password.toString().trim() && email.toString().trim())
    }
    
    if (Pages[currentPage] === 'authFormEntry'){
      return  !(name.toString().trim() && email.toString().trim() && month.toString().trim() && year.toString().trim() && day.toString().trim()) 
    }

    if (Pages[currentPage] === 'authFormSetPassword'){
      return  !(password.toString().trim() && username.toString().trim() && name.toString().trim() && email.toString().trim() && month.toString().trim() && year.toString().trim() && day.toString().trim())
    }

    
  
  }

  
  const handleShowPassword = ()=>{
    setShowPassword((prevState)=> !prevState)

  }

  //shows months, days, years as list
  const handleListForm = (item)=>{
    const {month} = textField
    if(item === 'day' && !month){ isMonthRef.current = false; }

    setList_DOB(
      list_DOB.map(({name,showList,list,date})=>{
      if(item === name) {return {name, showList: !showList, list: cal[`${name}s`], date}}
      else return {name, showList:false, list: cal[`${name}s`], date}
    })
    )

  }

  //sends day, month, year to text field
  const sendDate = ({name,item,id})=>{
   name === 'month' ? setTextField({...textField, [name]:id}) : setTextField({...textField, [name]:item}) ;

    setList_DOB(
      list_DOB.map((i)=>{
      if(name === i.name) {
        return { ...i,date:item,}}
      else return i
    })
    )

  }
  if(textField.month){isMonthRef.current = true}


  //login and authenticate user 
  const submitForm =(e)=>{
    e.preventDefault();

    if (isSignUp){
        dispatch(signUp(textField,navigate))
    }

    else {
        dispatch(signIn(textField, navigate))
    }
  }

  //toggle signup and signin
  const handleswitchMode=()=>{
    setTextField({name: '', email: '', password: '', confirmPassword: '', month: '', year: '', day:''})
    if(!isSignUp) setCurrentPage(0)
    switchMode();
  }

  const handleEmailBlur = async (e)=>{
    const {email} = textField
    e.preventDefault();

    const emailExist = await checkIfMailExist({email:email});
    if (emailExist){
      setEmailExists(emailExist)
      return emailExist
    } else {
      setEmailExists(false)
      return false
    };
  }
  //
  useEffect(()=> setList_DOB(
    list_DOB.map((i)=>{
    return { ...i, list: cal[`${i.name}s`]}
  })
  ),[textField]);

  return (
    <div className = 'authForm' onClick = {handleListForm}>
        {/* Header of authentication form */}
        <div className = 'authForm__header'>

          {(currentPage === 0 || !isSignUp) && (<div className= 'closeButton'><Button onClick = {()=> { dispatch(modalStateOff())} } > <CloseIcon />  </Button></div>)}
          {(currentPage > 0 && isSignUp) && currentPage <= Pages.length - 1 && (<div className= 'closeButton'><Button onClick = {()=> setCurrentPage(currentPage -1) } > <ArrowBack />  </Button></div>)}
          <Twitter className = 'authForm__twitterLogo'/>
        </div>

      <form onSubmit={submitForm}>

        {isSignUp && (
        <> 
        {
          Pages[currentPage] === 'authFormEntry' && (
            <AuthFormEntry 
              isSignUp= {isSignUp} 
              handleChangeInput= {handleChangeInput}
              handleListForm = {handleListForm} 
              list_DOB = {list_DOB}
              sendDate = {sendDate}
              handleBlur = {handleEmailBlur}
              emailExist = {emailExists}
            />
          )
        } 

        {
          Pages[currentPage] === 'authFormSetPassword' && (
            <AuthFormSetPassword handleChangeInput= {handleChangeInput} showPassword= {showPassword} handleShowPassword ={handleShowPassword}/>
          )
        } 

        {
          Pages[currentPage] === 'authFormDisplay' && (
            <AuthFormDisplay/>
          )
        } 

        {
          Pages[currentPage] === 'authFormVerification' && (
            <AuthFormVerification/>
          )
        }  
          
        {isMonthRef.current ? <p> &nbsp;</p> :<p style ={{fontSize :13, color: 'red'}}>Please enter month to display number of days</p>}
        
        {currentPage <= Pages.length - 2 ? 
        (<Button 
          disabled = {!!(disableButton() || emailExists) }
          className = {`authForm__nextButton ${!!(disableButton() || emailExists) ? 'authForm__disableButton' : 'authForm__enableButton'}`}
          fullWidth
          onClick = {()=>{setCurrentPage(currentPage+1);  }}
        >
          Next
        </Button>) :
        (
          <Button 
          className = {`authForm__nextButton ${disableButton() ? 'authForm__disableButton' : 'authForm__enableButton'}`}
          fullWidth
          type = 'submit'
          disabled = {disableButton()}
        >
          Submit
        </Button>
        )
        
        }
        </>
        )}
          {
            !isSignUp && (
              <div>
                <InputField name = 'email' label ='email' handleChange={handleChangeInput} className = 'authForm__nameInput' type = 'text'  autoFocus={true} fullWidth/>
                <InputField name = 'password' label = 'password' handleChange= {handleChangeInput} type = {showPassword ? 'password' : 'text'} handleShowPassword = {handleShowPassword} fullWidth/> 
                <p style={{color: 'red'}}>{error}</p>
                <Button 
                  className = {`authForm__nextButton ${disableButton() ? 'authForm__disableButton' : 'authForm__enableButton'}`}
                  fullWidth
                  onClick = {submitForm}
                  type = 'submit'
                  disabled = {disableButton()}
                >
                  Log in
                </Button>
              </div>
            )
          }
      </form>
        <Button onClick = {handleswitchMode} className = 'authForm__switchForm'>
          <p>{isSignUp ? 'Already have an account? Sign in' : "Don't have an account, Sign Up"}</p>
        </Button>

    </div>
  )
}
export default AuthForm;

function Calendar(currMonth='APRIL', currYear){
  const checkLeapYear = ()=>{
      if (currYear % 4 === 0){
          if (currYear % 100 === 0 && currYear % 400 !== 0){
              return false;
          }
          return true
      }
      else{return false}
  }
  const calendar = [{month:'January', day:31}, {month:'February', day: checkLeapYear() ? 29 : 28}, {month: 'March', day: 31}, {month: 'April', day: 30}, {month: 'May', day: 31}, {month: 'June', day: 30}, {month: 'July', day: 31}, {month: 'August', day: 31}, {month: 'September', day:30}, {month: 'October', day: 31}, {month: 'November', day:30}, {month: 'December', day: 31}]
  const months = calendar.map((i)=>i.month)
  const days = [];
      calendar.forEach(({month, day},index)=>{
          if (currMonth === index+1){
              for (let i = 1; i <= day; i++){
                  days.push(i)
              }
          }
      })
  const getCurrentDate = new Date();
  const getCurrentYear = getCurrentDate.getFullYear()
  const years = [];
  for (let i = getCurrentYear - 120; i <= getCurrentYear; i++){
      years.push(i)
  }



  return{months, days, years}
}
