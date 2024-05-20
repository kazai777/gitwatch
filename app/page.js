"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchRecentGitHubProjects } from './services/github';
import { Card, Skeleton } from "@nextui-org/react";
import ProjectCard from './components/ProjectCard';
import LanguageFilter from './components/LanguageFilter';
import TopicFilter from './components/TopicFilter';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('');
  const [topic, setTopic] = useState('');
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();

  const loadRecentProjects = async () => {
    setLoading(true);
    const recentProjects = await fetchRecentGitHubProjects();
    setProjects(recentProjects);
    setLoading(false);
    setCountdown(60);
  };

  useEffect(() => {
    loadRecentProjects();

    // Refresh every minute to get the most recent updates
    const interval = setInterval(() => {
      loadRecentProjects();
    }, 60000);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountDown) => {
        if (prevCountDown === 0) {
          return 60;
        }
        return prevCountDown - 1;
      
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    }; 
  }, []);

  const handleFilter = () => {
    const query = new URLSearchParams({ language, topic }).toString();
    router.push(`/search?${query}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Heroes Section */}
      <section className="bg-blue-500 text-white py-12 rounded-md mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to GitWatch</h1>
          <p className="mb-8">Discover and contribute to the most recent and popular open source projects on GitHub.</p>
          <button onClick={handleFilter} className="bg-white text-blue-500 font-bold py-2 px-4 rounded-lg">
            Start Exploring
          </button>
        </div>
      </section>
      <div className="flex justify-center mb-8">
        <LanguageFilter onFilter={setLanguage} />
        <TopicFilter onFilter={setTopic} />
        <button onClick={handleFilter} className="bg-blue-500 text-white p-2 ml-2 rounded-lg">
          Search
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Most Recently Updated Repositories</h2>
      <div className="text-center mb-4">
        <p className='countdown'>
          Next update in: {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? `0${countdown % 60}` : countdown % 60}
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="w-[400px] space-y-5 p-4" radius="lg">
                  <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </div>
                </Card>
              ))
            : projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
        </div>
      </div>
    </div>
  );
}
