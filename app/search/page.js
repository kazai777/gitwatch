"use client";

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchGitHubProjects } from '../services/github';
import { Card, Skeleton, Spinner, Button } from "@nextui-org/react";
import ProjectCard from '../components/ProjectCard';
import LanguageFilter from '../components/LanguageFilter';
import TopicFilter from '../components/TopicFilter';
import { SearchIcon } from '../components/SearchIcon';

function Projects({ language, topic, page, setProjects, setLoading, setInitialLoading, projects }) {
  useEffect(() => {
    const loadProjects = async () => {
      if (page === 1) {
        setInitialLoading(true);
      } else {
        setLoading(true);
      }
      const newProjects = await fetchGitHubProjects(page, language, topic);
      setProjects((prevProjects) => (page === 1 ? newProjects : [...prevProjects, ...newProjects]));
      setLoading(false);
      setInitialLoading(false);
    };
    loadProjects();
  }, [page, language, topic, setInitialLoading, setLoading, setProjects]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function SearchParamsWrapper({ setLanguage, setTopic, children }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialLanguage = searchParams.get('language') || '';
    const initialTopic = searchParams.get('topic') || '';
    setLanguage(initialLanguage);
    setTopic(initialTopic);
  }, [searchParams, setLanguage, setTopic]);

  return children;
}

export default function Search() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [language, setLanguage] = useState('');
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const handleScroll = useCallback(() => {
    if (loading) return;
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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

  const handleFilter = () => {
    const query = new URLSearchParams({ language, topic }).toString();
    router.push(`/search?${query}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Search GitHub Open Source Projects</h1>
      <div className="flex justify-center mb-8">
        <LanguageFilter onFilter={handleLanguageFilter} initialValue={language} />
        <TopicFilter onFilter={handleTopicFilter} initialValue={topic} />
        <Button onClick={handleFilter} className="p-4 ml-4 mt-2" variant="flat"
          endContent={<SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />} 
        >
          Search
        </Button>
      </div>
      <Suspense fallback={<div>Loading search parameters...</div>}>
        <SearchParamsWrapper setLanguage={setLanguage} setTopic={setTopic}>
          <Projects
            language={language}
            topic={topic}
            page={page}
            setProjects={setProjects}
            setLoading={setLoading}
            setInitialLoading={setInitialLoading}
            projects={projects}
          />
        </SearchParamsWrapper>
      </Suspense>
      {initialLoading && (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} className="w-full sm:w-[600px] space-y-5 p-4" radius="lg">
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-full rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      {loading && <div className="flex justify-center mt-8"><Spinner color="secondary" /></div>}
    </div>
  );
}
