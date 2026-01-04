
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const handlePageChange = (page: Page) => {
    if (page === Page.About) {
      const element = document.getElementById('about-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setCurrentPage(Page.About);
        return;
      }
    }

    if (page === Page.Contact) {
      const element = document.getElementById('contact-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setCurrentPage(Page.Contact);
        return;
      }
    }
    
    if (page === Page.Home) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(Page.Home);
    }
  };

  const renderPage = () => {
    // Both About and Contact are now integrated into Home
    return <Home onNavigate={handlePageChange} />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
