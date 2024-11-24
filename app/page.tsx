
import React from 'react';
import NavBar from './components/navbar';
import HeroSection from './components/hero';
import Features from './components/features';
import SampleRoast from './components/sample';
import FooterSection from './components/footer';




export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen flex flex-col ">
      <NavBar />

      <main className="flex-grow">
        <HeroSection />
        <Features/>
        <SampleRoast/>
      </main>
      <FooterSection/>
     
    </div>
  );
}

