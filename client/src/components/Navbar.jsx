import React, { useContext } from 'react';
import { assets } from '../assets/assets'; // Ensure the assets path is correct
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const NavBar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

  // ✅ Send Verification OTP API call
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);

      if (data.success) {
        toast.success(data.message);
        navigate('/email-verify'); // redirect to verification page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt='Logo' className='w-28 sm:w-32' />

      {userData ? (
        <div className='relative group'>
          <div className='w-10 h-10 rounded-full bg-black flex items-center justify-center font-bold text-white cursor-pointer'>
            {userData.name[0].toUpperCase()}

            <div className='absolute hidden group-hover:block top-full right-0 z-10 text-black rounded pt-2 bg-white shadow'>
              <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className='py-1 px-2 hover:bg-gray-200 cursor-pointer'
                  >
                    Verify Email
                  </li>
                )}
                <li
                  className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100'
        >
          Login <img src={assets.arrow_icon} alt='Arrow Icon' />
        </button>
      )}
    </div>
  );
};

export default NavBar;
