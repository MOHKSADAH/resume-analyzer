import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '~/lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0] || null;
            setSelectedFile(file);
            onFileSelect?.(file);
        },
        [onFileSelect]
    );

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null);
        onFileSelect?.(null);
    };

    const maxFileSize = 20 * 1024 * 1024; // 20MB

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxSize: maxFileSize, // 20MB
    });

    const file = selectedFile;

    return (
        <div className="w-full">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="space-y-4">
                    {file ? (
                        <div
                            className="uploader-selected-file flex-col gap-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <img src="/images/pdf.png" alt="PDF Icon" className="size-10" />
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-[10px] font-semibold tracking-wider text-blueprint-accent uppercase mb-1">
                                        FILE
                                    </span>
                                    <p className="text-sm font-semibold text-blueprint-text truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-blueprint-text-muted font-medium">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full gap-3">
                                <div className="flex items-center gap-2">
                                    <img src="/icons/check.svg" alt="Success" className="w-5 h-5" />
                                    <span className="text-sm font-semibold text-green-600">
                                        Uploaded!
                                    </span>
                                </div>
                                <button
                                    className="btn-secondary btn-sm"
                                    onClick={handleRemove}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`uplader-drag-area ${
                                isDragActive ? 'border-blueprint-accent bg-blueprint-paper' : ''
                            }`}
                        >
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="Info Icon" className="size-20" />
                            </div>
                            <p className="text-lg text-blueprint-text-muted">
                                <span className="font-semibold text-blueprint-accent">
                                    {' '}
                                    Click to Upload
                                </span>{' '}
                                or drag & drop
                            </p>
                            <p className="text-sm text-blueprint-text-muted font-medium mt-2">
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
