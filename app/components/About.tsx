import React from 'react';
import AboutCard from './AboutCard';
import { about } from '@/data/data';
const About = () => {
    return (
        <div className='my-36 flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold text-5xl'>About <span className='text-base-content/60'>Us</span></h1>
            <div className='w-full flex flex-col justify-center items-center mt-8 gap-5'>
                {about.map((ab, index) => (
                    <AboutCard key={index} title={ab.title} benefits={ab.benefits} isOdd={index % 2 != 0} />
                ))}
            </div>
        </div>
    );
}
export default About;