/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getEmployees, getTeams, postTeam } from './redux/teamListSlice';
import { FlexboxContainer, FlexboxItem, Button } from 'ui-components';
import { Table, Modal, Form, Input, Select } from 'antd';
import { RootState } from '../../../store';
import { ITeam } from './types/teamListTypes';


const TeamList = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const { teams, teamLeads, employees } = useAppSelector((state: RootState) => state.teams);

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getEmployees());
  }, []);


  const dataSource = teams.map((team: ITeam) => ({
    key: team.teamId,
    teamId: team?.teamId ?? '-',
    teamCount: team?.teamMembers?.length ?? '-',
    teamName: team?.teamName ?? '-',
    teamLead: employees?.filter((employee:any)=>employee.id === team?.teamLeadId)[0]?.firstName ?? '-'

    
  }));

  const columns = [
    { title: 'Team ID', dataIndex: 'teamId', key: 'teamId' },
    { title: 'Team Name', dataIndex: 'teamName', key: 'teamName' },
    { title: 'Team Lead', dataIndex: 'teamLead', key: 'teamLead' },
    { title: 'Team Count', dataIndex: 'teamCount', key: 'teamCount' },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (values: any) => {
    dispatch(postTeam(values))
    setVisible(false);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Validation failed:', errorInfo);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <FlexboxContainer flexDirection="column" alignItems="flex-start" gap="2.5rem">
        <FlexboxItem style={{ width: "100%" }}>
          <FlexboxContainer justifyContent="space-between">
            <FlexboxItem style={{fontWeight:500,fontSize:20}}>Teams</FlexboxItem>
            <FlexboxItem>
              <Button
                onClick={showModal}
              >
                + Add New Team
              </Button>
            </FlexboxItem>
          </FlexboxContainer>
        </FlexboxItem>
        <FlexboxItem style={{ width: "100%" }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: '450px' }} 
          />
        </FlexboxItem>
      </FlexboxContainer>



      <Modal
        title="Add New Team"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="addTeam"
          onFinish={handleOk}
          style={{ marginTop: "2.5rem" }}
          form={form}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Team name"
            name="teamName"
            rules={[
              {
                required: true,
                message: 'Please enter team name',
              },
            ]}
          >
            <Input placeholder="Enter Team Name" />
          </Form.Item>

          <Form.Item
            label="Select Team Lead"
            name="teamLeadId"
            rules={[
              {
                required: true,
                message: 'Please select a team lead',
              },
            ]}
          >
            <Select placeholder="Select a team lead">
              {teamLeads.length > 0 && teamLeads?.map((teamLead) => <Select.Option value={teamLead?.id}>
                {teamLead?.firstName}&nbsp;
                {teamLead?.lastName}
                </Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="Select team members"
            name="teamMembers"
            rules={[
              {
                required: true,
                message: 'Please select one or more team members',
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select multiple team members"
              style={{ width: '100%' }}
            >
              {employees.length > 0 && employees?.filter((emp)=>emp.isTeamLead === false && emp.isAdmin === false)?.map((employee) => 
              <Select.Option value={employee?.id}>{employee?.firstName}&nbsp;{employee?.lastName}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 18, span: 18 }} style={{ marginTop: "2.5rem" }}>
            {/* <Button type="secondary" onClick={handleCancel}>
              Cancel
            </Button> */}
            &nbsp;
            <Button type="primary" htmlType="submit">
              Create Team
            </Button>
          </Form.Item>


        </Form>

      </Modal >
    </>
  )
}

export default TeamList