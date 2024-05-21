import React from "react";
import Link from "next/link";
import { Card, CardBody, Image, Button } from "@nextui-org/react";

export default function ProjectCard({ project }) {

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Owner avatar"
              className="object-cover"
              height={200}
              shadow="md"
              src={project.owner.avatar_url}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{project.name}</h3>
                <p className="text-small text-foreground/80">{project.language}</p>
                <p className="text-small text-foreground/80 mt-2">{project.description}</p>
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <p className="text-small">Stars: {project.stargazers_count}</p>
              <p className="text-small">Forks: {project.forks_count}</p>
              <Link href={project.html_url} passHref>
                <Button as="a" target="_blank" variant="flat" color="secondary">
                  View Repo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
