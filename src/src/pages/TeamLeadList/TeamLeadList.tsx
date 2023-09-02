/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deleteTeamLead, getEmployees, getTeams, postTeamLead } from './redux/teamLeadListSlice';
import { FlexboxContainer, FlexboxItem, Button } from 'ui-components';
import { Table, Modal, Form, Select } from 'antd';
import { RootState } from '../../../store';
import { IEmployee } from './types/teamLeadListTypes';


const TeamLeadList = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [recordToDelete, setRecordToDelete] = useState<IEmployee>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    teamId: 0,
    isTeamLead: false,
    isAdmin: false,
    teamLeadId: '',
    evaluations:[]
  });

  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { teams, teamLeads, employees } = useAppSelector((state: RootState) => state.teamLeads);

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getEmployees());
  }, []);


  const dataSource = teamLeads ? teamLeads?.map((teamLead: IEmployee) => ({
    key: teamLead?.id ?? "-",
    teamLeadId: teamLead?.id ?? '-',
    // employeeId: teamLead.id,
    teamLeadFirstName: teamLead?.firstName ?? "-",
    teamLeadLastName: teamLead?.lastName ?? "-",
    teamId: teamLead?.teamId ?? '-',
    teamName: teams.filter((team)=>team?.teamId === teamLead?.teamId)[0]?.teamName ?? '-',
  })) : [];

  const columns = [
    { title: 'Team Lead ID', dataIndex: 'teamLeadId', key: 'teamLeadId' },
    { title: 'First Name', dataIndex: 'teamLeadFirstName', key: 'teamLeadFirstName' },
    { title: 'Last name', dataIndex: 'teamLeadLastName', key: 'teamLeadLastName' },
    { title: 'Team ID', dataIndex: 'teamId', key: 'teamId' },
    { title: 'Team Name', dataIndex: 'teamName', key: 'teamName' },
    {
      title: '',
      key: 'action',
      render: (text:any, record:any) => (
        <span>
          <Button onClick={() => showDeleteConfirm(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (values: any) => {
    const employeeDetails = employees.filter((employee)=> employee.id === values.employeeId)[0];
    dispatch(postTeamLead(employeeDetails))
    setVisible(false);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Validation failed:', errorInfo);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };
  const showDeleteConfirm = (record:IEmployee) => {
    setDeleteModalVisible(true);
    setRecordToDelete(record);
  };

  const handleDelete = () => {
    // Handle delete action
    if (recordToDelete) {
      console.log('Delete:', recordToDelete);
      // Perform the actual delete operation here
      const completeRecord = employees.filter((employee)=>employee.id === recordToDelete?.teamLeadId)[0];
      dispatch(deleteTeamLead(completeRecord))

      // Close the delete confirmation modal
      setDeleteModalVisible(false);
    }
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
            scroll={{ y: '450px' }} 
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
              {employees.length > 0 && employees?.filter((emp)=>(emp.isAdmin === false && emp.isTeamLead === false))?.map((employee) => <Select.Option value={employee?.id}>
                {employee?.firstName ?? ''}&nbsp;
                {employee?.lastName ?? ''}
                </Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 18, span: 18 }} style={{ marginTop: "2.5rem" }}>
            {/* <Button type="secondary" onClick={handleCancel}>
              Cancel
            </Button> */}
            {/* &nbsp; */}
            <Button type="primary" htmlType="submit">
              Make Team Lead
            </Button>
          </Form.Item>
        </Form>
      </Modal >
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this team lead?</p>
      </Modal>
    </>
  )
}

export default TeamLeadList