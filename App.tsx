
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Resources from './pages/Resources';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage === Page.Home) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentPage === Page.Services || currentPage === Page.Resources) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentPage === Page.About) {
      // Use setTimeout to ensure the DOM update has happened (Home component mounted)
      setTimeout(() => {
        const element = document.getElementById('about-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (currentPage === Page.Contact) {
      setTimeout(() => {
        const element = document.getElementById('contact-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [currentPage]);

  const renderPage = () => {
    if (currentPage === Page.Services) {
      return <Services />;
    }
    if (currentPage === Page.Resources) {
      return <Resources />;
    }
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
