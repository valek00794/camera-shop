import { CameraNameIncludes } from '../consts';
import { Camera } from '../types/camera';

export const scrollUp = (scrollToOptions: ScrollToOptions) => window.scrollTo(scrollToOptions);

export const getCameraTitle = (cameraInfo: Camera | null) => cameraInfo?.name.includes(CameraNameIncludes.SearchString) ? cameraInfo.name : cameraInfo && `${cameraInfo.category} ${cameraInfo.name}`;

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
