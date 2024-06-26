import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import Listing from './Listing';

export default function ListingData() {
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
      <div className='mt-28 flex flex-col px-4 md:p-0 gap-6 max-w-6xl mx-auto'>
        
      
      </div>
     
      <div className='flex flex-col px-4 md:p-0 gap-6 max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 gap-4'>
        <span className='flex flex-col gap-4'>
        <h1 className='text-blue-700 font-bold text-3xl'>
          Latest Listings here
      
          check them and enjoy!
        </h1>
       
        </span>
        </div>
      
      </div>

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