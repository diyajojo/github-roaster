'use client';
import React, { useEffect, useState } from 'react';
import NavBar from './components/navbar';
import HeroSection from './components/hero';
import Features from './components/features';
import SampleRoast from './components/sample';
import FooterSection from './components/footer';

export default function Home() {
  // 1. First: Component mounts with initial state
  const [isMounted, setIsMounted] = useState(false); // initially false

  // 3. Third: useEffect runs after first render is complete
  useEffect(() => {
    setIsMounted(true);  // triggers re-render with isMounted = true
  }, []);

  // 2. Second: This check runs during initial render
  if (!isMounted) {
    return null;  // nothing shown initially
  }

  // 4. Fourth: After re-render due to isMounted becoming true
  return (
    <div>
      <NavBar /> 
      <main  className="flex-grow">
        <HeroSection />
        <Features/>
        <FooterSection/>
      </main>
    </div>
  );
}