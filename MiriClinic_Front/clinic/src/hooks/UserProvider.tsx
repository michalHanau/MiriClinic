import React, { createContext, useContext, useState, useEffect } from 'react';

// הגדרת סוג הקונטקסט
interface UserContextType {
    userName: string | null;
    setUserName: (name: string | null) => void;
}

// יצירת הקונטקסט
const UserContext = createContext<UserContextType | undefined>(undefined);

// ספק הקונטקסט
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userName, setUserName] = useState<string | null>(null);

    // טוען את שם המשתמש מ-Local Storage בעת הטעינה הראשונית
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    // פונקציה לעדכון שם המשתמש ושמירה ב-Local Storage
    const updateUserName = (name: string | null) => {
        setUserName(name);
        if (name) {
            localStorage.setItem('userName', name); // שמירה ב-Local Storage
        } else {
            localStorage.removeItem('userName'); // מחיקת שם המשתמש אם אין
        }
    };

    return (
        <UserContext.Provider value={{ userName, setUserName: updateUserName }}>
            {children}
        </UserContext.Provider>
    );
};

// פוקנציה להקל על השימוש בקונטקסט
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
