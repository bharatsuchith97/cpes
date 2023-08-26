import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../hooks';
import { getEmployees } from './redux/employeeListSlice';

function EmployeeList() {
const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getEmployees());
  }, [])
  
  return (
    <div>EmployeeList</div>
  )
}

export default EmployeeList