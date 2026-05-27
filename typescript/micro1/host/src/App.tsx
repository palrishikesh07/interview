import { lazy, Suspense, useEffect, useState } from "react"

// @ts-ignore // Ignore TypeScript errors for this file
const Header = lazy(()=>import("header/Header"));
// @ts-ignore // Ignore TypeScript errors for this file
const Dashboard = lazy(()=>import("dashboard/Dashboard"))
// @ts-ignore // Ignore TypeScript errors for this file
const Profile = lazy(()=>import("profile/Profile"))


function App() {
const [title,setTitle] = useState("Welcome to the Host Application");
useEffect(()=>{
  window.addEventListener("profileTextSubmit",(e)=>{
    // const { name} = e.detail;
    const { name} = (e as CustomEvent).detail;
    setTitle(`Received text from Profile: ${name}`);
  })
},[])
  return (
   <>
    <div>
      <h2>Host</h2>
      <h3>{title}</h3>
      <Suspense fallback={<div>Loading Heaer...</div>}>
      <Header />
      </Suspense>
      <Suspense fallback={<div>Loading Dashboard...</div>}>
      <Dashboard />
      </Suspense>
      <Suspense fallback={<div>Loading Profile...</div>}>
      <Profile /> 
      </Suspense>
    </div>
   </>
  )
}

export default App
