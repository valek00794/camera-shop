import { datatype, commerce, image, internet } from 'faker';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { Review, ReviewPost } from '../types/review';

const makeFakeCameraInfo = (id: number): Camera => ({
  id,
  name: commerce.productName(),
  vendorCode: commerce.product(),
  type: commerce.product(),
  category: commerce.department(),
  description: commerce.productDescription(),
  level: commerce.color(),
  rating: datatype.number(5),
  price: Number(commerce.price()),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number(),
} as Camera);

export const fakeCameraInfo = makeFakeCameraInfo(1);

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
} as Promo);

export const makeFakeReview = (id: number): Review => ({
  id,
  userName: internet.userName(),
  advantage: commerce.product(),
  disadvantage: commerce.productAdjective(),
  review: commerce.productDescription(),
  rating: datatype.number(5),
  createAt: datatype.datetime().toString(),
  cameraId: datatype.number(),
} as Review);

export const makeFakeNewReview = (): ReviewPost => ({
  userName: internet.userName(),
  advantage: commerce.product(),
  disadvantage: commerce.productAdjective(),
  review: commerce.productDescription(),
  rating: datatype.number(5),
  cameraId: datatype.number(),
} as ReviewPost);


export const makeFakeCameras = (count: number): Camera[] => {
  const cameras = [];
  for (let i = 2; i <= count; i++) {
    cameras.push(makeFakeCameraInfo(i));
  }
  cameras.push(fakeCameraInfo);
  return cameras;
};

export const makeFakeReviews = (count: number): Review[] => {
  const reviews = [];
  for (let i = 2; i <= count; i++) {
    reviews.push(makeFakeReview(i));
  }
  reviews.push(makeFakeReview(fakeCameraInfo.id));
  return reviews;
};

export const makeFakePriceRange = (): number[] => ([
  datatype.number({ min: 100, max: 1990 }),
  datatype.number({ min: 19900, max: 199000 })
] as number[]);

