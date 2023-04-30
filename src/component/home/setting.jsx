import { useState } from 'react';
import Cookies from 'js-cookie';
import {
  Box, FormControlLabel, Checkbox, Typography, Slider, Select, MenuItem, FormControl,
  useMediaQuery, InputLabel, TextField
} from '@mui/material';
import agriculture from "../../helpers/quizes/agriculture.json";
import food from "../../helpers/quizes/food.json";
import gardening from "../../helpers/quizes/gardening.json";
import setting from "../../helpers/setting.json";
const Setting = () => {
  const [selectedValue, setSelectedValue] = useState(Cookies.get("select") || "");
  const [secvalue, secsetValue] = useState(Number(Cookies.get(`change`)) || 20);

  const [maxvalue, maxsetValue] = useState(Number(Cookies.get(`${selectedValue || "agriculture"}max`)) || 20);

  const [value, setValue] = useState([Number(Cookies.get(`${selectedValue || "agriculture"}startrange`)) || 1, Number(Cookies.get(`${selectedValue || "agriculture"}endrange`)) || setting.maxquize]);
  console.log(value)
  const [displayValue, setDisplayValue] = useState(false);
  const [checked, setChecked] = useState({
    "20change": (Cookies.get("20change") === "true") ? true : false,
    "random": (Cookies.get("random") === "false") ? false : true,
    "onequize": (Cookies.get("onequize") === "true") ? true : false
  });
  const handleValueChange = (event) => {
    const newSelectedValue = event.target.value;
    setSelectedValue(newSelectedValue);
    setValue([
      Number(Cookies.get(`${newSelectedValue || "agriculture"}startrange`)) || 1,
      Number(Cookies.get(`${newSelectedValue || "agriculture"}endrange`)) || setting.maxquize
    ]);
    Cookies.set("select", newSelectedValue);
  };
  const handleSliderChange = (event, newValue) => secsetValue(newValue);
  const maxhandleSliderChange = (event, newValue) => {
    if (newValue <= 0) return maxsetValue(1);
    maxsetValue(newValue);
  };
  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    setChecked(prevState => ({ ...prevState, [name]: checked }));
    Cookies.set(name, checked);
  };
  const handleChange = (event, newValue, activeThumb) => {
    setDisplayValue(true);
    if (!Array.isArray(newValue)) return;
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1]), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0])]);
    };
  };
  const directmaxchange = (event) => {
    const newValue = Number(event.target.value.replace(/\D/g, ''));
    setValue([newValue, value[1]]);
  };
  const directsizechange = (event) => {
    const newValue = Number(event.target.value.replace(/\D/g, ''));
    maxsetValue(newValue);
  };
  const directminchange = (event) => {
    const newValue = Number(event.target.value.replace(/\D/g, ''));
    setValue([value[0], newValue]);
  };
  const secchange = (event) => {
    const newValue = Number(event.target.value.replace(/\D/g, ''));
    secsetValue(newValue);
  };
  const maxhandleBlur = (event) => {
    const newvalue = Number(event.target.value);
    if (newvalue > (selectedValue === "agriculture" ? Object.keys(agriculture).length : selectedValue === "food" ? Object.keys(food).length : selectedValue === "gardening" ? Object.keys(gardening).length : Object.keys(agriculture).length)) {
      setValue([value[0], selectedValue === "agriculture" ? Object.keys(agriculture).length : selectedValue === "food" ? Object.keys(food).length : selectedValue === "gardening" ? Object.keys(gardening).length : Object.keys(agriculture).length]);
      Cookies.set(`${selectedValue || "agriculture"}endrange`, selectedValue === "agriculture" ? Object.keys(agriculture).length : selectedValue === "food" ? Object.keys(food).length : selectedValue === "gardening" ? Object.keys(gardening).length : Object.keys(agriculture).length);
    } else if (newvalue <= value[0]) {
      setValue([value[0], value[0]]);
      Cookies.set(`${selectedValue || "agriculture"}endrange`, value[0]);
    } else {
      Cookies.set(`${selectedValue || "agriculture"}endrange`, newvalue);
    };
    if (maxvalue > (value[1] - value[0])) Cookies.set(`${selectedValue || "agriculture"}max`, (value[1] - value[0]) + 1);
  };
  const minhandleBlur = (event) => {
    const newvalue = Number(event.target.value);
    if (newvalue > value[1]) {
      setValue([value[1], value[1]]);
      Cookies.set(`${selectedValue || "agriculture"}startrange`, value[1]);
    } else if (newvalue <= 0) {
      setValue([1, value[1]]);
      Cookies.set(`${selectedValue || "agriculture"}startrange`, 1);
    } else {
      Cookies.set(`${selectedValue || "agriculture"}startrange`, newvalue);
    };
    if (maxvalue > (value[1] - value[0])) Cookies.set(`${selectedValue || "agriculture"}max`, (value[1] - value[0]) + 1);
  };
  const sizehandleBlur = (event) => {
    const newvalue = Number(event.target.value);
    if (newvalue > maxvalue) {
      Cookies.set(`${selectedValue || "agriculture"}max`, selectedValue === "agriculture" ? Object.keys(agriculture).length : selectedValue === "food" ? Object.keys(food).length : selectedValue === "gardening" ? Object.keys(gardening).length : Object.keys(agriculture).length);
    } else if (newvalue <= 0) {
      maxsetValue(1);
    } else {
      Cookies.set(`${selectedValue || "agriculture"}max`, newvalue);
    };
  };
  const sechandleBlur = (event) => {
    const newvalue = Number(event.target.value);
    if (newvalue > 100) {
      Cookies.set(`change`, 100);
      secsetValue(100);
    } else if (newvalue <= 0) {
      Cookies.set(`change`, 1);
      secsetValue(1);
    } else {
      Cookies.set(`change`, newvalue);
    };
  };
  const handleMouseUp = () => setDisplayValue(false);
  const handleValueCommit = (event, newValue) => {
    Cookies.set(`${selectedValue || "agriculture"}startrange`, newValue[0]);
    Cookies.set(`${selectedValue || "agriculture"}endrange`, newValue[1]);
    if (maxvalue > (value[1] - value[0])) Cookies.set(`${selectedValue || "agriculture"}max`, (value[1] - value[0]) + 1);
  };
  const sechandleValueCommit = (event, newValue) => Cookies.set(`change`, newValue);
  const maxhandleValueCommit = (event, newValue) => Cookies.set(`${selectedValue || "agriculture"}max`, (maxvalue > (value[1] - value[0])) ? (value[1] - value[0]) + 1 : maxvalue);
  const isSmallScreen = useMediaQuery("(max-width:500px)");
  return (
    <Box display="flex" justifyContent="center" pt={10}>
      <Box width={isSmallScreen ? "100%" : "600px"}
        border={2} borderRadius={5} borderColor="grey.500" bgcolor="white" p={2} >
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", marginRight: "3px" }}
        >
          ※cookieを使用します
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked["20change"]}
                  onChange={handleCheckboxChange}
                  name="20change"
                  color="primary"
                />
              }
              label="問題を切り替える"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked["random"]}
                  onChange={handleCheckboxChange}
                  name="random"
                  color="primary"
                />
              }
              label="問題をランダムにする"
            />
            {!checked["20change"] && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked["onequize"]}
                    onChange={handleCheckboxChange}
                    name="onequize"
                    color="primary"
                  />
                }
                label="一問一答"
              />
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
          <FormControl style={{ width: 200 }}>
            <InputLabel >{selectedValue === "agriculture" ? "農業" : selectedValue === "food" ? "食品" : selectedValue === "gardening" ? "園芸" : "農業"}</InputLabel>
            <Select
              value={selectedValue || "agriculture"}
              onChange={handleValueChange}
              label={selectedValue === "agriculture" ? "農業" : selectedValue === "food" ? "食品" : selectedValue === "gardening" ? "園芸" : "農業"}
            >
              <MenuItem value="agriculture">農業</MenuItem>
              <MenuItem value="food">食品</MenuItem>
              <MenuItem value="gardening">園芸</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", marginRight: "3px" }}
        >
          問題範囲設定
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            value={value[0]}
            onChange={directmaxchange}
            type="number"
            sx={{ width: '80px' }}
            size="small"
            onBlur={minhandleBlur}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', max: value[1], min: 1 }}
          />
          <Typography
            variant="h6"
          >
            ～
          </Typography>
          <TextField
            variant="outlined"
            value={value[1]}
            onChange={directminchange}
            onBlur={maxhandleBlur}
            type="number"
            sx={{ width: '80px', height: '50px' }}
            size="small"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', max: selectedValue === "agriculture" ? Object.keys(agriculture).length : selectedValue === "food" ? Object.keys(food).length : selectedValue === "gardening" ? Object.keys(gardening).length : Object.keys(agriculture).length, min: value[0] }}
          />
        </div>

        <Box display="flex" justifyContent="center">
          <Slider
            min={1}
            sx={{ width: "90%" }}
            max={selectedValue === "agriculture" ? Object.keys(agriculture).length : selectedValue === "food" ? Object.keys(food).length : selectedValue === "gardening" ? Object.keys(gardening).length : Object.keys(agriculture).length}
            value={value || [0, 1]}
            onChange={handleChange}
            onMouseUp={handleMouseUp}
            valueLabelDisplay={displayValue ? 'auto' : 'off'}
            disableSwap
            color="secondary"
            onChangeCommitted={handleValueCommit}
          />
        </Box>
        {checked["random"] &&
          <>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, textAlign: "center", marginRight: "3px" }}
            >
              最大問題数
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                variant="outlined"
                value={(maxvalue > (value[1] - value[0])) ? (value[1] - value[0]) + 1 : maxvalue}
                onChange={directsizechange}
                type="number"
                sx={{ width: '80px' }}
                size="small"
                onBlur={sizehandleBlur}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', max: (value[1] - value[0]) + 1, min: 1 }}
              />
              <Typography variant="h6">問</Typography>
            </div>
            <Box display="flex" justifyContent="center">
              <Slider
                sx={{ width: "90%" }}
                min={1}
                max={value[1] - value[0] + 1}
                value={maxvalue}
                color="secondary"
                onChange={maxhandleSliderChange}
                onChangeCommitted={maxhandleValueCommit}
              />
            </Box>
          </>}
        {checked["20change"] &&
          <>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, textAlign: "center", marginRight: "3px" }}
            >
              秒数範囲設定
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                variant="outlined"
                value={secvalue}
                onChange={secchange}
                type="number"
                sx={{ width: '80px' }}
                size="small"
                onBlur={sechandleBlur}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', max: 100, min: 1 }}
              />
              <Typography variant="h6">秒</Typography>
            </div>
            <Box display="flex" justifyContent="center">
              <Slider
                sx={{ width: "90%" }}
                min={1}
                step={1}
                max={100}
                value={secvalue || 20}
                color="primary"
                onChange={handleSliderChange}
                onChangeCommitted={sechandleValueCommit}
              />
            </Box>
          </>}
      </Box>
    </Box>
  );
};

export default Setting;
