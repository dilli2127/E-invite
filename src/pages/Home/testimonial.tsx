import React from 'react';
import { Card, Carousel, Avatar, Rate } from 'antd';
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
        quote: 'This is a fantastic service! Highly recommended.',
        author: 'John Doe',
        location: 'New York, USA',
        imageSrc: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG',
        rating: 5,
        reviewText: 'The team was incredibly professional and delivered exceptional results. Highly recommend!', // Add this line
    },
    {
        quote: 'Excellent experience, will use again!',
        author: 'Jane Smith',
        location: 'London, UK',
        imageSrc: 'https://pub-c9841409a5664691accafda9ed7f1b86.r2.dev/062A6124.JPG',
        rating: 4,
        reviewText: 'Great service, but there were a few minor issues. Overall, a positive experience.', // Add this line
    },
];

const Testimonial: React.FC = () => {
    return (
        <div className="testimonial-container">
            <Carousel autoplay>
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="testimonial-card">
                        <div className="testimonial-header">
                            <h2>What Our Clients Say!</h2>
                            <div className="rating-container">
                                <Rate disabled defaultValue={testimonial.rating} />
                                <p className="review-text">{testimonial.reviewText}</p> {/* Add this line */}
                            </div>
                        </div>
                        <p className="testimonial-quote">“{testimonial.quote}”</p>
                        <div className="author-info">
                            <Avatar src={testimonial.imageSrc} size={64} alt={testimonial.author} />
                            <div className="author-details">
                                <p className="author-name">{testimonial.author}</p>
                                <p className="author-location">{testimonial.location}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </Carousel>
        </div>
    );
};

export default Testimonial;