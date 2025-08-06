import React from 'react';
import { Card, Carousel, Avatar, Rate } from 'antd';
import { motion } from 'framer-motion';
import './testimonial.css';

interface TestimonialItem {
    quote: string;
    author: string;
    location: string;
    imageSrc: string;
    rating: number;
    reviewText: string;
}

const testimonials: TestimonialItem[] = [
    {
        quote: 'Absolutely stunning photography! They captured every precious moment of our wedding day with such artistry and professionalism.',
        author: 'Sarah & Michael Johnson',
        location: 'New York, USA',
        imageSrc: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG',
        rating: 5,
        reviewText: 'The team exceeded our expectations in every way. The photos are breathtaking and we\'ll treasure them forever.',
    },
    {
        quote: 'Professional, creative, and so easy to work with. Our engagement photos turned out better than we ever imagined!',
        author: 'Emily Chen',
        location: 'London, UK',
        imageSrc: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/005A6658.jpg',
        rating: 5,
        reviewText: 'From the initial consultation to the final delivery, everything was perfect. Highly recommend!',
    },
    {
        quote: 'The attention to detail and artistic vision is incredible. They made our special day even more memorable.',
        author: 'David & Lisa Rodriguez',
        location: 'Barcelona, Spain',
        imageSrc: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/005A7695.jpg',
        rating: 5,
        reviewText: 'Every single photo tells a story. We couldn\'t be happier with our choice of photographer.',
    },
];

const Testimonial: React.FC = () => {
    return (
        <div className="testimonial-container">
            <motion.div 
                className="testimonial-header-section"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="testimonial-main-title">What Our Clients Say</h2>
                <p className="testimonial-main-subtitle">
                    Don't just take our word for it - hear from our happy couples
                </p>
            </motion.div>
            
            <Carousel 
                autoplay 
                dots={{ className: 'custom-dots' }}
                autoplaySpeed={5000}
                effect="fade"
            >
                {testimonials.map((testimonial, index) => (
                    <div key={index}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="testimonial-card">
                                <div className="quote-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                                    </svg>
                                </div>
                                
                                <div className="rating-container">
                                    <Rate disabled defaultValue={testimonial.rating} />
                                </div>
                                
                                <p className="testimonial-quote">"{testimonial.quote}"</p>
                                <p className="review-text">{testimonial.reviewText}</p>
                                
                                <div className="author-info">
                                    <Avatar 
                                        src={testimonial.imageSrc} 
                                        size={80} 
                                        alt={testimonial.author}
                                        className="author-avatar"
                                    />
                                    <div className="author-details">
                                        <h4 className="author-name">{testimonial.author}</h4>
                                        <p className="author-location">{testimonial.location}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Testimonial;