export type CouponPost = {
  coupon: 'camera-333' | 'camera-444' | 'camera-555';
};

export type OrderPost = {
  camerasIds: [number, number];
  coupon: Pick<CouponPost, 'coupon'> | null;
}

