import UUID from "../UUID";
import ToJSON from "../ToJSON";

export type ProjectKind = 'ELECTRONICA' | 'SISTEMAS' | 'WEB' | 'MOVIL';

export default class Project extends ToJSON {
    private constructor(
        public readonly id: UUID,
        public readonly name: string,
        public readonly area: ProjectKind,
        public readonly description: string,
        public readonly github: string,
    ) {
        super();
    }

    static Create(
        id: UUID,
        name: string,
        area: ProjectKind,
        description: string,
        github: string,
    ) {
        return new Project(id, name, area, description, github);
    }
}