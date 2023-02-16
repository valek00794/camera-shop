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
