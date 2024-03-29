import { CameraNameIncludes, FilterCategory, FilterType, TypeDeclension } from '../consts';
import { Camera } from '../types/camera';

export const scrollUp = (scrollToOptions: ScrollToOptions) => window.scrollTo(scrollToOptions);

export const getCameraTitle = (cameraInfo: Camera | null) =>
  cameraInfo?.name.includes(CameraNameIncludes.SearchString) ?
    cameraInfo.name :
    cameraInfo && `${cameraInfo.category} ${cameraInfo.name}`;

export const getHumanizeDateDayMounth = (date: string) =>
  new Date(date).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

export const removeValueByKeyFromSearchParams = (params: URLSearchParams, key: string, valueToRemove: string) => {
  const values = params.getAll(key);
  if (values.length) {
    params.delete(key);
    for (const value of values) {

      if (value !== valueToRemove) {
        params.append(key, value);
      }
    }
  }
  return params;
};

export const getCameraTypeTitle = (cameraInfo: Camera | null) => {
  if (cameraInfo?.category === FilterCategory.Photo) {
    switch (cameraInfo?.type) {
      case FilterType.Digital:
        return `${TypeDeclension.Digital} ${FilterCategory.Photo.toLocaleLowerCase()}`;
      case FilterType.Film:
        return `${TypeDeclension.Film} ${FilterCategory.Photo.toLocaleLowerCase()}`;
      case FilterType.Snapshot:
        return `${TypeDeclension.Snapshot} ${FilterCategory.Photo.toLocaleLowerCase()}`;
      case FilterType.Collection:
        return `${TypeDeclension.Collection} ${FilterCategory.Photo.toLocaleLowerCase()}`;
    }
  }
  return cameraInfo && `${cameraInfo?.type} ${cameraInfo?.category.toLocaleLowerCase()}`;
};
