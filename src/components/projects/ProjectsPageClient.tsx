"use client";

import { useEffect, useState } from "react";
import ProjectsGrid from "./ProjectsGrid";
import { getProjects } from "@/lib/api/client";
import { transformProjects } from "@/lib/api/transformers";
import { projects as staticProjects } from "@/data/project";

export default function ProjectsPageClient() {
  const [projects, setProjects] = useState(staticProjects);

  useEffect(() => {
    getProjects()
      .then((data) => { if (data.length > 0) setProjects(transformProjects(data)); })
      .catch(() => {});
  }, []);

  return <ProjectsGrid projects={projects} />;
}
