import { Card, Rate } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const { Meta } = Card;

export default function ShoppingCard({
  src,
  alt,
  title,
  description,
  link,
  rate,
}: {
  src: string;
  alt: string;
  title: string;
  description: string;
  link: string;
  rate: number;
}) {
  return (
    <Link href={link}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<Image width={240} height={240} alt={alt} src={src} />}
        bodyStyle={{ padding: 12 }}
      >
        <Meta title={title} description={description} />
        <Rate
          className='mt-2 text-sm'
          disabled
          defaultValue={rate}
          allowHalf
        ></Rate>
      </Card>
    </Link>
  );
}
