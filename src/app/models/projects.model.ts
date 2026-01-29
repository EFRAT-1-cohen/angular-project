export class ProjectModel {
    id: number;
    team_id: number;
    name: string; 
    description: string;
    status: string;
    created_at: string;
}
export class CreateProjectModel {
    teamId: number;
    name: string;
    description: string;
}