import React,{useState} from 'react'
import "./Form2.css"

const Form2 = () => {
    const [input, setInput]=useState({})
    function handleFormChange(e){
        console.log(e.target.value);
        const {type, value}=e.target
        setInput({...input,[type]:value})
        console.log(input)
    }
    
    function handleSubmit(e){
        e.preventDefault()
    }
  return (
    <div>
        <form onChange={handleFormChange}>
            <input type="email" placeholder='mail'/>
            <input type="password"/>
            
            <input type="submit" onClick={handleSubmit}/>
        </form>
    </div>
  )
}

export default Form2