import {IconButton, InputAdornment, TextField, makeStyles} from '@material-ui/core'
import { Visibility, VisibilityOff, } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
    textField: {
      borderColor : 'red',
      marginBottom: 10,
      outlineColor: 'red'

    },
    input:{
        outlineColor: 'red'
    }
    
  })); 
export default function InputField({multiline, fullWidth,required, rows, name, handleChange, label, autoFocus, type, handleShowPassword, handleBlur, value}){
    const classes = useStyles()
    
    return(
        <TextField
            name ={name}
            onBlur = {handleBlur}
            onChange = {handleChange}
            variant = "outlined"
            value={value}
            required = {required}
            label = {label}
            autoFocus = {autoFocus}
            className = {classes.textField}
            minRows = {rows ? rows : 1}
            multiline = {multiline}
            type = {type}
            fullWidth = {fullWidth}
            InputProps = {name === 'password' || name === 'confirmPassword' ? {
                className: classes.input,
                endAdornment: (
                    <InputAdornment position = "end">
                        <IconButton onClick = {handleShowPassword}>
                            {type === "password" ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>

                    </InputAdornment>
                )
            } : (
                 {
                    className: classes.input,
                    
                } 
            )
        } 
        />
    )
}