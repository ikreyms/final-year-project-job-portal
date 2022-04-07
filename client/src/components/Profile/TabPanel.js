import { Box } from "@mui/material";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      {...other}
      sx={{ width: "100%" }}
    >
      {value === index && <>{children}</>}
    </Box>
  );
};

export default TabPanel;
