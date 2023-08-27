/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getEmployees, getTeamLeads, getTeams, postTeamLead } from './redux/teamLeadListSlice';
import { FlexboxContainer, FlexboxItem, Button } from 'ui-components';
import { Table, Modal, Form, Select } from 'antd';
import { RootState } from '../../../store';
import { ITeamLead } from './types/teamLeadListTypes';


const TeamLeadList = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const { teams, teamLeads, employees } = useAppSelector((state: RootState) => state.teamLeads);

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getTeamLeads());
    dispatch(getEmployees());
  }, []);


  const dataSource = teamLeads.map((teamLead: ITeamLead) => ({
    key: teamLead.teamLeadId,
    teamLeadId: teamLead.teamLeadId,
    employeeId: teamLead.employeeId,
    teamLeadFirstName: employees.filter((employee)=>employee?.id === teamLead?.employeeId)[0]?.firstName,
    teamLeadLastName: employees.filter((employee)=>employee?.id === teamLead?.employeeId)[0]?.lastName,
    teamId: teamLead?.teamId ?? '-',
    teamName: teams.filter((team)=>team?.teamId === teamLead?.teamId)[0]?.teamName ?? '-',
  }));

  const columns = [
    { title: 'Team Lead ID', dataIndex: 'teamLeadId', key: 'teamLeadId' },
    { title: 'Employee ID', dataIndex: 'employeeId', key: 'teamCount' },
    { title: 'First Name', dataIndex: 'teamLeadFirstName', key: 'teamLeadFirstName' },
    { title: 'Last name', dataIndex: 'teamLeadLastName', key: 'teamLeadLastName' },
    { title: 'Team ID', dataIndex: 'teamId', key: 'teamId' },
    { title: 'Team Name', dataIndex: 'teamName', key: 'teamName' },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (values: any) => {
    dispatch(postTeamLead(values))
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
            <FlexboxItem style={{fontWeight:500,fontSize:20}}>Team Leads</FlexboxItem>
            <FlexboxItem>
              <Button
                onClick={showModal}
              >
                + Add New Team Lead
              </Button>
            </FlexboxItem>
          </FlexboxContainer>
        </FlexboxItem>
        <FlexboxItem style={{ width: "100%" }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: '400px' }} 
          />
        </FlexboxItem>
      </FlexboxContainer>



      <Modal
        title="Add New Team Lead"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="addTeamLead"
          onFinish={handleOk}
          style={{ marginTop: "2.5rem" }}
          form={form}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Select Employee"
            name="employeeId"
            rules={[
              {
                required: true,
                message: 'Please select a employee',
              },
            ]}
          >
            <Select placeholder="Select an employee">
              {employees.length > 0 && employees?.map((employee) => <Select.Option value={employee?.id}>
                {employee?.firstName ?? ''}&nbsp;
                {employee?.lastName ?? ''}
                </Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 14, span: 16 }} style={{ marginTop: "2.5rem" }}>
            <Button type="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            &nbsp;
            <Button type="primary" htmlType="submit">
              Make Team Lead
            </Button>
          </Form.Item>


        </Form>

      </Modal >
    </>
  )
}

export default TeamLeadList