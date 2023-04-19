import Project from "./Project";
import UUID from "../UUID";

export default interface ProjectRepository<Id> {
    // Get all projects.
    GetAll(): Promise<Array<Project>>

    // Get a single project by its ID.
    GetById: (id: UUID) => Promise<Project | null>;
}