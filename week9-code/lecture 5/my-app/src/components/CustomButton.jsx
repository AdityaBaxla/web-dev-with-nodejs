import {useState} from 'react';

function CustomButton(props){
  const [count, setCount] = useState(0);
  const button={
    backgroundColor:'#003049',
    color:'white',
    padding:'8px 16px',
    borderRadius:'6px',
  }
  
  return(
    <button style={button} onClick={() => setCount(count + 1)}>
         {props.text} {count}
    </button>
  );
  
}

export default CustomButton;