import {useState} from 'react'
function Form({change, setChange}) {
    const [value, setValue] = useState("");
    function handleChange(event){
        console.log(value);
        setValue(event.target.value);
        setChange(value);
    }
    return(
        <form>
            <input onChange={(e) => handleChange(e)} type="text" value={value}></input>
        </form>
    )
}
export default Form;
