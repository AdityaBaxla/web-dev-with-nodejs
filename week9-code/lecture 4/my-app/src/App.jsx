import './App.css'
import Header from "./components/Header";
import Footer from './components/Footer';
import GreetingCard from './components/GreetingCard';
function App() {

  return (
    <>
      <Header/>
      <GreetingCard name="Yash" message="Have a great day learning React!"/>
      <GreetingCard name="Rahul" message= "Keep exploring React!"/>
      <Footer/>
    </>
  )
}

export default App;
