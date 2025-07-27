import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return (
      <div className="embla__slide flex justify-center items-center bg-secondary/30 rounded-lg">
        <p className="text-muted-foreground">Tidak ada gambar</p>
      </div>
    );
  }

  return (
    <div className="embla">
      <div className="embla__viewport rounded-lg" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((imgUrl, index) => (
            <div className="embla__slide" key={index}>
              <img
                className="embla__slide__img"
                src={imgUrl}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button className="embla__button embla__button--prev" onClick={scrollPrev}>
            <ChevronLeft size={32} />
          </button>
          <button className="embla__button embla__button--next" onClick={scrollNext}>
            <ChevronRight size={32} />
          </button>
          <div className="embla__dots">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;