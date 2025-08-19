import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '~/lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0] || null;

            onFileSelect?.(file);
        },
        [onFileSelect]
    );

    const maxFileSize = 20 * 1024 * 1024; // 20MB

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxSize: maxFileSize, // 20MB
    });

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div
                            className="uploader-selected-file"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <img src="/images/pdf.png" alt="PDF Icon" className="size-10" />
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-gray-800 truncate max-w-xs">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src="/icons/check.svg" alt="Success" className="w-5 h-5" />
                                    <span className="text-sm font-medium text-green-600">
                                        Uploaded
                                    </span>
                                </div>
                            </div>
                            <button
                                className="p-3 cursor-pointer"
                                onClick={(e) => {
                                    onFileSelect?.(null);
                                }}
                            >
                                <img src="/icons/cross.svg" alt="Remove" className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="Info Icon" className="size-20" />
                            </div>
                            <p className="text-lg text-gray-500">
                                <span className="font-semibold"> Click to Upload</span> or drag &
                                drop
                            </p>
                            <p className="text-lg text-gray-500">
                                {' '}
                                PDF (max {formatSize(maxFileSize)})
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
