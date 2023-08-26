import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../hooks';
import { getTeams } from './redux/teamListSlice';

function TeamList() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTeams());
  }, [])
  
  return (
    <div>TeamList</div>
  )
}

export default TeamList