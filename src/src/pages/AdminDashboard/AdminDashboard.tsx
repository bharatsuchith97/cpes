/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import { Bar, Pie } from '@ant-design/charts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getEmployees, getTeams } from '../EmployeeList/redux/employeeListSlice';
import { RootState } from '../../../store';
import { getEvaluations } from '../EvaluationList/redux/evaluationListSlice';
import { Card, Table } from 'antd';

function AdminDashboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTeams());
    dispatch(getEvaluations())
  }, []);
  const { evaluations } = useAppSelector((state: RootState) => state.evaluations);
  const { employees,teams } = useAppSelector((state: RootState) => state.employees);



  const teamData = evaluations.reduce((result: any, item: any) => {
    // Find if there's already an entry for the projectName
    const existingEntry: any = result.find((entry: any) => entry.team === item.projectName);

    if (existingEntry) {
      // If an entry exists, update the scores and count
      existingEntry.score =
        (existingEntry.score +
          item.technicalSkillsRating +
          item.teamworkRating +
          item.problemSolvingRating +
          item.communicationRating) /
        5;
      existingEntry.count += 1;
    } else {
      // If no entry exists, create a new entry
      result.push({
        team: item.projectName,
        score:
          (item.technicalSkillsRating +
            item.teamworkRating +
            item.problemSolvingRating +
            item.communicationRating) /
          4,
        count: 1,
      });
    }
    return result;
  }, []);
  const config = {
    data: teamData,
    xField: 'score',
    yField: 'team',
    yAxis: {
      label: { autoRotate: false },
    },
    horizontal: true,
  };

  const groupedData = evaluations.reduce((groups: any, item: any) => {
    const key = item.employeeId;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
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
    teamLead: employees.filter((emp) => emp?.id === (employees?.filter((employee) => employee?.id === performer?.employeeId)[0]?.teamLeadId))[0]?.firstName,
  }))

  const columns = [
    { title: 'Employee', dataIndex: 'employee', key: 'employee' },
    { title: 'Team', dataIndex: 'teamName', key: 'teamName' },
    { title: 'Average Rating', dataIndex: 'average', key: 'average' },
    { title: 'Team Lead', dataIndex: 'teamLead', key: 'teamLead' },
  ]

  const pieData = teams.map((team) => ({
    category: team.teamName,
    value: team.teamMembers.length,
  }));

  const pieConfig = {
    data: pieData,
    angleField: 'value', // The field that represents the values
    colorField: 'category', // The field that represents the categories
    radius: 0.9, // Adjust the radius to control the size of the pie chart
    label: {
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };

  return (
    <FlexboxContainer flexDirection="column" alignItems="flex-start" gap="2.5rem">
      <FlexboxItem style={{ fontWeight: 500, fontSize: 20 }}>Admin Dashboard</FlexboxItem>
      <FlexboxItem style={{ width: "100%"}}>
        <FlexboxContainer flexDirection="column" gap="1rem" alignItems="flex-start">
          <FlexboxItem style={{ width: "100%" }}>
            <FlexboxContainer autoFlow="column" style={{ width: "100%" }} justifyContent="space-between" alignItems="flex-start">
              <FlexboxItem style={{ width: "49%", border: "1px solid #5c1233", padding: "0.625rem", borderRadius: "8px" }}>
              <Card title={<span style={{ fontWeight: 500, fontSize: 20 }}>Team-wise performance</span>} bordered={false}>
              <div style={{  height: '300px' }}>

                <Bar {...config} />
                </div>
                </Card>
              </FlexboxItem>
              <FlexboxItem style={{ width: "49%", padding: "0.625rem", border: "1px solid #5c1233", borderRadius: "8px" }}>
                <Card title={<span style={{ fontWeight: 500, fontSize: 20 }}>Employee Distribution</span>} bordered={false}>
                  <div style={{  height: '300px' }}>
                <Pie {...pieConfig} />
                  </div>
                </Card>
              </FlexboxItem>
            </FlexboxContainer>
          </FlexboxItem>
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

export default AdminDashboard