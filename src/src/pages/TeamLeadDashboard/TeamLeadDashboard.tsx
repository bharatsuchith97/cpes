/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getEmployees, getTeams } from '../EmployeeList/redux/employeeListSlice';
import { RootState } from '../../../store';
import { getEvaluations } from '../EvaluationList/redux/evaluationListSlice';
import { Card, Table } from 'antd';

function TeamLeadDashboard() {
  const userString = localStorage.getItem('authDetails');
  const user = userString ? JSON.parse(userString) : null;
  // const isAdmin = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") ? true : false;
  const userId = user?.uid;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTeams());
    dispatch(getEvaluations())
  }, []);
  const { evaluations } = useAppSelector((state: RootState) => state.evaluations);
  const { employees,teams } = useAppSelector((state: RootState) => state.employees);

  const groupedData = evaluations?.filter((evalu)=>evalu?.teamLeadId === userId).reduce((groups: any, item: any) => {
    const key = item.employeeId;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
  console.log("KK",groupedData)
  // Step 2: Calculate averages for each employee
  const averages = Object.entries(groupedData).map(([employeeId, evaluationList]: any) => {
    const totalAverage =
      evaluationList.reduce(
        (sum: any, evalItem: any) =>
          sum +
          (evalItem.technicalSkillsRating +
            evalItem.teamworkRating +
            evalItem.problemSolvingRating +
            evalItem.communicationRating) /
          4,
        0
      ) / evaluationList.length;

    return { employeeId, totalAverage };
  });
  // Step 3: Sort employees by overall average in descending order
  averages.sort((a, b) => b.totalAverage - a.totalAverage);

  const dataSource = averages?.map((performer) => ({
    key: performer?.employeeId,
    employee: employees?.filter((employee) => employee?.id === performer?.employeeId)[0]?.firstName,
    teamName: teams?.filter((team)=>team?.teamId === employees?.filter((employee) => employee?.id === performer?.employeeId)[0]?.teamId)[0]?.teamName,
    average: (performer?.totalAverage * 10).toFixed(2) + "%",
  }))

  const columns = [
    { title: 'Employee', dataIndex: 'employee', key: 'employee' },
    { title: 'Team', dataIndex: 'teamName', key: 'teamName' },
    { title: 'Average Rating', dataIndex: 'average', key: 'average' },
  ]

  return (
    <FlexboxContainer flexDirection="column" alignItems="flex-start" gap="2.5rem">
      <FlexboxItem style={{ fontWeight: 500, fontSize: 20 }}>Team Lead Dashboard</FlexboxItem>
      <FlexboxItem style={{ width: "100%"}}>
        <FlexboxContainer flexDirection="column" gap="1rem" alignItems="flex-start">
          <FlexboxItem style={{ width: "100%",padding: "0.625rem", border: "1px solid #5c1233", borderRadius: "8px" }}>
            <Card title={<span style={{ fontWeight: 500, fontSize: 20 }}>Overall Top Performers</span>} bordered={false}>
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
    </FlexboxContainer>)
}

export default TeamLeadDashboard