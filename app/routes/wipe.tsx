import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';
import Navbar from '~/components/Navbar';
import { Footer } from '~/components/footer';

export const meta = () => [
    { title: 'Resumai - Data Management' },
    {
        name: 'description',
        content: 'Manage your application data and storage.',
    },
];

const WipeApp = () => {
    const { auth, isLoading, error, fs, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const loadFiles = async () => {
        const files = (await fs.readDir('./')) as FSItem[];
        setFiles(files || []);
    };

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate('/auth?next=/wipe');
        }
    }, [isLoading, auth.isAuthenticated, navigate]);

    useEffect(() => {
        if (auth.isAuthenticated) {
            loadFiles();
        }
    }, [auth.isAuthenticated]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            // Delete all files
            for (const file of files) {
                await fs.delete(file.path);
            }
            // Flush KV store
            await kv.flush();
            await loadFiles();
            setShowConfirm(false);
        } catch (err) {
            console.error('Error deleting data:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="Loading" />
                    <p className="text-blueprint-text-muted">Loading...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-red-600 font-semibold mb-2">Error</h2>
                    <p className="text-blueprint-text-muted">{error}</p>
                </div>
            </main>
        );
    }

    if (!auth.isAuthenticated) {
        return null;
    }

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            <section className="main-section flex-1">
                <div className="page-heading py-16">
                    <div className="breadcrumb mb-4">
                        <Link to="/" className="breadcrumb-link">Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">Data Management</span>
                    </div>
                    <h1>Data Management</h1>
                    <h2>View and manage your application data</h2>
                </div>

                <div className="w-full max-w-4xl mx-auto px-4">
                    {/* User Info Card */}
                    <div className="bg-white rounded-xl border-2 border-blueprint-line p-6 mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-blueprint-accent flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">
                                    {auth.user?.username?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-blueprint-text-muted font-semibold mb-1">
                                    Authenticated as
                                </p>
                                <p className="text-lg font-semibold text-blueprint-text">
                                    {auth.user?.username}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Files List Card */}
                    <div className="bg-white rounded-xl border-2 border-blueprint-line p-6 mb-6">
                        <h3 className="text-lg font-semibold text-blueprint-text mb-4">
                            Stored Files ({files.length})
                        </h3>
                        {files.length > 0 ? (
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {files.map((file) => (
                                    <div
                                        key={file.id}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-blueprint-line hover:bg-blueprint-paper transition-colors"
                                    >
                                        <img
                                            src={file.name.endsWith('.pdf') ? '/images/pdf.png' : '/icons/info.svg'}
                                            alt="File"
                                            className="w-8 h-8"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-blueprint-text truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-blueprint-text-muted">
                                                {(file.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <img
                                    src="/icons/info.svg"
                                    alt="No files"
                                    className="w-16 h-16 mx-auto mb-3 opacity-50"
                                />
                                <p className="text-blueprint-text-muted">No files stored yet</p>
                            </div>
                        )}
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white rounded-xl border-2 border-red-200 p-6">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-red-600 font-bold text-lg">!</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
                                <p className="text-sm text-gray-600 mb-1">
                                    This will permanently delete all your application data including:
                                </p>
                                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 mb-4">
                                    <li>All uploaded resume files ({files.length} files)</li>
                                    <li>All resume analysis data</li>
                                    <li>All stored feedback and scores</li>
                                </ul>
                                <p className="text-sm font-semibold text-red-600">
                                    This action cannot be undone!
                                </p>
                            </div>
                        </div>

                        {!showConfirm ? (
                            <button
                                className="btn-danger btn-md"
                                onClick={() => setShowConfirm(true)}
                                disabled={files.length === 0}
                            >
                                Wipe All Data
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    className="btn-danger btn-md"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Deleting...' : 'Yes, Delete Everything'}
                                </button>
                                <button
                                    className="btn-secondary btn-md"
                                    onClick={() => setShowConfirm(false)}
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Back Button */}
                    <div className="mt-8 flex justify-center">
                        <Link to="/" className="back-button">
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default WipeApp;
