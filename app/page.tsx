'use client';
import React, { useEffect, useState } from 'react';
import NavBar from './components/navbar';
import HeroSection from './components/hero';
import Features from './components/features';
import SampleRoast from './components/sample';
import FooterSection from './components/footer';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render the content after component is mounted on the client
  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen flex flex-col">
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

