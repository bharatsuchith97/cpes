export interface ITeam {
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
    teamId: number;
    isTeamLead: boolean;
    isAdmin: boolean;
    teamLeadId: string;
    evaluations:Array<IEvaluation>;
   
}
export interface IEvaluation{
    evaluationId: number;
    employeeId: string;
    evaluationDate: Date;
    projectName: string;
    technicalSkillsRating: number;
    communicationRating: number;
    problemSolvingRating: number;
    teamworkRating: number;
    comments: string;
    createdBy:string;
    teamLeadId: string;
}