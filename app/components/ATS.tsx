import React from 'react';

interface ATSProps {
    score: number;
    suggestions: { type: 'good' | 'improve'; tip: string }[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    // Determine gradient background based on score
    const gradientClass =
        score > 69 ? 'from-green-100' : score > 49 ? 'from-yellow-100' : 'from-red-100';

    // Determine icon based on score
    const iconSrc =
        score > 69
            ? '/icons/ats-good.svg'
            : score > 49
              ? '/icons/ats-warning.svg'
              : '/icons/ats-bad.svg';

    return (
        <div
            className={`bg-gradient-to-br ${gradientClass} to-white rounded-2xl shadow-md p-6 w-full`}
        >
            {/* Top section with icon and headline */}
            <div className="flex items-center gap-4 mb-6">
                <img src={iconSrc} alt="ATS Icon" className="w-12 h-12" />
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">ATS Score – {score}/100</h3>
                </div>
            </div>

            {/* Description section */}
            <div className="mb-6">
                <p className="text-gray-600 mb-4">
                    This score reflects how well your resume performs with Applicant Tracking
                    Systems (ATS). Higher scores mean better chances of passing initial automated
                    screenings.
                </p>

                {/* Suggestions list */}
                {suggestions.length > 0 && (
                    <div className="space-y-3">
                        {suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <img
                                    src={
                                        suggestion.type === 'good'
                                            ? '/icons/check.svg'
                                            : '/icons/warning.svg'
                                    }
                                    alt={suggestion.type === 'good' ? 'Good' : 'Improve'}
                                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                                />
                                <p className="text-gray-700 text-sm">{suggestion.tip}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Closing encouragement */}
            <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-600 text-sm font-medium">
                    Keep improving your resume to increase your ATS compatibility and job prospects!
                </p>
            </div>
        </div>
    );
};

export default ATS;
