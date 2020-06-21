import React, {useState} from 'react';
import Filter from '../components/atoms/Filter';

export default {
  title: 'Filter',
  component: Filter,
};

export const Primary = () => {
  const [filterList, setFilterList] = useState({
    food: false,
    sport: false,
    label: false,
    Proutor: false
  })

  const [filterList2, setFilterList2] = useState([{
    label: 'food',
    selected: false,
    isUnique: false
  }, {
    label: 'sport',
    selected: false,
    isUnique: false
  }, {
    label: 'clothing',
    selected: false,
    isUnique: false
  }, {
    label: 'watch',
    selected: false,
    isUnique: true
  }])

  return <Filter filterList={filterList2} setFilterList={setFilterList2} numbColumns={2}>
  </Filter>
};
