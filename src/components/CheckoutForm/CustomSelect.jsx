import { InputLabel, Select, MenuItem, Grid } from "@material-ui/core";
const CustomSelect = ({
  titleLabel,
  shippingValue,
  setShippingValue,
  dataToLoop,
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel>{titleLabel}</InputLabel>
      <Select
        value={shippingValue}
        fullWidth
        onChange={(e) => setShippingValue(e.target.value)}
      >
        {dataToLoop.map((data) => (
          <MenuItem key={data.id} value={data.id}>
            {data.label}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};
export default CustomSelect;
