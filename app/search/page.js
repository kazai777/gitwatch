"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchGitHubProjects } from '../services/github';
import ProjectCard from '../components/ProjectCard';
import LanguageFilter from '../components/LanguageFilter';
import TopicFilter from '../components/TopicFilter';

export default function Search() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial search parameters from URL
  useEffect(() => {
    const initialLanguage = searchParams.get('language') || '';
    const initialTopic = searchParams.get('topic') || '';
    setLanguage(initialLanguage);
    setTopic(initialTopic);
  }, [searchParams]);

  const [language, setLanguage] = useState(searchParams.get('language') || '');
  const [topic, setTopic] = useState(searchParams.get('topic') || '');

  // Fetch projects when search parameters or page change
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const newProjects = await fetchGitHubProjects(page, language, topic);
      setProjects((prevProjects) => (page === 1 ? newProjects : [...prevProjects, ...newProjects]));
      setLoading(false);
    };
    loadProjects();
  }, [page, language, topic]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageFilter = (lang) => {
    setLanguage(lang);
    setPage(1);
    const query = new URLSearchParams({ language: lang, topic }).toString();
    router.push(`/search?${query}`);
  };

  const handleTopicFilter = (top) => {
    setTopic(top);
    setPage(1);
    const query = new URLSearchParams({ language, topic: top }).toString();
    router.push(`/search?${query}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Search GitHub Open Source Projects</h1>
      <div className="my-4">
        <LanguageFilter onFilter={handleLanguageFilter} initialValue={language} />
        <TopicFilter onFilter={handleTopicFilter} initialValue={topic} />
      </div>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {loading && <p>Loading more projects...</p>}
    </div>
  );
}
