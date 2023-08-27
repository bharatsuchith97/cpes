export interface ITeam {
    teamName: string;
    teamLeadId: number;
    teamMemberIds: Array<string>;
    teamId: number;
}
export interface ITeamLead {
    teamName: string;
    teamLeadId: number;
    teamMemberIds: Array<string>;
    teamId: number;
}
export interface IEmployee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}