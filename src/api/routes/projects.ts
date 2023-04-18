import { Router } from "express";
import UUID from "../../domain/UUID";
import ProjectRepository from "../../domain/projects/ProjectRepository";

export default function ProjectRoutes(projectRepository: ProjectRepository<UUID>) {
    const router = Router();

    router.get("/", async (req, res) => {
        const projects = await projectRepository.GetAll();
        return res.status(200).json(projects.map(project => project.ToJSON()));
    });

    return router;
}