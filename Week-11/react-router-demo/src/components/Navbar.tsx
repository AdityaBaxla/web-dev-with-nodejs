import {Link} from 'react-router'

export const Navbar = () => {
  return (
    <div> <h3>Navbar</h3>
    <nav>
    <Link to="/">Home</Link> 
    <Link to="/profile">Profile</Link> 
    <Link to="/contact">Contact</Link>
    </nav>    
    </div>
  )
}

export default Navbar