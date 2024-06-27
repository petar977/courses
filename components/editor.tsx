"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";


interface EditorProps{
    onChange: (value: string) => void;
    value: string;
}

export const Editor = ({
    onChange,
    value,
}: EditorProps) => {
    const Quill = useMemo(() => dynamic(() => import("react-quill"), {ssr: false}), [])
    return (
        <div className="bg-slate-500">
            <Quill theme="snow" value={value} onChange={onChange}/>
        </div>
    );
}