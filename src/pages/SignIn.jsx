import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'


export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
    const res = await fetch('/api/auth/signin', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json()
    if(data.success === false) {
      dispatch(signInFailure(data.message))
      return;
    }
    dispatch(signInSuccess(data))
    navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='max-w-lg mx-auto bg-transparent shadow-lg shadow-blue-700 rounded-lg p-8 my-8'>
      <h1 className='text-3xl text-center font-semibold my-7 text-blue-600'>
        Login In
      </h1>
      {error && <p className='text-red-500 my-4 text-center'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' 
        className='border p-3 rounded-lg outline-none focus:outline-blue-600 active:outline-blue-600' id='email' onChange={handleChange} />
        <input type="password" placeholder='Password' 
        className='border p-3 rounded-lg outline-none focus:outline-blue-600 active:outline-blue-600' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-blue-600 hover:bg-blue-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 
        disabled:opacity-80'>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      
    </div>
  )
}
