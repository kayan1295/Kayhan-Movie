import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import IconSection from './components/IconSection'
import MainSection from './components/MainSection'
import MobileNavbar from './components/MobileNavbar'
import PricingPlan from './components/PricingPlan'
import Questions from './components/Questions'

function App() {

  return (
    <>
     <Header />
     <MainSection />
     <IconSection />
     <Questions />
     <PricingPlan />
     <Footer />
    <MobileNavbar />
    </>
  )
}

export default App
