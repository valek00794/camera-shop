export enum AppRoute {
  Default = '/',
  DefaultCatalog = '/catalog',
  Catalog = '/catalog/page_:page',
  Camera = '/catalog/:id/:about',
  Error = '*',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Reviews = '/reviews',
  Similar = '/similar',
  Coupons = '/coupons',
  Orders = '/orders'
}


export enum NameSpace {
  Data = 'DATA',
}

export const CAMERAS_AMOUNT_SHOW_BY_PAGE = 9 as const;

export enum SimilarListVisibleSetttings {
  FirstElement = 0,
  VisibleCount = 3,
}
