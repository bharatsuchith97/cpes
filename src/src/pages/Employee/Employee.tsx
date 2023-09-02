import React, { useEffect } from 'react'
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { getEmployee } from './redux/employeeSlice';
import { RootState } from '../../../store';
import { Card, Table } from 'antd';
import { IEvaluation } from '../EmployeeList/types/employeeListTypes';
import { getEmployees } from '../EmployeeList/redux/employeeListSlice';
import { Line } from '@ant-design/charts';


function Employee() {
    const dispatch = useAppDispatch();
    // const navigation = useNavigate();
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const desiredSegment = segments[segments.length - 1];
    const userString = localStorage.getItem('authDetails');
    const user = userString ? JSON.parse(userString) : null;
    const isAdmin = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") ? true : false;
    const userId = user?.uid;

    const { employee } = useAppSelector((state: RootState) => state.employee);
    const { employees } = useAppSelector((state: RootState) => state.employees);


    useEffect(() => {
        dispatch(getEmployee(desiredSegment))
        dispatch(getEmployees());
    }, [])

    const formatDate = (dateVal: string | number | Date) => {
        const date = new Date(dateVal);
        const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if needed
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (add 1 because months are zero-based) and pad with leading zero if needed
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }
    const dataSource = isAdmin ? employee?.evaluations?.map((evaluation: IEvaluation) => ({
        key: evaluation?.evaluationId,
        evaluationId: evaluation?.evaluationId,
        // employee: employees.filter((emp) => emp?.id === evaluation?.employeeId)[0]?.firstName,
        evaluationDate: formatDate(evaluation?.evaluationDate),
        projectName: evaluation?.projectName,
        technicalSkillsRating: evaluation?.technicalSkillsRating,
        communicationRating: evaluation?.communicationRating,
        problemSolvingRating: evaluation?.problemSolvingRating,
        teamworkRating: evaluation?.teamworkRating,
        teamLead: employees?.filter((emp) => emp?.id === evaluation?.teamLeadId)[0]?.firstName,
        overallRating: (evaluation?.technicalSkillsRating + evaluation?.communicationRating + evaluation?.problemSolvingRating + evaluation?.teamworkRating) / 40 * 100
    }))
        :
        employee?.evaluations?.filter((evalu) => evalu?.teamLeadId === userId)?.map((evaluation: IEvaluation) => ({
            key: evaluation?.evaluationId,
            evaluationId: evaluation?.evaluationId,
            // employee: employees.filter((emp) => emp?.id === evaluation?.employeeId)[0]?.firstName,
            evaluationDate: formatDate(evaluation?.evaluationDate),
            projectName: evaluation?.projectName,
            technicalSkillsRating: evaluation?.technicalSkillsRating,
            communicationRating: evaluation?.communicationRating,
            problemSolvingRating: evaluation?.problemSolvingRating,
            teamworkRating: evaluation?.teamworkRating,
            overallRating: `${(evaluation?.technicalSkillsRating + evaluation?.communicationRating + evaluation?.problemSolvingRating + evaluation?.teamworkRating) / 40 * 100}%`

        }))

    const columns = isAdmin ? [
        // { title: 'Employee', dataIndex: 'employee', key: 'employee' },
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
            // { title: 'Employee', dataIndex: 'employee', key: 'employee' },
            { title: 'Evaluation Date', dataIndex: 'evaluationDate', key: 'evaluationDate' },
            { title: 'Project', dataIndex: 'projectName', key: 'projectName' },
            { title: 'Technical Skill Rating', dataIndex: 'technicalSkillsRating', key: 'technicalSkillsRating' },
            { title: 'Communication Skill Rating', dataIndex: 'communicationRating', key: 'communicationRating' },
            { title: 'Problem Solving Rating', dataIndex: 'problemSolvingRating', key: 'problemSolvingRating' },
            { title: 'Team Work Rating', dataIndex: 'teamworkRating', key: 'teamworkRating' },
            { title: 'Overall Rating', dataIndex: 'overallRating', key: 'overallRating' },

        ]

    const technicalChartData = employee?.evaluations.map((item, key) => ({
        technicalSkillsRating: item.technicalSkillsRating,
        evaluation: key,
    }));
    const communicationChartData = employee?.evaluations.map((item, key) => ({
        communicationSkillsRating: item.communicationRating,
        evaluation: key,
    }));
    const problemChartData = employee?.evaluations.map((item, key) => ({
        problemSolvingSkillsRating: item.problemSolvingRating,
        evaluation: key,
    }));
    const teamworkChartData = employee?.evaluations.map((item, key) => ({
        teamworkSkillsRating: item.problemSolvingRating,
        evaluation: key,
    }));

    const technicalConfig = {
        data: technicalChartData,
        xField: 'evaluation',
        yField: 'technicalSkillsRating',
        xAxis: {
            title: { text: 'Evaluations' },
            label: null, // Set label to null to remove x-axis labels
            tickLine: null, // Set tickLine to null to remove x-axis tick lines
        },
        yAxis: { min: 0, max: 10, title: { text: 'Score' } },
        label: {
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        point: {
            size: 5,
            shape: 'circle',
            style: {
                fill: 'red',
            },
        },
    };
    const communicationConfig = {
        data: communicationChartData,
        xField: 'evaluation',
        yField: 'communicationSkillsRating',
        xAxis: {
            title: { text: 'Evaluations' },
            label: null, // Set label to null to remove x-axis labels
            tickLine: null, // Set tickLine to null to remove x-axis tick lines
        },
        yAxis: { min: 0, max: 10, title: { text: 'Score' } },
        label: {
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        point: {
            size: 5,
            shape: 'circle',
            style: {
                fill: 'green',
            },
        },
    };
    const problemConfig = {
        data: problemChartData,
        xField: 'evaluation',
        yField: 'problemSolvingSkillsRating',
        xAxis: {
            title: { text: 'Evaluations' },
            label: null, // Set label to null to remove x-axis labels
            tickLine: null, // Set tickLine to null to remove x-axis tick lines
        },
        yAxis: { min: 0, max: 10, title: { text: 'Score' } },
        label: {
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        point: {
            size: 5,
            shape: 'circle',
            style: {
                fill: 'blue',
            },
        },
    };
    const teamworkConfig = {
        data: teamworkChartData,
        xField: 'evaluation',
        yField: 'teamworkSkillsRating',
        xAxis: {
            title: { text: 'Evaluations' },
            label: null, // Set label to null to remove x-axis labels
            tickLine: null, // Set tickLine to null to remove x-axis tick lines
        },
        yAxis: { min: 0, max: 10, title: { text: 'Score' } },
        label: {
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        point: {
            size: 5,
            shape: 'circle',
            style: {
                fill: 'blue',
            },
        },
    };

    const totalTechnicalSkillsRating = employee?.evaluations.reduce((total, item) => total + item.technicalSkillsRating, 0);
    const totalCommunicationRating = employee?.evaluations.reduce((total, item) => total + item.communicationRating, 0);
    const totalProblemSolvingRating = employee?.evaluations.reduce((total, item) => total + item.problemSolvingRating, 0);
    const totalTeamworkRating = employee?.evaluations.reduce((total, item) => total + item.teamworkRating, 0);

    const count = employee?.evaluations.length;

    const averageTechnicalSkillsRating = (totalTechnicalSkillsRating*10 / count).toFixed(2);
    const averageCommunicationRating = (totalCommunicationRating*10 / count).toFixed(2);
    const averageProblemSolvingRating = (totalProblemSolvingRating*10 / count).toFixed(2);
    const averageTeamworkRating = (totalTeamworkRating*10 / count).toFixed(2);

    const averageRating = ((totalTechnicalSkillsRating+totalCommunicationRating+totalProblemSolvingRating+totalTeamworkRating)*10/(count*4)).toFixed(2)

    return (
        <FlexboxContainer alignItems="flex-start" flexDirection="column" gap="2.5rem">
            <FlexboxItem style={{ fontWeight: 500, fontSize: 20, border: "1px solid #5c1233", padding: "1rem", borderRadius: "8px", width: "100%", color: "white", backgroundColor: "#871b4c" }}>
                <FlexboxContainer flexDirection="column" gap="1.5rem" alignItems="flex-start">
                    <FlexboxItem style={{ width: "100%" }}>{employee?.firstName} {employee?.lastName}</FlexboxItem>
                    <FlexboxItem style={{ width: "100%", fontWeight: "400", fontSize: 16 }}>{employee?.email}</FlexboxItem>
                    <FlexboxItem style={{ width: "100%" }}>
                        <FlexboxContainer justifyContent="space-around" style={{ width: "100%" }}>
                            <FlexboxItem style={{width:"19%"}}>
                                <Card title={<span style={{ fontWeight: 500, fontSize: 16 }}>Technical Rating</span>} bordered={true}>
                                    <FlexboxItem style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: 24, color: "#871b4c" }}>{averageTechnicalSkillsRating}%</FlexboxItem>
                                </Card>
                            </FlexboxItem>
                            <FlexboxItem style={{width:"19%"}}>
                                <Card title={<span style={{ fontWeight: 500, fontSize: 16 }}>Problem Solving Rating</span>} bordered={true}>
                                    <FlexboxItem style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: 24, color: "#871b4c" }}>{averageProblemSolvingRating}%</FlexboxItem>
                                </Card>
                            </FlexboxItem>
                            <FlexboxItem style={{width:"19%"}}>
                                <Card title={<span style={{ fontWeight: 500, fontSize: 16 }}>Communication Rating</span>} bordered={true}>
                                    <FlexboxItem style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: 24, color: "#871b4c" }}>{averageCommunicationRating}%</FlexboxItem>
                                </Card>
                            </FlexboxItem>
                            <FlexboxItem style={{width:"19%"}}>
                                <Card title={<span style={{ fontWeight: 500, fontSize: 16 }}>Team Work Rating</span>} bordered={true}>
                                    <FlexboxItem style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: 24, color: "#871b4c" }}>{averageTeamworkRating}%</FlexboxItem>
                                </Card>
                            </FlexboxItem>
                            <FlexboxItem style={{width:"19%"}}>
                                <Card title={<span style={{ fontWeight: 500, fontSize: 16 }}>Overall Employee Rating</span>} bordered={true}>
                                    <FlexboxItem style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: 24, color: "#871b4c" }}>{averageRating}%</FlexboxItem>
                                </Card>
                            </FlexboxItem>
                        </FlexboxContainer>
                    </FlexboxItem>
                </FlexboxContainer>
            </FlexboxItem>
            <FlexboxItem style={{ width: "100%" }}>
                <FlexboxContainer flexDirection="column" gap="1rem" alignItems="flex-start">
                    <FlexboxItem style={{ width: "100%" }}>
                        <FlexboxContainer autoFlow="column" style={{ width: "100%" }} justifyContent="space-between" alignItems="flex-start">
                            <FlexboxItem style={{ width: "49%", border: "1px solid #5c1233", padding: "0.625rem", borderRadius: "8px" }}>
                                <Card title={<span style={{ fontWeight: 500, fontSize: 20 }}>Technical Rating Trend</span>} bordered={false}>
                                    <div style={{ height: '300px' }}>

                                        <Line {...technicalConfig} />
                                    </div>
                                </Card>
                            </FlexboxItem>
                            <FlexboxItem style={{ width: "49%", border: "1px solid #5c1233", padding: "0.625rem", borderRadius: "8px" }}>
                                <Card title={<span style={{ fontWeight: 500, fontSize: 20 }}>Problem Solving Rating Trend</span>} bordered={false}>
                                    <div style={{ height: '300px' }}>

                                        <Line {...problemConfig} />
                                    </div>
                                </Card>
                            </FlexboxItem>
                        </FlexboxContainer>
                    </FlexboxItem>
                    <FlexboxItem style={{ width: "100%" }}>
                        <FlexboxContainer autoFlow="column" style={{ width: "100%" }} justifyContent="space-between" alignItems="flex-start">
                            <FlexboxItem style={{ width: "49%", border: "1px solid #5c1233", padding: "0.625rem", borderRadius: "8px" }}>
                                <Card title={<span style={{ fontWeight: 500, fontSize: 20 }}>Communication Rating Trend</span>} bordered={false}>
                                    <div style={{ height: '300px' }}>

                                        <Line {...communicationConfig} />
                                    </div>
                                </Card>
                            </FlexboxItem>
                            <FlexboxItem style={{ width: "49%", border: "1px solid #5c1233", padding: "0.625rem", borderRadius: "8px" }}>
                                <Card title={<span style={{ fontWeight: 500, fontSize: 20 }}>Team Work Rating Trend</span>} bordered={false}>
                                    <div style={{ height: '300px' }}>

                                        <Line {...teamworkConfig} />
                                    </div>
                                </Card>
                            </FlexboxItem>
                        </FlexboxContainer>
                    </FlexboxItem>
                    <FlexboxItem style={{ width: "100%", padding: "0.625rem", border: "1px solid #5c1233", borderRadius: "8px" }}>
                        <Card title={<span style={{ fontWeight: 500, fontSize: 20 }}>Evaluations</span>} bordered={false}>
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                // pagination={10}
                                scroll={{ y: '450px' }}
                            />
                        </Card>
                    </FlexboxItem>
                </FlexboxContainer>
            </FlexboxItem>
        </FlexboxContainer>
    )
}

export default Employee