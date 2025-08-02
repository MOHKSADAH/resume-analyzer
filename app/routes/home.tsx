import { resumes } from '../../constants';
import type { Route } from './+types/home';
import Navbar from '~/components/Navbar';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Resumai' },
        { name: 'description', content: 'Smart feedback for your desired jobs.' },
    ];
}

export default function Home() {
    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading">
                    <h1>Track Your Applications & Resume Ratings</h1>
                    <h2>Review your submissions and check AI_powered feedback.</h2>
                </div>
            </section>
            {resumes.map((resume) => (
                <div>
                    <h1>{resume.jobTitle}</h1>
                </div>
            ))}
        </main>
    );
}
