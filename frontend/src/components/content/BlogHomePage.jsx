import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function BlogHomePage() {

    const [Theuser, ThesetUser] = useState (null)
    const navigate = useNavigate()
      useEffect(() => {
        const getUser = async () => {
        const response = await fetch('http://localhost:8000/api/profile', {
          credentials: 'include'
        })
        const data = await response.json()
        if(!data.status){
          navigate('/login')
        }
        console.log(data)
  
        ThesetUser(data.user)
       
      }
      getUser()
    }, [])
  
     if(!Theuser) {
      return <>Loading....</>
     }
  return (
    <div className=' p-4'>
    <div>
      <span>Name : {Theuser.name}</span>
       <br />
       <span>Email : { Theuser.email}</span>
         
    </div>

    <button className=' mt-4 pt-1 pb-1 pl-2 pr-2 bg-blue-700 text-white' onClick={() => navigate('/profile') } >Profile Page</button>
    </div>
  )
}

export default BlogHomePage