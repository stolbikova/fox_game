const CAT_API = "https://api.thecatapi.com/v1/images/search?mime_types=jpg";
const DOG_API = "https://dog.ceo/api/breeds/image/random";
const FOX_API = "https://randomfox.ca/floof/";
export const URLS: string [] = [...Array(4).fill(DOG_API), ...Array(4).fill(CAT_API), ...Array(1).fill(FOX_API)];
export const THROTTLE_DELAY_MS = 300;
export const PlAY_TIME_MS = 30*1000;