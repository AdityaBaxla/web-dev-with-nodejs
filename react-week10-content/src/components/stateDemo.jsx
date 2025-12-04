import {useState} from 'react';

function StateDemo() {
    // numeric state
    const [count, setCount] = useState(0);

    // string state 
    const [username, setUsername] = useState("unknown")

    // Object state
    const [user, setUser] = useState({
        id: 1,
        name: "mad2"
    })

    // array state 
    const [fruits, setFruits] = useState(['apple', 'banana', 'mango'])

    const increment = () => {
        // count += 1;
        setCount(count + 1)
    }

    const decrement = () => {
        // count += 1;
        setCount(count - 1)
    }

    const addName = () => {
        if (username === "unknown"){
            setUsername("Adarsh")
        }
        else {
            setUsername("unknown")
        }
        
    }

    const changeObj = () => {
        // setUser(user.name = "mad1") 
        setUser((previous) => ({...previous, name: "mad1"}))
    }

    const addFruit = () => {
        // setFruits(fruits.push('apple'))
        setFruits((prev) => ([...prev, "orange"]))
    }

    return (
        <div>
            <h2>Count is: {count}</h2>
            <h2>User is: {username}</h2>
            <h2>Object user is {user.name}</h2>
            <h2>New Fruits array: {fruits}</h2>

            <button onClick={increment}>+ inc</button>
            <button onClick={decrement}>- dec</button>
            <button onClick={addName}>set name</button>
            <button onClick={changeObj}>set obj name</button>
            <button onClick={addFruit}>add orange</button>
        </div>
    )
}

export default StateDemo;