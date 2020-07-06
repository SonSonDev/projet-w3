import React, {useState} from 'react';
import { View } from "react-native";
import Radio from '../components/atoms/Radio.jsx';

export default {
  title: 'Radio',
  component: Radio,
};

export const Primary = () => {
  const [filterList2, setFilterList2] = useState([{
    label: '15%',
    selected: false
  }, {
    label: '20%',
    selected: false
  }, {
    label: '25%',
    selected: false
  }, {
    label: '26%',
    selected: false
  }])

  return <View style={{ paddingTop: 50, paddingLeft: 10, width: 500 }}>
      <Radio filterList={filterList2} setFilterList={setFilterList2} numbColumns={1}>
      </Radio>
    </View>
};