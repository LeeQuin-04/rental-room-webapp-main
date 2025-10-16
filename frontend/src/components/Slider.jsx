import React, { useState, useEffect } from 'react';
import { ads1, ads2, ads3, ads4, ads5 } from '../assets/assets';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);

    const images = [ads1, ads2, ads3, ads4, ads5];

    const updateVisibleCount = () => {
        if (window.innerWidth < 640) {
            setVisibleCount(1);
        } else if (window.innerWidth < 1024) {
            setVisibleCount(2);
        } else {
            setVisibleCount(3);
        }
    };

    useEffect(() => {
        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-[130px] bottom-10 mx-auto overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
                <div className="flex w-full h-full gap-2 overflow-hidden">
                    {Array.from({ length: visibleCount }, (_, index) => {
                        const actualIndex = (currentIndex + index) % images.length;
                        return (
                            <div
                                key={actualIndex}
                                className="flex-1 h-full transition-all duration-1000 ease-in-out "
                            >
                                <img
                                    src={images[actualIndex]}
                                    alt={`Slide ${actualIndex + 1}`}
                                    className="w-full h-full object-cover object-center rounded-lg shadow-md"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Slider;
