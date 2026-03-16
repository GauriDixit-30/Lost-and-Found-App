import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Calendar, User, Hash, AlertTriangle, Loader2 } from 'lucide-react';

export default function ItemsList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = async (query = '') => {
        setIsSearching(true);
        setError(null);
        try {
            const endpoint = query
                ? `http://localhost:5000/items/${encodeURIComponent(query)}`
                : 'http://localhost:5000/items';

            const response = await axios.get(endpoint);
            setItems(response.data);
        } catch (err) {
            console.error("Error fetching items:", err);
            setError("Unable to connect to the server. Please ensure the backend is running.");
        } finally {
            setLoading(false);
            setIsSearching(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchItems(searchQuery);
    };

    const handleClear = () => {
        setSearchQuery('');
        fetchItems('');
    };

    return (
        <div className="flex flex-col gap-8 pb-12">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Lost Something?</h1>
                <p className="text-slate-500 text-lg md:text-xl">Search through user-reported found items across campus and reclaim your belongings.</p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="w-full mt-8 relative flex items-center shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl group">
                    <div className="absolute left-4 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                        <Search className="w-6 h-6" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for an item (e.g. Wallet, Keys)..."
                        className="w-full pl-14 pr-24 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg bg-white"
                    />
                    <div className="absolute right-2 flex gap-2">
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-700 font-medium"
                            >
                                Clear
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-slate-900 text-white px-5 py-2 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[5rem]"
                        >
                            {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
                        </button>
                    </div>
                </form>
            </div>

            {error ? (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-2xl flex items-center gap-4 max-w-2xl mx-auto w-full">
                    <AlertTriangle className="w-8 h-8 text-rose-500 shrink-0" />
                    <p className="font-medium">{error}</p>
                </div>
            ) : loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-20 px-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                        <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No items found</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                        {searchQuery ? `We couldn't find any items matching "${searchQuery}".` : "There are currently no reported found items."}
                    </p>
                    {searchQuery && (
                        <button
                            onClick={handleClear}
                            className="mt-6 font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-6 py-2 rounded-full transition-colors"
                        >
                            View all items
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, idx) => (
                        <div key={`${item.itemId}-${idx}`} className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300 hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors capitalize">{item.name}</h3>
                                    <div className="flex items-center text-slate-400 mt-1 text-sm font-medium">
                                        <Hash className="w-3.5 h-3.5 mr-1" /> ID: {item.itemId}
                                    </div>
                                </div>
                                <div className="bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                                    Found
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                                        <User className="w-4 h-4 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Found By</p>
                                        <p className="font-semibold text-slate-700">{item.foundBy}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Location</p>
                                        <p className="font-semibold text-slate-700">{item.location}</p>
                                        {item.landmark && (
                                            <p className="text-sm text-slate-500 flex items-center mt-0.5 before:content-[''] before:w-1 before:h-1 before:bg-slate-300 before:rounded-full before:mr-2">
                                                Near {item.landmark}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                                        <Calendar className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Date</p>
                                        <p className="font-semibold text-slate-700">{item.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
