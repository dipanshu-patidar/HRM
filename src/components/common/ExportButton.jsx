import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, FileText, FileSpreadsheet } from 'lucide-react';

const ExportButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDownload = (type) => {
        // Mock download functionality
        console.log(`Downloading ${type}...`);

        // Create a dummy link to simulate download
        const element = document.createElement("a");
        const file = new Blob([`This is a sample ${type} file content`], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `export.${type.toLowerCase() === 'excel' ? 'xlsx' : 'pdf'}`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);

        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm"
            >
                <Download size={16} />
                Export
                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <button
                        onClick={() => handleDownload('PDF')}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-50 flex items-center gap-2"
                    >
                        <FileText size={16} className="text-red-500" />
                        PDF
                    </button>
                    <button
                        onClick={() => handleDownload('Excel')}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <FileSpreadsheet size={16} className="text-green-500" />
                        Excel
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExportButton;
