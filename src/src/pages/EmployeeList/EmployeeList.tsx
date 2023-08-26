import React, { useEffect } from 'react';
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import { useAppDispatch } from '../../../hooks';
import { getEmployees } from './redux/employeeListSlice';

function EmployeeList() {
const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getEmployees());
  }, [])
  
  return (
    <FlexboxContainer flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
    <FlexboxItem>Teams</FlexboxItem>
    <FlexboxItem>
        Table goes here
    </FlexboxItem>
  </FlexboxContainer>
  )
}

export default EmployeeList