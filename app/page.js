"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchRecentGitHubProjects } from './services/github';
import ProjectCard from './components/ProjectCard';
import LanguageFilter from './components/LanguageFilter';
import TopicFilter from './components/TopicFilter';

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState('');
    const [topic, setTopic] = useState('');
    const router = useRouter();

    const loadRecentProjects = async () => {
        setLoading(true);
        const recentProjects = await fetchRecentGitHubProjects();
        setProjects(recentProjects);
        setLoading(false);
    };

    useEffect(() => {
        loadRecentProjects();

        // Refresh every 5 minutes to get the most recent updates
        const interval = setInterval(() => {
            loadRecentProjects();
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    const handleFilter = () => {
        const query = new URLSearchParams({ language, topic }).toString();
        router.push(`/search?${query}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Welcome to GitHub Open Source Explorer</h1>
            <p>Discover the most recent open source projects on GitHub!</p>

            <div className="my-4">
                <LanguageFilter onFilter={setLanguage} />
                <TopicFilter onFilter={setTopic} />
                <button onClick={handleFilter} className="bg-blue-500 text-white p-2 mt-2">
                    Search
                </button>
            </div>

            <h2 className="text-2xl font-bold">10 Most Recently Updated Repositories</h2>
            <div>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
}


