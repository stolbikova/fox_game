import React, { useEffect, useState, useRef } from 'react';
import './ImageList.scss'
import { shuffleArray } from '../../../../utils/shuffleArray';
import { URLS, THROTTLE_DELAY_MS } from '../../../../constants';
import { ImageType, FoxApiResponse, DogApiRespnse, CatApiResponse, ImageI } from '../../../../types';

let clickTimerId: number = Date.now();

interface ImageListProps {
    decrementScore: () => void,
    incrementScore: () => void,
    block?: boolean,
    onFirstLoad: () => void,
    loading: boolean
}
const ImageList: React.FC<ImageListProps> = ({ decrementScore, incrementScore, onFirstLoad, loading }) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [preload, setPreload] = useState<HTMLImageElement[]>([]);
    const counter = useRef(0);

    const fetchData = async (): Promise<ImageI[]> => {
        try {
            const responses: (CatApiResponse[] | DogApiRespnse | FoxApiResponse)[] = await Promise.all(URLS.map(async (url: string) => {
                const resp = await fetch(url);
                return resp.json();
            }));
            return responses.map((apiRes) => {
                if ("message" in apiRes)
                    return {
                        url: apiRes.message,
                        type: ImageType.DOG
                    }
                if ("image" in apiRes)
                    return {
                        url: apiRes.image,
                        type: ImageType.FOX
                    }
                if (Array.isArray(apiRes) && apiRes[0].url)
                    return {
                        url: apiRes[0].url,
                        type: ImageType.CAT
                    }
            });
        } catch (err) {
            // return empty array in case of api error
            return [];
        }
    }

    // First data fetching
    useEffect(() => {
        fetchData().then((data) => {
            setImages(loadImages(data));
        })
    }, [])

    useEffect(() => {
        if (preload.length === 0) setTimeout(() => {
            fetchData().then((res) => {
                shuffleArray(res);
                setPreload(loadImages(res));
            })
        }, 0)
    }, [preload])

    const handleClick = (type: ImageType) => {
        const clickCb = async () => {
            if (type === ImageType.FOX) {
                incrementScore();
            } else {
                decrementScore();
            }

            if (preload.length) {
                setImages(preload);
                setPreload([]);
            } else {
                fetchData().then((res) => {
                    shuffleArray(res);
                    setImages(loadImages(res))
                })
            }
            shuffleArray(images);
        }

        // Throttle the click func
        if ((Date.now() - clickTimerId) > THROTTLE_DELAY_MS) {
            clickTimerId = Date.now();
            clickCb();
        }
    }
    const handleAllImagesLoading = () => {
        counter.current += 1;
        if (counter.current === images.length) {
            onFirstLoad();
        }
    }
    const loadImages = (data: ImageI[]): HTMLImageElement[] => {
        const images: HTMLImageElement [] = [];
        for (let i = 0; i < data.length; i++) {
            images[i] = new Image();
            images[i].src = data[i].url;
            images[i].ariaLabel = data[i].type;
        }

        return images;
    }

    return (
    <div className={`image-container ${loading ? 'hidden': ''}`}>
        {images.map((img, idx) => (
            <img
                src={img.src}
                key={idx}
                className={'image'}
                onClick={() => handleClick((img as any).ariaLabel)}
                onLoad={handleAllImagesLoading}
            />))}
    </div>)
}
export default ImageList;   