import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../hooks';
import { getTeams } from './redux/teamListSlice';
import { FlexboxContainer, FlexboxItem } from 'ui-components';


const TeamList = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTeams());
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

export default TeamList