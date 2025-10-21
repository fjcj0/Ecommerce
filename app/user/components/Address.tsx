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
    const fetchData = async () => {
        if (!user?.id) return;
        setLoading(true);
        try {
            const countryResponse = await axios.get(`${baseUrl}/api/countries`);
            setCountries(countryResponse.data.map((c: any) => c.name));
            const addressResponse = await axios.get(`${baseUrl}/api/user-address/${user.id}`);
            const data = addressResponse.data.address;
            if (data) {
                setStreet(data.street || '');
                setCity(data.city || '');
                setState(data.state || '');
                setZip(data.zip || '');
                setCountry(data.country || '');
            }
        } catch (err) {
            toast.error('Failed to fetch data');
            console.error(err);
        } finally {
            setLoading(false);
        }
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
                data: { userId: user.id, street, city, state, zip, country }
            });
            toast.success('Address updated successfully!');
        } catch (err: any) {
            toast.error(err instanceof Error ? err.message : 'Failed to update address');
        } finally {
            setSubmitting(false);
        }
    };
    if (loading) {
        return (
            <div className="w-full flex justify-center items-center h-64">
                <span className='loading loading-infinity loading-md'></span>
            </div>
        );
    }
    return (
        <div className="mb-10 w-full flex flex-col items-center justify-center">
            <h1 className="text-5xl self-start font-bold font-raleway">Address</h1>
            <div className="flex flex-col gap-3 w-full mt-8">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 px-3 gap-3">
                    <input
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        type="text"
                        className="bg-primary text-base-300 outline-base-content px-3 py-2 rounded-lg placeholder:text-base-300 font-raleway"
                        placeholder="Street..."
                    />
                    <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        className="bg-primary text-base-300 outline-base-content px-3 py-2 rounded-lg placeholder:text-base-300 font-raleway"
                        placeholder="City"
                    />
                </div>
                <div className="w-full grid md:grid-cols-2 grid-cols-1 px-3 gap-3">
                    <input
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        type="text"
                        className="bg-primary text-base-300 outline-base-content px-3 py-2 rounded-lg placeholder:text-base-300 font-raleway"
                        placeholder="State"
                    />
                    <input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        type="text"
                        className="bg-primary text-base-300 outline-base-content px-3 py-2 rounded-lg placeholder:text-base-300 font-raleway"
                        placeholder="Zip..."
                    />
                    <select
                        value={country}
                        className="bg-primary text-base-300 outline-base-content px-3 py-2 rounded-lg font-raleway"
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="" disabled>Select Country</option>
                        {countries.map((name, idx) => (
                            <option key={idx} value={name}>{name}</option>
                        ))}
                    </select>
                    <div className="flex items-start justify-normal">
                        <button
                            onClick={onSubmit}
                            type="button"
                            className="btn btn-primary font-raleway font-bold self-start"
                            disabled={submitting}
                        >
                            {submitting ? 'Submitting...' : 'Edit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Address;