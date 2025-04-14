import React, { useState, useRef, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData } = useContext(AppContext);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = otp.map((_, i) => paste[i] || '');
    setOtp(newOtp);
    newOtp.forEach((value, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = value;
      }
    });
    const nextEmpty = newOtp.findIndex((val) => val === '');
    if (nextEmpty !== -1) {
      inputRefs.current[nextEmpty].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify`, {
        email: userData.email,
        otp: fullOtp,
      });

      if (data.success) {
        setUserData(data.user);
        toast.success('Email verified successfully!');
        navigate('/');
      } else {
        toast.error(data.message || 'Verification failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={handleVerify}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Email verify OTP</h1>
        <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email</p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
