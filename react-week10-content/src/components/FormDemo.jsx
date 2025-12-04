import {useState} from 'react';

function FormDemo() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === "Adarsh" && password === "React123"){
            setLoggedIn(true)
            setMessage("User Login successful! Welcome")
        } else {
            setLoggedIn(false)
            setMessage("Login Failed! invalid credentials")
        }
        
        setUsername("");
        setPassword("")
    }

    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>  
                <div>
                    <label htmlFor="username">Username</label> <br />
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label> <br />
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button type="submit">Log in</button>
                </div>
            </form>
            <h2>Result</h2>
            <p>Username is: {username}</p>
            <p>Password is: {password}</p>
            {message && (
                <h2 style={{color: loggedIn ? 'green' : 'red'}}
            >{message}</h2>)}
        </div>
    )
}

export default FormDemo;