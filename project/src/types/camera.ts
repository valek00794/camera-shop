import { Review } from './review';

export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type CameraEmbedRevievs = Pick<Camera, keyof Camera> & {reviews?: Pick<Review, keyof Review>[]};

export type BasketCamera = Pick<Camera, keyof Camera> & {count: number}
