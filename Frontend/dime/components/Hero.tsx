import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="mb-40">
      <nav className="relative flex w-full items-center justify-between bg-white py-2 shadow-sm shadow-neutral-700/10 dark:bg-neutral-800 dark:shadow-black/30 lg:flex-wrap lg:justify-start" data-te-navbar-ref>
        {/* Your navigation content */}
      </nav>

      <div className="relative overflow-hidden bg-cover bg-no-repeat" style={{
        backgroundPosition: '50%',
        backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
        height: '500px',
      }}>
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mt-2 mb-16 text-4xl font-bold tracking-tight md:text-6xl xl:text-7xl">
              
              
                Crypto Savings & Bills Management Simplified
              </h1>
              <Link href={'/dapp'}>
              <button type="button" className="rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100  hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200" data-te-ripple-init data-te-ripple-color="light">
                Get started
              </button>
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
