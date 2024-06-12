import React from 'react'

export default function About() {
  return (
    <div className='px-4 max-w-6xl mx-auto'>
       <div className='grid grid-cols-1 gap-4'>
        <span className='flex flex-col gap-4'>
        <h1 className='text-blue-700 font-bold text-3xl lg:text-6xl'>
          About the Estate Zone
          
        </h1>
        <div className='text-gray-600 '>
         <span>
         Estate Zone is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
          <br />
          We offer options for every taste and budget.
Experience a seamless and hassle-free search.
Get detailed property information and photos.
Connect directly with property owners and agents.
Start your journey to a new home with Estate Zone.
         </span>
        </div>
        </span>
        </div>
      {/* <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Estate Zone</h1> */}
      <p className='mb-4 text-slate-700'>Sahand Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>
      <p className='mb-4 text-slate-700'>
      Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
      </p>
      <p className='mb-4 text-slate-700'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
    </div>
  )
}