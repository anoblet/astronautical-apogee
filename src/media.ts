let mediaSize: string;
const subscribers: any = [];

const observer = window.matchMedia("(max-width: 512px)");

const mediaChanged = (mediaQueryList: any) => {
  mediaSize = mediaQueryList.matches ? "mobile" : "desktop";
  subscribers.map((callback: any) => callback(mediaSize));
};

observer.addEventListener("change", mediaChanged);

mediaChanged(observer);

const subscribe = (callback: any) => {
  subscribers.push(callback);
  callback(mediaSize);
};

export const media = {
  subscribe,
};

export default media;
