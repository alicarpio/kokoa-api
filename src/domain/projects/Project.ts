import UUID from "../UUID";
import ToJSON from "../ToJSON";

export type ProjectKind = 'ELECTRONICA' | 'SISTEMAS' | 'WEB' | 'MOVIL';

export default class Project extends ToJSON {
    private constructor(
        public readonly id: UUID,
        public readonly name: string,
        public readonly area: string,
        public readonly kind: ProjectKind,
        public readonly projectDate: Date,
        public readonly description: string,
        public readonly technologies: string,
        public readonly github: string,
    ) {
        super();
    }

    static Create(
        id: UUID,
        name: string,
        area: string,
        kind: ProjectKind,
        projectDate: Date,
        description: string,
        technologies: string,
        github: string,
    ) {
        return new Project(id, name, area, kind, projectDate, description, technologies, github);
    }
}