import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-lg px-6 py-12 text-center">
            <img
            src="https://cdn.dribbble.com/userupload/24450589/file/original-7a69eb5b87401ce59325c3291535aebc.gif"
          />
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">Page not found</h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    </PageTransition>
  );
}