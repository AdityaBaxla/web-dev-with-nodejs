import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MainComponent from './components/MainComponent.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import CustomButton from './components/CustomButton.jsx'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <MainComponent/>
      <ProfileCard name="Amit Kumar" profile="Software Engineer" />
      <ProfileCard name="Nikita Kumari" profile="Backend Developer" />
      <CustomButton text="Like" />
      <Footer />
    </>
  )
}

export default App;
