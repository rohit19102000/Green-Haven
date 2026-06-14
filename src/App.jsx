import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Cards from './components/Cards';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Footer from './components/Footer';

function App() {
  // Shared state to sync card selections with the booking wizard
  const [selectedPackageId, setSelectedPackageId] = useState('rustic-picnic');

  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <About />
        <Cards onSelectPackage={setSelectedPackageId} />
        <Gallery />
        <Booking selectedPackageId={selectedPackageId} onSelectPackage={setSelectedPackageId} />
      </main>
      <Footer />
    </>
  );
}

export default App;
