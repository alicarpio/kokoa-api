import { Client } from "pg";
import ProjectRepository from "./ProjectRepository";
import UUID from "../UUID";
import Project from "./Project";

export default class PgProjectRepository implements ProjectRepository<UUID> {
    constructor(private db: Client) {}

    async GetAll(): Promise<Project[]> {
        return await this.db
            .query(
                `
        select id, name, area, description, github
          from projects
        `
            )
            .then(result => result.rows)
            .then(
                rows =>
                    rows.map(row =>
                        Project.Create(
                            UUID.FromString(row.id) as UUID,
                            row.name,
                            row.area,
                            row.membersList,
                            row.description,
                            row.github
                        )
                    ) as Project[]
            );
    }
}

