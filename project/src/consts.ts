export enum AppRoute {
  Default = '/',
  DefaultCatalog = '/catalog',
  Catalog = '/catalog/page_:page',
  Camera = '/catalog/:id',
  DefaultCamera = '/catalog/:id/:about',
  Basket = '/catalog/basket',
  Error = '*',
}

export enum APIRoute {
  Cameras = '/cameras/',
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

export enum ReviewListSetttings {
  VisibleCount = 3,
}

export enum CameraNameIncludes {
  SearchString = 'Ретрокамера',
}

export enum SortParams {
  Order = 'order',
  Sort = 'sort',
}

export enum FilterParams {
  Category = 'category',
  Level = 'level',
  Type = 'type',
  PriceFrom = 'price_gte',
  PriceTo = 'price_lte'
}

export enum SortState {
  Price = 'price',
  Rating = 'rating',
  Asc = 'asc',
  Desc = 'desc',
}

export enum FilterCategory {
  Photo = 'Фотоаппарат',
  Video = 'Видеокамера',
}

export enum FilterLevel {
  Zero = 'Нулевой',
  NonPro = 'Любительский',
  Pro = 'Профессиональный',
}

export enum FilterType {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
}

export enum TypeDeclension {
  Digital = 'Цифровой',
  Film = 'Плёночный',
  Snapshot = 'Моментальный',
  Collection = 'Коллекционный',
}

export const scrollToTopCatalogOptions: ScrollToOptions = {
  top: 348,
  behavior: 'smooth'
};

export const scrollToTopOptions: ScrollToOptions = {
  top: 0,
  behavior: 'smooth'
};

export const scrollToReviewOptions: ScrollToOptions = {
  top: 1175,
  behavior: 'smooth'
};

export const DEFAULT_RATING_VALUE = 0;
