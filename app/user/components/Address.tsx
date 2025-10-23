"use client";
import { baseUrl } from '@/global.t';
import useAuthStore from '@/store/authStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const Address = () => {
    const { user } = useAuthStore();
    const [countries, setCountries] = useState<string[]>([]);
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [countriesLoading, setCountriesLoading] = useState(true);
    const fetchCountries = async () => {
        try {
            setCountriesLoading(true);
            const response = await axios.get(`${baseUrl}/api/countries`);
            if (response.data && Array.isArray(response.data)) {
                const countryNames = response.data.map((c: any) => c.name || c);
                setCountries(countryNames);
            }
        } catch (error) {
            console.log('Failed to fetch countries:', error);
            toast.error('Failed to load countries list');
            setCountries(['United States', 'Canada', 'United Kingdom']);
        } finally {
            setCountriesLoading(false);
        }
    };
    const fetchAddress = async () => {
        if (!user?.id) return;
        try {
            const response = await axios.get(`${baseUrl}/api/user-address/${user.id}`);
            const data = response.data.address;
            if (data) {
                setStreet(data.street || '');
                setCity(data.city || '');
                setState(data.state || '');
                setZip(data.zip || '');
                setCountry(data.country || '');
            }
        } catch (error) {
            console.error('Failed to fetch address:', error);
        }
    };
    const fetchData = async () => {
        if (!user?.id) return;
        setLoading(true);
        await Promise.all([
            fetchCountries(),
            fetchAddress()
        ]);
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [user]);
    const onSubmit = async () => {
        if (!user?.id) {
            toast.error('User not authorized!');
            return;
        }
        if (!street || !city || !state || !zip || !country) {
            toast.error('All fields are required!');
            return;
        }
        setSubmitting(true);
        try {
            await axios.put(`${baseUrl}/api/user-address`, {
                data: {
                    userId: user.id,
                    street,
                    city,
                    state,
                    zip,
                    country
                }
            });
            toast.success('Address updated successfully!');
        } catch (err: any) {
            console.error('Address update error:', err);
            const errorMessage = err.response?.data?.error || err.message || 'Failed to update address';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };
    if (loading) {
        return (
            <div className="w-full flex justify-center items-center h-64">
                <span className='loading loading-infinity loading-lg'></span>
                <span className='ml-2'>Loading address...</span>
            </div>
        );
    }
    return (
        <div className="mb-10  flex flex-col items-start justify-start bg-base-300 p-3 rounded-xl">
            <h1 className="text-3xl md:text-5xl self-start font-bold font-raleway mb-3">Shipping Address</h1>
            <div className="flex flex-col gap-4 w-full max-w-4xl">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Street Address</label>
                        <input
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Enter your street address..."
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">City</label>
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Enter your city"
                        />
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">State/Province</label>
                        <input
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Enter your state or province"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">ZIP/Postal Code</label>
                        <input
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Enter your ZIP or postal code"
                        />
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Country</label>
                        <select
                            value={country}
                            className="select select-bordered w-full"
                            onChange={(e) => setCountry(e.target.value)}
                            disabled={countriesLoading}
                        >
                            <option value="">Select your country</option>
                            {countries.map((name, idx) => (
                                <option key={idx} value={name}>{name}</option>
                            ))}
                        </select>
                        {countriesLoading && (
                            <span className="text-sm text-gray-500">Loading countries...</span>
                        )}
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={onSubmit}
                            type="button"
                            className="btn btn-primary font-raleway font-bold px-8"
                            disabled={submitting || !street || !city || !state || !zip || !country}
                        >
                            {submitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Updating...
                                </>
                            ) : (
                                'Save Address'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Address;