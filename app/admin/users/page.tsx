"use client";
import React, { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import useUserStore from '@/store/userStore';
const Page = () => {
    const { getUsers, users, isUsersLoading, deleteUsers } = useUserStore();
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    const filteredUsers = users.filter((user: any) =>
        user.displayname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const newSelected = new Set(selectedUsers);
            currentUsers.forEach((user: any) => {
                newSelected.add(user.id);
            });
            setSelectedUsers(newSelected);
        } else {
            const newSelected = new Set(selectedUsers);
            currentUsers.forEach((user: any) => {
                newSelected.delete(user.id);
            });
            setSelectedUsers(newSelected);
        }
    };
    const handleUserSelect = (userId: string) => {
        const newSelected = new Set(selectedUsers);
        if (newSelected.has(userId)) {
            newSelected.delete(userId);
        } else {
            newSelected.add(userId);
        }
        setSelectedUsers(newSelected);
    };
    const isAllSelected = currentUsers.length > 0 &&
        currentUsers.every((user: any) => selectedUsers.has(user.id));
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleDeleteSelected = async () => {
        if (selectedUsers.size === 0) return;
        const userIdsToDelete = Array.from(selectedUsers);
        await deleteUsers(userIdsToDelete);
        setSelectedUsers(new Set());
    };
    if (isUsersLoading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <span className='loading loading-infinity loading-md'></span>
            </div>
        );
    }
    return (
        <div className='p-3 font-poppins h-full flex flex-col items-start justify-start gap-5'>
            <div className='w-full flex justify-between items-center'>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div className='flex items-center justify-center gap-3'>
                    <button
                        type='button'
                        className='btn btn-circle bg-primary/30 hover:bg-primary hover:text-base-300'
                        onClick={handleDeleteSelected}
                        disabled={selectedUsers.size === 0}
                    >
                        <Trash size={23} />
                    </button>
                </div>
            </div>
            <div className='w-full flex items-start justify-center'>
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={isAllSelected}
                                            onChange={handleSelectAll}
                                        />
                                    </label>
                                </th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>
                                    <div className='flex flex-col items-center justify-center w-full'>
                                        Status Online
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user: any) => (
                                <tr key={user.id}>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                checked={selectedUsers.has(user.id)}
                                                onChange={() => handleUserSelect(user.id)}
                                            />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar sm:block hidden">
                                                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                                                    <Image
                                                        src={user.profilepicture}
                                                        alt={user.displayname}
                                                        width={50}
                                                        height={50}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayname}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.country}, {user.city}, {user.state}, {user.street}, {user.zip}</td>
                                    <td className='flex items-center justify-center h-[5rem]'>
                                        {user.status ? (
                                            <div className='w-[0.8rem] h-[0.8rem] rounded-full bg-green-700' />
                                        ) : (
                                            <div className='w-[0.8rem] h-[0.8rem] rounded-full bg-red-700' />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className="join flex">
                    <button
                        className="join-item btn btn-outline"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Previous page
                    </button>
                    <button className="join-item btn btn-outline pointer-events-none">
                        Page {currentPage} of {totalPages}
                    </button>
                    <button
                        className="join-item btn btn-outline"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Page;