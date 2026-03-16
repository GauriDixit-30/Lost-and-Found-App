import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AddFoundItem() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        itemId: '',
        name: '',
        foundBy: '',
        date: '',
        landmark: '',
        location: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const payload = {
                ...formData,
                itemId: parseInt(formData.itemId, 10)
            };

            const response = await axios.post('http://localhost:5000/items', payload);

            setStatus({ type: 'success', message: response.data.message || 'Item added successfully!' });
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error(error);
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to add item. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Report a Found Item</h1>
                <p className="text-slate-500 mt-2 text-lg">Help someone recover what they've lost.</p>
            </div>

            {status.message && (
                <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${status.type === 'success' ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                    {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                    <div>
                        <h3 className="font-semibold">{status.type === 'success' ? 'Success' : 'Error'}</h3>
                        <p className="text-sm opacity-90">{status.message}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="itemId" className="font-medium text-slate-700 text-sm">Item ID</label>
                        <input
                            required
                            type="number"
                            id="itemId"
                            name="itemId"
                            value={formData.itemId}
                            onChange={handleChange}
                            placeholder="e.g. 101"
                            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-medium text-slate-700 text-sm">Item Name</label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Wallet, Keys"
                            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="foundBy" className="font-medium text-slate-700 text-sm">Found By</label>
                        <input
                            required
                            type="text"
                            id="foundBy"
                            name="foundBy"
                            value={formData.foundBy}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="date" className="font-medium text-slate-700 text-sm">Date Found (DD-MM-YYYY)</label>
                        <input
                            required
                            type="text"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            placeholder="16-03-2026"
                            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="location" className="font-medium text-slate-700 text-sm">Location</label>
                        <input
                            required
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Campus, Main Building"
                            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="landmark" className="font-medium text-slate-700 text-sm">Landmark</label>
                        <input
                            required
                            type="text"
                            id="landmark"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            placeholder="e.g. Near Library Cafe"
                            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    <span>{isSubmitting ? 'Reporting...' : 'Submit Report'}</span>
                </button>
            </form>
        </div>
    );
}
