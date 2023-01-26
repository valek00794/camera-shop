export enum AppRoute {
  Default = '/',
  Catalog = '/catalog/page_:page',
  Camera = '/camera/:id',
  Error = '*',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
}


export enum NameSpace {
  Data = 'DATA',
}

export const CAMERAS_AMOUNT_SHOW_BY_PAGE = 9 as const;
