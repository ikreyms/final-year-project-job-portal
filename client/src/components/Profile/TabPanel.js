const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;
