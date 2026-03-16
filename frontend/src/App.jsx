import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Search, PlusCircle, Compass } from 'lucide-react';
import AddFoundItem from './pages/AddFoundItem';
import ItemsList from './pages/ItemsList';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-primary-200">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 glass shadow-sm border-b border-white/20 px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 hover:opacity-80 transition-opacity">
            <Compass className="w-8 h-8 text-primary-500" />
            <span>LostTracker</span>
          </Link>
          <div className="flex gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-slate-600 hover:bg-slate-100/50 hover:text-slate-900 transition-colors font-medium">
              <Search className="w-4 h-4" />
              <span>Browse</span>
            </Link>
            <Link
              to="/add"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-0.5 transition-all font-medium">
              <PlusCircle className="w-4 h-4" />
              <span>Report Found Item</span>
            </Link>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
          <Routes>
            <Route path="/" element={<ItemsList />} />
            <Route path="/add" element={<AddFoundItem />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
