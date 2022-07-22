import React from 'react';

import UseSlider from "./Slider/UseSlider";

// Styles
import './tagline.css';

const slides = [
    {
        title: "Your destination for the best in designer vintage and secondhand items",
    },
    {
        title: "LOOK and GET the current trends in the community",
    },
    {
        title: "Wear EXCEPTIONAL and SOPHISTICATED items",
    }
];

const Tagline = () => {
    const { offset } = UseSlider({
        total: slides.length,
        enabled: true,
        useLoaded: false,
        speed: 3000
      });

    return (
        <section className="tagline">
            {slides.map((slide, index) => (
                <div key={slide.title} className={`slide ${index !== offset && 'hidden'}`}>
                    {slide.title}
                </div>
            ))}
        </section>
    )
}

export default Tagline;