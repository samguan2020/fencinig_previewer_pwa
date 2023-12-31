import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';

import { BASE_URL } from '../../utils'
import { Video } from '../../types'; 
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

import Preview from './preview'

interface IProps {
  postDetails: Video,
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  if(!post) return null;

   const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };
 
  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      {/* <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'> */}
        <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer ' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
          </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <Preview
              url={post?.video?.asset.url}
            />
          </div>
        </div>
      {/* </div> */}
{/*       
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10'>
          <div className='flx gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
              <Link href="/">
                <>
                  <Image
                    width={60}
                    height={60}
                    alt='user-profile'
                    className='rounded-full'
                    src={post.postedBy.image}
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className='flex items-center gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                    {post.postedBy.userName}{``}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-medium text-ms text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
                </div>
              </Link>
            </div>
          </div>

          <p className='px-10 text-lg text-gray-600'>{post.caption}</p>

          <div className='mt-10 px-10'>
            {userProfile && (
              <LikeButton 
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={()=>handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
            comments={post.comments}
          />
        </div>
      </div>
 */}    
    </div>
  )
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;