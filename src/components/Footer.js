import React, {useState} from "react";
import Select from 'react-select';
import { themeOptions } from "../Utils/themeOptions";
import { useTheme } from '../context/ThemeContext';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {
// const [value, setValue] = useState({});
const {setTheme, theme} =  useTheme();
const handleChange = (e)=>{
  // console.log(e);
//   setValue(e.value);
  setTheme(e.value);
  localStorage.setItem("theme", JSON.stringify(e.value));
}

   return(
    <>
      <div className="footer">
        <div className="links">
        
        <div className='links'>
            <a href='https://github.com/adityagurav40?tab=repositories' target="_blank" className='a'>
                <GitHubIcon style={{marginRight:'5px'}}/>
                </a>
              
            <a href='https://www.linkedin.com/in/aditya-gurav-b6343728a/' target="_blank" className='b'>
                <LinkedInIcon/>
                </a>
                </div>
        
        
        </div>
        <div className="theme-btn">
        <Select
            // value={value}
            onChange={handleChange}
            options={themeOptions}
            menuPlacement="top"
            defaultValue={{label :theme.label , value : theme}}
            styles={{
                control:styles => ({...styles, backgroundColor:theme.textColor, color : theme.textColor
                 ,menu:styles=>({...styles,backgroundColor:theme.background}) 
                ,option:(styles,{isFocused})=>{
                    return{
                        ...styles,
                        backgroundColor:(!isFocused)?theme.background:theme.textColor,
                        color:(!isFocused)? theme.textColor:theme.background,
                        cursor:'pointer'
                    }
                }
                }),
              }}
         />
        
        </div>
      </div>



    </>
   )
};

export default Footer;


