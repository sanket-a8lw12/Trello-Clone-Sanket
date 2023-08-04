import React, { useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const { VITE_KEY, VITE_TOKEN } = import.meta.env;
import axios from "axios";

export default function CheckBox({ item,}) {

  const [checkBoxList, setCheckBoxList] = React.useState([]);

  // let checkBoxListUrl = `https://api.trello.com/1/cards/${list.id}/checklists?key=${VITE_KEY}&token=${VITE_TOKEN}`


  // useEffect(() => {
  //   axios.get(checkBoxListUrl)
  //     .then((response) => {
  //       return response.data
  //     }).then((checkBoxData) => {
  //       setCheckBoxList(checkBoxData);
  //     }).catch((error) => {
  //       console.error(error);
  //     })
  // }, [])

  // console.log("checkBoxList");
  // console.log(list);

  return (

    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="" />
    </FormGroup>
  );
}