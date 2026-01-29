export class TeamsModel {
    id: number;
    name: string;
   created_at: string; 
    members_count: number;
}
export class NameTeamModel {
    name: string;
}
export class AddMemberModel {
    userId: number;
    role: string;
}