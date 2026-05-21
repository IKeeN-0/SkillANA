'use client';
import { jwtDecode } from "jwt-decode";
import { useState, useContext, createContext, ReactNode } from "react";

// --- Interfaces ---
export interface Experience {
    _id? : string;
    id: number;
    title: string;
    startDate: string | Date;
    endDate: string | Date;
    description: string;
}

export interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    profileImg : string;
    contact: {
  
        phoneNumber: string;
        address: string;
    },
    education: {
        level: string;
        major: string;
        university: string;
    },
    aboutMe: string;
    experience: Experience[];
}
const getExpId = (exp: Experience) => String(exp._id ?? exp.id);

// --- Context ---
interface EditContextType {
    isEdit: boolean;
    setEditing: (val: boolean) => void;
    liveData: ProfileData;
    tempData: ProfileData;
    updateTempField: (field: keyof ProfileData, value: any) => void;
    updateNestedField: (section: 'contact' | 'education', field: string, value: string) => void;
    updateExperience: (id: any, field: keyof Experience, value: any) => void;
    addExperience: () => void;
    removeExperience: (id: any) => void;
    saveData: () => Promise<void>;
    reset: () => void;
}

const editContext = createContext<EditContextType>({} as EditContextType);

// --- Provider ---
export const EditProvider = ({ children, initialData }: { children: ReactNode, initialData: ProfileData }) => {
    const [isEdit, setIsEdit] = useState(false);

    
    const ensureDefaultExp = (data: ProfileData): ProfileData => {
    
    const cleaned = (data.experience || []).filter(exp =>
        exp.title?.trim() ||
        exp.startDate ||
        exp.endDate ||
        exp.description?.trim()
    );

    
    if (cleaned.length === 0) {
        return {
            ...data,
            experience: [{
                id: Date.now(),
                title: "",
                startDate: "",
                endDate: "",
                description: ""
            }]
        };
    }

    return {
        ...data,
        experience: cleaned
    };
};

    const [liveData, setLiveData] = useState<ProfileData>(ensureDefaultExp(initialData));
    const [tempData, setTempData] = useState<ProfileData>(ensureDefaultExp(initialData));
    const updateTempField = (field: keyof ProfileData, value: any) => {
        setTempData(prev => ({ ...prev, [field]: value }));
        setIsEdit(true);
    };

    const updateNestedField = (section: 'contact' | 'education', field: string, value: string) => {
        setTempData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
        setIsEdit(true);
    };

    const updateExperience = (id: any, field: keyof Experience, value: any) => {
        const targetId = String(id);

        setTempData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                getExpId(exp) === targetId
                    ? { ...exp, [field]: value }
                    : exp
            )
        }));

        setIsEdit(true);
    };


    const addExperience = () => {
    setTempData(prev => {
       
        const realExpCount = prev.experience.filter(exp => 
           exp.title?.trim() || exp.description?.trim() || (exp.id && !exp._id)
        ).length;

        if (realExpCount >= 5) return prev;
        
        const newExp: Experience = {
            id: Date.now(), 
            title: "",
            startDate: "",
            endDate: "",
            description: ""
        };

        return { ...prev, experience: [...prev.experience, newExp] };
    });
    setIsEdit(true);
};

    const removeExperience = (id: any) => {
        const targetId = String(id);

        setTempData(prev => {
            if (prev.experience.length <= 1) return prev;

            const filtered = prev.experience.filter(exp =>
                getExpId(exp) !== targetId
            );

            return { ...prev, experience: filtered };
        });

        setIsEdit(true);
    };
    const saveData = async () => {
    try {
        const token = localStorage.getItem("token");
        
        
        const decoded = jwtDecode(token!) as { id: string };
        const userId = decoded.id;

        
        const res = await fetch(`/api/users/${userId}`, {
            method: "PUT", 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(tempData) 
        });
        
        if (res.ok) {
            const updatedData = await res.json();
            console.log("Database updated successfully!");
            
            
            setLiveData(tempData);
            setIsEdit(false);
        } else {
            console.error("Failed to save to database");
        }
    } catch (error) {
        console.error("Save Error:", error);
    }
};

    const reset = () => {
        setTempData(liveData);
        setIsEdit(false);
    };

    return (
        <editContext.Provider value={{ 
            isEdit, 
            setEditing: setIsEdit, 
            liveData, 
            tempData, 
            updateTempField, 
            updateNestedField, 
            updateExperience,
            addExperience,
            removeExperience,
            saveData, 
            reset 
        }}>
            {children}
        </editContext.Provider>
    );
}

export const useEditContext = () => useContext(editContext);