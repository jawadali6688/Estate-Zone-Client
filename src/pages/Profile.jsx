import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUplaodError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])
  const dispatch = useDispatch()

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 && 
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if (data.success === false) {
        setShowListingsError(true)
        return;
      }

      setUserListings(data)
    } catch (error) {
      setShowListingsError(true)
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listings/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing.id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
  }
  

  return (
    <div className='p-3 w-[98%] md:w-[80%] lg:w-[60%]  mx-auto'>
     <div>
       <h1 className='text-3xl font-semibold 
      text-center my-7 text-blue-600'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} 
        type="file" ref={fileRef} hidden 
        accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" 
        className='rounded-full h-24 w-24 
        object-cover cursor-pointer self-center mt-2' />
         <p className='text-sm self-center'>
          {fileUplaodError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" placeholder='username' 
        defaultValue={currentUser.username}
        className='border p-3 rounded-lg outline-none focus:outline-blue-600 active:outline-blue-600' id='username' 
        onChange={handleChange} />
        <input type="email" placeholder='email' 
        defaultValue={currentUser.email} 
        className='border p-3 rounded-lg outline-none focus:outline-blue-600 active:outline-blue-600' id='email' 
        onChange={handleChange} />
        <input type="password" placeholder='password' 
        className='border p-3 rounded-lg outline-none focus:outline-blue-600 active:outline-blue-600' id='password' />
        <button disabled={loading} className='bg-slate-700 text-white 
        rounded-lg p-3 uppercase hover:opacity-95 
        disabled:opacity-80'>
          {loading ? 'Loading...' : 'update'}
        </button>
        
      </form>
     </div>

     

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete 
        account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign 
        out</span>
      </div>

      <div className='my-4 border-t-4   justify-center'>
      <h1 className='text-3xl font-semibold 
      text-center my-7 text-blue-600'>Create Listing</h1>
      <h3 className='mb-8'>
        You can create listing by clicking on the below button, you have to provide some neccessery information for listing. 
        Thank you
      </h3>
      <Link className='bg-green-700 text-white 
        p-3 px-8 rounded-lg uppercase text-center my-4 ' to={"/create-listing"}>
          Create Listing
        </Link>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
      <div className='my-4 border-t-4   justify-center'>
      <h1 className='text-3xl font-semibold 
      text-center my-7 text-blue-600'>Your Listing</h1>
      <h3 className='mb-8'>
       You Can Check your listings by clicking on the below button 
        Thank you
      </h3>
      <button onClick={handleShowListings} className='text-white py-4 rounded-md bg-blue-600 p-2 w-full'>Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>
      </div>

     
     
      {userListings && userListings.length > 0 && 
      <div className='flex flex-col gap-4'>
        <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
        {userListings.map((listing) => <div key={listing._id} 
        className='border rounded-lg p-3 flex justify-between items-center gap-4'>
          <Link to={`/listings/${listing._id}`}>
            <img className='h-16 w-16 object-contain' src={listing.imageUrls[0]} alt="listing cover" />
          </Link>
          <Link className='flex-1 text-slate-700 font-semibold hover:underline truncate' to={`/listing/${listing._id}`}>
            <p>{listing.name}</p>
          </Link>
  
          <div className='flex  gap-4 items-center'>
            <button onClick={() => handleListingDelete(listing._id)} className='text-white px-4 py-2 bg-red-700 rounded-lg uppercase'>Delete</button>
            <Link to={`/update-listing/${listing._id}`}>
              <button className='text-white px-4 py-2 bg-green-700 rounded-lg uppercase'>Edit</button>
            </Link>
          </div>
        </div>
        
        )}
      </div>}
    </div>
  )
}
