import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_style.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { EMPLOYEE_ACTION_TYPE } from "app/redux/types/EmployeeType";
import { provinceReduce } from "app/redux/reducers/ProvinceReduce";
import { PROVINCES_ACTIONS_TYPE } from "app/redux/types/provinceType";
import { DISTRICT_ACTION_TYPE } from "app/redux/types/districtType";
import { districtReduce } from "app/redux/reducers/DistrictReduce";
import { communeReduce } from "app/redux/reducers/CommuneReduce";
import { COMMNUNE_ACTION_TYPE } from "app/redux/types/communeType";
import { employeeReduce } from "../../redux/reducers/EmployeeReduce";
toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});

class EmployeeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      code: "",
      name: "",
      age: "",
      phone: "",
      email: "",
      province: "",
      district: "",
      commune: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnSubmitEmployee = async () => {
    const data = this.state;
    // console.log("id", data.id);
    const { editorEmployee, handleCloseDialog } = this.props;

    if (!data.id) {
      await editorEmployee(data);
    } else {
      editorEmployee(data, data.id);
      handleCloseDialog();
    }
  };
  //
  componentDidMount() {
    const { item, getAllDistrict, getAllProvinces, getAllCommune } = this.props;
    getAllProvinces();
    getAllDistrict();
    getAllCommune();
    console.log("đay la item", item);
    this.setState({
      id: item.id,
      code: item.code,
      name: item.name,
      age: item.age,
      phone: item.phone,
      email: item.email,
      province: item.province,
      district: item.district,
      commune: item.commune,
    });
  }

  render() {
    let { id, code, name, age, phone, email, province, district, commune } =
      this.state;
    let {
      open,
      t,
      handleCloseDialog,
      provinces,
      districts,
      communes,
      resCode,
    } = this.props;
    const listProvinces = provinces.province.province;
    const listDistricts = districts.districtReduce.district;
    const listCommunes = communes.communeReduce.communes;
    console.log("code ", resCode);
    if (resCode?.code === 200) {
      handleCloseDialog();
      console.log(resCode);
    }
    return (
      <Dialog open={open}>
        <DialogTitle>
          <span className="mb-20 styleColor">
            {id ? t("staff.updateStaff") : t("Add") + " " + t("user.title")}
          </span>
          <IconButton
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() => handleCloseDialog()}
          >
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm
          ref="form"
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent dividers>
            <Grid className="mb-16" container spacing={1}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.code")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="number"
                  name="code"
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                  variant="outlined"
                  size="small"
                  value={code}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.displayName")}
                    </span>
                  }
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                  variant="outlined"
                  size="small"
                  value={name}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.age")}
                    </span>
                  }
                  type="number"
                  name="age"
                  onChange={this.handleChange}
                  validators={["required", "minNumber:0", "maxNumber:70"]}
                  errorMessages={[
                    t("general.required"),
                    t("general.error_age"),
                    t("general.error_age"),
                  ]}
                  variant="outlined"
                  size="small"
                  value={age}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span class="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.Email")}
                    </span>
                  }
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    t("general.required"),
                    t("general.error_email"),
                  ]}
                  variant="outlined"
                  size="small"
                  value={email}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.phoneNumber")}
                    </span>
                  }
                  type="number"
                  onChange={this.handleChange}
                  name="phone"
                  validators={[
                    "required",
                    "matchRegexp:(^[0-9]{10})$",
                    // "matchRegexp:(84|0[3|5|7|8|9])+([0-9]{8})\b",
                  ]}
                  errorMessages={[
                    t("general.required"),
                    t("general.error_phone"),
                    // t("general.error_phone_hero"),
                  ]}
                  variant="outlined"
                  size="small"
                  value={phone}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel>
                    {<span className="font">{t("staff.city")}</span>}
                  </InputLabel>
                  <Select
                    name="province"
                    value={province}
                    onChange={this.handleChange}
                  >
                    {listProvinces.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel>
                    {<span className="font">{t("staff.district")}</span>}
                  </InputLabel>
                  <Select
                    name="district"
                    value={district}
                    onChange={this.handleChange}
                  >
                    {listDistricts.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth={true} variant="outlined" size="small">
                  <InputLabel>
                    {<span className="font">{t("staff.commune")}</span>}
                  </InputLabel>
                  <Select
                    name="commune"
                    value={commune}
                    onChange={this.handleChange}
                  >
                    {listCommunes.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-end flex-middle">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleCloseDialog()}
            >
              {t("general.cancel")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => {
                this.handleOnSubmitEmployee();
              }}
            >
              {id ? t("general.update") : t("Add")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  provinces: provinceReduce,
  districts: districtReduce,
  communes: communeReduce,
  // resCode: employeeReduce,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProvinces: () =>
      dispatch({ type: PROVINCES_ACTIONS_TYPE.GET_ALL_PROVINCES }),
    getAllDistrict: () =>
      dispatch({ type: DISTRICT_ACTION_TYPE.GET_ALL_DISTRICT }),
    getAllCommune: () =>
      dispatch({ type: COMMNUNE_ACTION_TYPE.GET_ALL_COMMUNE }),
    editorEmployee: (data, id) =>
      // console.log("data ", data, id),
      dispatch({ type: EMPLOYEE_ACTION_TYPE.EDITOR_EMPLOYEE, data, id }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDialog);
