import Project from "./Project";

export default interface ProjectRepository<Id> {
    GetAll(): Promise<Array<Project>>;
}