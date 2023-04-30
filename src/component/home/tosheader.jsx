import { useMediaQuery, Box, Tabs, Tab } from '@mui/material';
import { useState } from "react";
import { TabContext, TabPanel } from '@mui/lab';
import PRIVACY from "./privacy";
import TOS from "./tos";
const Tos = () => {
  const [value, setValue] = useState('tos');
  const handleChange = (event, newValue) => setValue(newValue);
  const isSmallScreen = useMediaQuery("(max-width:340px)");
  return (
    <>
      <Box sx={{
        typography: 'body1', p: 2,
        border: '1px solid #ccc',
        borderRadius: '4px',
        bgcolor: '#0F0F1F',
        margin: '20px',
        color: "#ffffff"
      }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="tos"
            >
              <Tab label="利用規約" sx={{ color: 'white', fontSize: isSmallScreen ? 3 : 12 }} value="tos" />
              <Tab label="プライバシーポリシー" sx={{ color: 'white', fontSize: isSmallScreen ? 3 : 12 }} value="privacy" />
            </Tabs>
          </Box>
          <TabPanel value="tos"><TOS /></TabPanel>
          <TabPanel value="privacy"><PRIVACY /> </TabPanel>
        </TabContext>
      </Box></>
  );
};

export default Tos;
