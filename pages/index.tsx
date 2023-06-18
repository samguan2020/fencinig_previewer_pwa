import React from 'react';
import axios from 'axios';

import VideoCard from '../components/VideoCard';
import { BASE_URL } from '../utils';
import { Video } from '../types';
import NoResults from '../components/NoResults';

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  console.log(videos)

  return (
     <div className='flex flex-col gap-10 videos h-full'>
      <p className='text-gray-400 text-md mt-5 mr-4'>For video submission issue, please email fencingoutreach@gmail.com </p>
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        )) 
      ) : (<NoResults text={`Please help to add more videos, Thanks!`} />
    )}
    <p className='text-gray-400 text-md mt-3'>© 2023 fencingoutreach.org</p>
    </div> 
  );
};

export const getServerSideProps = async ({
  query: { topic }
}: {
  query: { topic: string }
}) => {
  let response = null;

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }
   
  return {
    props: {
      videos: response.data
    }
  };
};

export default Home;