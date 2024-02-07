import { useContext } from "react";

import { Select, MenuItem, TextField, Box, Button } from "@mui/material";

import { DataContext } from "../context/DataProvider";
import loader from '../assests/loader.gif'


const Form = ({ onSendClick }) => {
  const { formData, setFormData, loading } = useContext(DataContext);

  const onUrlChange = (e) => {
    setFormData({ ...formData, url: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, type: e.target.value });
  };

  return (
    <main className="flex items-center gap-3">
      <Select
        value={formData?.type}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          backgroundColor: "#bae6fd",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiSvgIcon-root": {
            color: "black",
          },
        }}
        className="shadow-md "
        label="POST"
        onChange={(e) => handleChange(e)}
      >
        <MenuItem value={"GET"}>GET</MenuItem>
        <MenuItem value={"POST"}>POST</MenuItem>
        <MenuItem value={"PUT"}>PUT</MenuItem>
        <MenuItem value={"DELETE"}>DELETE</MenuItem>
      </Select>
      <input 
        className="w-[100%] border border-sky-200 h-[55px] rounded-md px-4" 
        onChange={(e) => onUrlChange(e)} 
        value={formData.url}  
      />
      <button className="bg-sky-200 h-[55px] px-4 rounded-md" onClick={() => onSendClick()} disabled={loading}>
        {!loading ? 
          "Send" :
          <img src={loader} alt="loading" className="h-[30px] w-[47px]"/>
        }
      </button>
    </main>
  );
};

export default Form;
