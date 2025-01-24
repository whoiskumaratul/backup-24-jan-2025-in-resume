import React, { useState, useEffect } from 'react'
import IMAGES from '../../image/Image'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // To check for refresh flag

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('http://localhost:8000/api/profile', {
        credentials: 'include',
      });
      // const { data } = await axios.get('http://localhost:8000/api/profile', {
      //   withCredentials: true,
      // });
      const data = await response.json();
      if (!data.status) {
        navigate('/login');
      }
      setUser(data.user);
    };

    // Re-fetch user data if `refresh` flag is present
    if (!user || location.state?.refresh) {
      getUser();
    }
  }, [location.state?.refresh]); // Re-run effect when refresh flag changes

  if (!user) {
    return <>Loading....</>;
  }

  return (
    <div>
      <div className="grid lg:grid-cols-1 w-full ml-auto mr-auto">
        <div className="bg-white h-auto md:grid-cols-6 pb-5">
          <div className="bg-green-700 text-center text-white h-24 mt-auto mb-auto p-5 text-lg">
            {/* {user.name}<div>{user.email} </div> */}
          </div>
          <div className="bg-green-700 h-11">
            <img
              className="ml-auto mr-auto relative mt-auto rounded-full border-4 border-white w-24 h-24"
              src={IMAGES.image1}
              alt="a"
            />
          </div>
          <div className="flex justify-center mt-16 space-x-6">
            {/* <button
              className="text-[13px] pt-1 pb-1 pl-2 pr-2 bg-slate-600 text-white rounded-sm"
              onClick={() => navigate(`/edit/profile/${user.id}`)}
            >
              Edit Profile
            </button> */}
            <button
              className="text-[14px] pt-1 pb-1 pl-2 pr-2 bg-slate-600 text-white rounded-sm"
              onClick={() => navigate('/bloghomepage')}
            >
              Blog Home page
            </button>
          </div>
          <h3 className="text-center mt-4 font-semibold">
            Name : {user.name}
            <br />
            Email : {user.email}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;