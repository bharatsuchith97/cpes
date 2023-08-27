/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getEmployees, postEmployee } from './redux/employeeListSlice';
import { FlexboxContainer, FlexboxItem, Button } from 'ui-components';
import { Table, Modal, Form, Input } from 'antd';
import { RootState } from '../../../store';
import { IEmployee } from './types/employeeListTypes';


const EmployeeList = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const { employees } = useAppSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);


  const dataSource = employees.map((employee: IEmployee) => ({
    key: employee?.id,
    id: employee?.id ?? '-',
    firstName: employee?.firstName ?? '-',
    lastName: employee?.lastName ?? '-',
    email: employee?.email ?? '-'
  }));

  const columns = [
    { title: 'Employee ID', dataIndex: 'id', key: 'id' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
  ];

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
            <FlexboxItem style={{fontWeight:500,fontSize:20}}>Employees</FlexboxItem>
            <FlexboxItem>
              <Button
                onClick={showModal}
              >
                + Add New Employee
              </Button>
            </FlexboxItem>
          </FlexboxContainer>
        </FlexboxItem>
        <FlexboxItem style={{ width: "100%",height: 'calc(100vh - 12rem)' }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ y: '400px' }} 
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
          <Form.Item wrapperCol={{ offset: 14, span: 16 }} style={{ marginTop: "2.5rem" }}>
            <Button type="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            &nbsp;
            <Button type="primary" htmlType="submit">
              Create Employee
            </Button>
          </Form.Item>
        </Form>

      </Modal >
    </>
  )
}

export default EmployeeList