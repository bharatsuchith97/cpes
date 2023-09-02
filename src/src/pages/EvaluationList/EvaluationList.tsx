import { Table } from 'antd';
import React, { useEffect } from 'react'
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import { getEmployees, getEvaluations, getTeams } from './redux/evaluationListSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IEvaluation } from '../EmployeeList/types/employeeListTypes';
import { RootState } from '../../../store';

function EvaluationList() {
    const dispatch = useAppDispatch();
    const userString = localStorage.getItem('authDetails');
    const user = userString ? JSON.parse(userString) : null;
    const isAdmin = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") ? true : false;
    const userId = user?.uid;

    const { employees, teams, evaluations } = useAppSelector((state: RootState) => state.evaluations);


    useEffect(() => {
        dispatch(getEvaluations());
        dispatch(getEmployees());
        dispatch(getTeams());

    }, []);

    const formatDate = (dateVal: string | number | Date) => {
        const date = new Date(dateVal);
        const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if needed
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (add 1 because months are zero-based) and pad with leading zero if needed
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    const dataSource = isAdmin ? evaluations?.map((evaluation: IEvaluation) => ({
        key: evaluation?.evaluationId,
        evaluationId: evaluation?.evaluationId,
        employee: employees.filter((emp)=>emp?.id === evaluation?.employeeId)[0]?.firstName,
        evaluationDate: formatDate(evaluation?.evaluationDate),
        projectName: evaluation?.projectName,
        technicalSkillsRating: evaluation?.technicalSkillsRating,
        communicationRating: evaluation?.communicationRating,
        problemSolvingRating: evaluation?.problemSolvingRating,
        teamworkRating: evaluation?.teamworkRating,
        teamLead: employees?.filter((emp)=>emp?.id === evaluation?.teamLeadId)[0]?.firstName,
        overallRating: (evaluation?.technicalSkillsRating+evaluation?.communicationRating+evaluation?.problemSolvingRating+evaluation?.teamworkRating)/40*100
    }))
        :
        evaluations?.filter((evalu) => evalu?.teamLeadId === userId)?.map((evaluation: IEvaluation) => ({
            key: evaluation?.evaluationId,
            evaluationId: evaluation?.evaluationId,
            employee: employees.filter((emp)=>emp?.id === evaluation?.employeeId)[0]?.firstName,
            evaluationDate: formatDate(evaluation?.evaluationDate),
            projectName: evaluation?.projectName,
            technicalSkillsRating: evaluation?.technicalSkillsRating,
            communicationRating: evaluation?.communicationRating,
            problemSolvingRating: evaluation?.problemSolvingRating,
            teamworkRating: evaluation?.teamworkRating,
            overallRating: `${(evaluation?.technicalSkillsRating+evaluation?.communicationRating+evaluation?.problemSolvingRating+evaluation?.teamworkRating)/40*100}%`

        }))

    const columns = isAdmin ? [
        { title: 'Employee', dataIndex: 'employee', key: 'employee' },
        { title: 'Evaluation Date', dataIndex: 'evaluationDate', key: 'evaluationDate' },
        { title: 'Project', dataIndex: 'projectName', key: 'projectName' },
        { title: 'Team Lead', dataIndex: 'teamLead', key: 'teamLead' },
        { title: 'Technical Skill Rating', dataIndex: 'technicalSkillsRating', key: 'technicalSkillsRating' },
        { title: 'Communication Skill Rating', dataIndex: 'communicationRating', key: 'communicationRating' },
        { title: 'Problem Solving Rating', dataIndex: 'problemSolvingRating', key: 'problemSolvingRating' },
        { title: 'Team Work Rating', dataIndex: 'teamworkRating', key: 'teamworkRating' },
        { title: 'Overall Rating', dataIndex: 'overallRating', key: 'overallRating' },

    ]
    :
    [
        { title: 'Employee', dataIndex: 'employee', key: 'employee' },
        { title: 'Evaluation Date', dataIndex: 'evaluationDate', key: 'evaluationDate' },
        { title: 'Project', dataIndex: 'projectName', key: 'projectName' },
        { title: 'Technical Skill Rating', dataIndex: 'technicalSkillsRating', key: 'technicalSkillsRating' },
        { title: 'Communication Skill Rating', dataIndex: 'communicationRating', key: 'communicationRating' },
        { title: 'Problem Solving Rating', dataIndex: 'problemSolvingRating', key: 'problemSolvingRating' },
        { title: 'Team Work Rating', dataIndex: 'teamworkRating', key: 'teamworkRating' },
        { title: 'Overall Rating', dataIndex: 'overallRating', key: 'overallRating' },

    ]

    return (
        <FlexboxContainer flexDirection="column" alignItems="flex-start" gap="2.5rem">
            <FlexboxItem style={{ fontWeight: 500, fontSize: 20 }}>Evaluations</FlexboxItem>

            <FlexboxItem style={{ width: "100%", height: 'calc(100vh - 12rem)' }}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '400px' }}
                />
            </FlexboxItem>
        </FlexboxContainer>
    )
}

export default EvaluationList