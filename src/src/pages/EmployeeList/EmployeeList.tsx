/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deleteEmployee, getEmployees, getTeams, postEmployee, postEvaluation } from './redux/employeeListSlice';
import { FlexboxContainer, FlexboxItem, Button } from 'ui-components';
import { Table, Modal, Form, Input, notification, Rate } from 'antd';
import { RootState } from '../../../store';
import { IEmployee } from './types/employeeListTypes';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const EmployeeList = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('authDetails');
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") ? true : false;
  const userId = user?.uid;
  const [technicalSkills, setTechnicalSkills] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [problemSolving, setProblemSolving] = useState(0);
  const [teamWork, setTeamWork] = useState(0);
  const [comments, setComments] = useState("");

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false);

  const [recordToDelete, setRecordToDelete] = useState<IEmployee>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    teamId: 0,
    isTeamLead: false,
    isAdmin: false,
    teamLeadId: '',
    evaluations: []
  });
  const [recordToEvaluate, setRecordToEvaluate] = useState<IEmployee>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    teamId: 0,
    isTeamLead: false,
    isAdmin: false,
    teamLeadId: '',
    evaluations: []
  });

  const [visible, setVisible] = useState(false);

  const { employees, teams } = useAppSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTeams());
  }, []);


  const dataSource = isAdmin ? employees?.map((employee: IEmployee) => ({
    key: employee?.id,
    id: employee?.id ?? '-',
    firstName: employee?.firstName ?? '-',
    lastName: employee?.lastName ?? '-',
    email: employee?.email ?? '-',
    teamId: employee?.teamId ?? '-',
    teamName: teams?.filter((team) => team.teamId === employee?.teamId)[0]?.teamName,
    isAdmin: employee?.isAdmin ?? false,
    isTeamLead: employee?.isTeamLead ?? false,
    teamLeadId: employee?.teamLeadId,
    evaluations: employee?.evaluations
  }))
    :
    employees?.filter((emp) => emp?.teamLeadId === userId)?.map((employee: IEmployee) => ({
      key: employee?.id,
      id: employee?.id ?? '-',
      firstName: employee?.firstName ?? '-',
      lastName: employee?.lastName ?? '-',
      email: employee?.email ?? '-',
      teamId: employee?.teamId ?? '-',
      teamName: teams?.filter((team) => team.teamId === employee?.teamId)[0]?.teamName,
      isAdmin: employee?.isAdmin ?? false,
      isTeamLead: employee?.isTeamLead ?? false,
      teamLeadId: employee?.teamLeadId,
      evaluations: employee?.evaluations
    }))

  // console.log("KKKKKKKK",employees?.filter((empl:IEmployee)=>empl?.id === user?.uid)[0]?.teamId)

  const columns = isAdmin ? [
    { title: 'Employee ID', dataIndex: 'id', key: 'id' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    // { title: 'Team ID', dataIndex: 'teamId', key: 'teamId' },
    { title: 'Team Name', dataIndex: 'teamName', key: 'teamName' },
    {
      title: '',
      key: 'action',
      render: (text: any, record: IEmployee) => (
        <span>
          <Button onClick={() => showDeleteConfirm(record)}>Delete</Button>
        </span>
      ),
    }
  ]
    :
    [
      { title: 'Employee ID', dataIndex: 'id', key: 'id' },
      { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
      { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      // { title: 'Team ID', dataIndex: 'teamId', key: 'teamId' },
      { title: 'Team Name', dataIndex: 'teamName', key: 'teamName' },
      {
        title: '',
        key: 'action',
        render: (text: any, record: IEmployee) => (
          <span>
            <Button
              onClick={() => showEvaluationModal(record)}
            >
              Evaluate
            </Button>
          </span>
        ),
      }
    ]
  const showDeleteConfirm = (record: IEmployee) => {
    // Show the delete confirmation modal
    setDeleteModalVisible(true);
    // Store the record to be deleted
    setRecordToDelete(record);
  };

  const showEvaluationModal = (record: IEmployee) => {
    setEvaluationModalVisible(true);
    setRecordToEvaluate(record);
  }
  const handleEvaluate = () => {
    if (recordToEvaluate) {
      const objectToSend = {
        employeeId: recordToEvaluate?.id,
        projectName: teams?.filter((team) => team.teamId === recordToEvaluate.teamId)[0]?.teamName ?? "-",
        technicalSkillsRating: technicalSkills,
        communicationRating: communication,
        problemSolvingRating: problemSolving,
        teamworkRating: teamWork,
        comments: comments,
        teamLeadId: userId
      }
      dispatch(postEvaluation(objectToSend));
      setEvaluationModalVisible(false);
    }
  }


  const handleDelete = () => {
    // Handle delete action
    if (recordToDelete) {
      console.log("GG", recordToDelete)
      // Perform the actual delete operation here
      if (recordToDelete?.isAdmin === true) {
        notification.info({
          message: 'Admin can not be deleted',
          placement: 'topRight',
        });
        setDeleteModalVisible(false);
      }
      else if (recordToDelete?.isTeamLead === true) {
        notification.info({
          message: 'Team Lead can not be deleted',
          placement: 'topRight',
        });
        setDeleteModalVisible(false);
      }
      else {
        dispatch(deleteEmployee(recordToDelete?.id))
        // Close the delete confirmation modal
        setDeleteModalVisible(false);
      }

    }
  };
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleCancelEvaluation = () => {
    setEvaluationModalVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (values: any) => {
    console.log('Received values:', values);
    dispatch(postEmployee(values))
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
            <FlexboxItem style={{ fontWeight: 500, fontSize: 20 }}>Employees</FlexboxItem>
            {isAdmin && <FlexboxItem>
              <Button
                onClick={showModal}
              >
                + Add New Employee
              </Button>
            </FlexboxItem>}
          </FlexboxContainer>
        </FlexboxItem>
        <FlexboxItem style={{ width: "100%", height: 'calc(100vh - 12rem)' }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: '450px' }}
          />
        </FlexboxItem>
      </FlexboxContainer>



      <Modal
        title="Add New Employee"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="addEmployee"
          onFinish={handleOk}
          style={{ marginTop: "2.5rem" }}
          form={form}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please enter first name',
              },
            ]}
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please enter last name',
              },
            ]}
          >
            <Input placeholder="Enter Last Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter email',
              },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter password',
              },
            ]}
          >
            <Input placeholder="Enter Password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 18, span: 18 }} style={{ marginTop: "2.5rem" }}>
            {/* <Button type="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            &nbsp; */}
            <Button type="primary" htmlType="submit">
              Create Employee
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
        <p>Are you sure you want to delete this employee?</p>
      </Modal>

      <Modal
        title="Evaluate Employee"
        visible={evaluationModalVisible}
        // onOk={handleEvaluate}
        onCancel={handleCancelEvaluation}
        footer={[
          <Button key="back" onClick={handleCancelEvaluation} style={{ marginRight: "0.625rem" }}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEvaluate}>
            Submit Evaluation
          </Button>]}
      // width="auto"
      // width={600}

      >
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>

          <FlexboxContainer justifyContent="space-between" alignItems="center">
            <FlexboxItem>Technical</FlexboxItem>
            <FlexboxItem>
              <Rate onChange={setTechnicalSkills} value={technicalSkills} count={10} />
              <span style={{ marginLeft: "1rem", width: "2.5rem", display: "inline-block" }}>{technicalSkills * 10}%</span>
            </FlexboxItem>
          </FlexboxContainer>

          <FlexboxContainer justifyContent="space-between" alignItems="center">
            <FlexboxItem>Communication</FlexboxItem>
            <FlexboxItem>
              <Rate onChange={setCommunication} value={communication} count={10} />
              <span style={{ marginLeft: "1rem", width: "2.5rem", display: "inline-block" }}>{communication * 10}%</span>
            </FlexboxItem>
          </FlexboxContainer>

          <FlexboxContainer justifyContent="space-between" alignItems="center">
            <FlexboxItem>Problem Solving</FlexboxItem>
            <FlexboxItem>
              <Rate onChange={setProblemSolving} value={problemSolving} count={10} />
              <span style={{ marginLeft: "1rem", width: "2.5rem", display: "inline-block" }}>{problemSolving * 10}%</span>
            </FlexboxItem>
          </FlexboxContainer>

          <FlexboxContainer justifyContent="space-between" alignItems="center">
            <FlexboxItem>Team Work</FlexboxItem>
            <FlexboxItem>
              <Rate onChange={setTeamWork} value={teamWork} count={10} />
              <span style={{ marginLeft: "1rem", width: "2.5rem", display: "inline-block" }}>{teamWork * 10}%</span>
            </FlexboxItem>
          </FlexboxContainer>

          <FlexboxContainer style={{ width: "100%", marginTop: "2rem" }}>
            <FlexboxItem style={{ width: "100%" }}>
              Comments
              <TextArea rows={4} placeholder="" maxLength={50} title="Comments" style={{ width: "100%" }} value={comments} onChange={(e) => { setComments(e.target.value) }} />
            </FlexboxItem>

          </FlexboxContainer>
        </div>
      </Modal>
    </>
  )
}

export default EmployeeList