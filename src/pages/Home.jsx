import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listings/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listings/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listings/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 mt-4 px-3 max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 gap-4'>
        <span className='flex flex-col gap-4'>
        <h1 className='text-blue-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-blue-500'>perfect</span>
          <br />
          place with ease
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
        <Link
          to={'/search'}
          className='text-lg py-2 rounded-lg bg-blue-600 px-4 text-white font-bold  cursor-pointer hover:bg-blue-700 duration-200 w-fit'
        >
          Let's get started...
        </Link>
      </div>

      <div className='flex flex-col px-8 my-4 md:p-0 gap-6 max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 gap-4'>
        <span className='flex flex-col gap-4'>
        <h1 className='text-blue-700 font-bold text-3xl'>
          Latest Listings here
          check them and enjoy!
        </h1>
       
        </span>
        </div>
      
      </div>

      

      {/* swiper */}
      <div className='max-w-6xl mx-auto '>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  borderRadius: '12px'
                }}
                className='h-[500px]'

              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      </div>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex border-t-4 flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings.length === 0 || !rentListings && (
          <div className=''>
            <h1 className='text-gray-700 font-bold text-lg'>
          No Listing's Data
        </h1>
          </div>
        )}
        
      </div>
    </div>
  );
}