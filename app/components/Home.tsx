import Image from "next/image";
import Link from "next/link";
import React from "react";
const Home = () => {
    return (
        <div id="home" className="my-36 w-full px-3 lg:px-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
            <div
                className={`
    flex flex-col items-start justify-center gap-5 py-10
    lg:bg-none
    bg-[url('/background-shoes.png')] bg-no-repeat bg-contain bg-center
  `}
            >
                <h1
                    className="font-raleway text-5xl md:text-7xl font-bold bg-clip-text text-transparent 
                     bg-gradient-to-r from-base-content via-base-primary to-base-content/50"
                >
                    Ecommerce Shoes
                </h1>

                <p className="font-poppins max-w-5xl md:max-w-3xl text-primary font-normal text-xs md:text-sm leading-loose tracking-wide">
                    Discover the latest trends in footwear with our online shoe store, where style meets comfort.
                    From casual sneakers and athletic shoes to elegant heels and durable boots, we offer a wide range
                    of options to suit every occasion and personality. Our user-friendly platform makes shopping effortless.
                </p>

                <Link href={'/user'}
                    className="btn btn-primary font-raleway text-primary-300 mt-3 rounded-lg"
                >
                    Get Started
                </Link>
            </div>
            <div className="relative hidden lg:flex items-center justify-center">
                <Image
                    src="/background-shoes.png"
                    alt="background"
                    width={600}
                    height={600}
                    className="-rotate-45"
                />
            </div>
        </div>
    );
};

export default Home;
