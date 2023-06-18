import React from 'react';
import { NextPage } from 'next';
import { footerList1 } from '../utils/constants';

const List = ({ items, mt }: { items: string[], mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: string) => (
      <p key={item} className='text-gray-400 text-sm  hover:underline cursor-pointer' >
        {item}
      </p>
    ))}
  </div>
);

const Footer: NextPage = () => (
  <div className='mt-6 hidden xl:block'>
    <List items={footerList1} mt={false} />
  </div>
);

export default Footer;