import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import Footer from './components/Footer'
import ListingData from './pages/ListingData'
import Layout from './Layout'
import ScrollToTop from './ScrollToTop'
import Downloading from './Downloading'


export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>

      <Routes>
      <Route path='/download_pdf/with_card' element={<Downloading />} />
       <Route path='' element = {<Layout/>}> 

       <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listings' element = {<ListingData/>}/>
        <Route path='/listing/:listingId' element={<Listing />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} /> 
        </Route>
       </Route>
       <Route path='/*' element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
