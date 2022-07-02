import React from 'react';
import InputField from '../input/Input';


function AuthFormSetPassword({handleChangeInput, showPassword, handleShowPassword}) {
  return (
    <div>
        <h2>Set up account information</h2>
        <InputField name= 'username' label = 'username' handleChange={handleChangeInput} fullWidth/>    
        <InputField name = 'password' label = 'Password' handleChange= {handleChangeInput} type = {showPassword ? 'text' : 'password'} handleShowPassword = {handleShowPassword} fullWidth/> 

    </div>
  )
}



export default AuthFormSetPassword

