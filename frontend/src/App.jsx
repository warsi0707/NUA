import {BrowserRouter, Routes, Route} from "react-router"
import { lazy, Suspense } from "react"
import { useSelector } from "react-redux"
import Loading from "./components/Loading"

const Navbar = lazy(()=> import("./components/Navbar"))
const Dashboard = lazy(()=> import("./pages/Dashboard"))
const Signup = lazy(()=> import("./pages/Signup"))
const Signin = lazy(()=> import("./pages/Signin"))
const SharedListing = lazy(()=> import("./pages/SharedListing"))

function App() {
  const isAuthenticated = useSelector(state=> state.user.isAuthenticated)
  return (
    <BrowserRouter>
    <Suspense fallback={<Loading/>}>
    <Navbar/>
      <Routes>
        <Route path="/" element={isAuthenticated? <Dashboard/>:<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={isAuthenticated? <Dashboard/>:<Signin/>}/>
        <Route path="/:id" element={isAuthenticated? <SharedListing/>: <Signin/>}/>
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
