"use client";

import {signOut} from "next-auth/react";

interface UserInfoProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
}

const UserInfo = ({user}: UserInfoProps) => {
    const {name, email} = user;

    return (
        <div className="flex flex-col items-center justify-center gap-2 p-5 max-w-md w-full shadow-lg rounded-lg">
            <div className="w-full">
                <h1>Welcome {name}</h1>
                <h3>{email}</h3>

                <hr/>
                <button
                    onClick={() => signOut()}
                    className="btn"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default UserInfo;