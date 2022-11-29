import React, { Component } from "react";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { Grid, Button, IconButton, Icon } from "@material-ui/core";
import MaterialTable from "material-table";
import EmployeeDialog from "./EmployeeDialog";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createStructuredSelector } from "reselect";
import {
  selectorEmployee,
  selectorRescode,
} from "app/redux/selector/EmployeeSelector";
import { connect } from "react-redux";
import { EMPLOYEE_ACTION_TYPE } from "app/redux/types/EmployeeType";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});
function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return (
    <div>
      <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  );
}
class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      item: {},
    };
  }
  componentDidMount() {
    let { getAllEmployees } = this.props;
    getAllEmployees();
  }
  handleOpenModel = () => {
    this.setState({ shouldOpenEditorDialog: true });
  };
  handleCloseDialog = () => {
    this.setState({
      shouldOpenConfirmationDialog: false,
      shouldOpenEditorDialog: false,
    });
  };
  handleDeleteEmployee = (id) => {
    this.setState({ shouldOpenConfirmationDialog: true, id: id });
  };

  confirmDelete = (id) => {
    id = this.state.id;
    const { deleteEmployee } = this.props;
    deleteEmployee(id);
    this.handleCloseDialog();
  };

  render() {
    let { shouldOpenEditorDialog, shouldOpenConfirmationDialog, item } =
      this.state;
    const { employees, editorEmployee, resCode } = this.props;

    // console.log("resCdoe", resCode);
    const { t, i18n } = this.props;
    let columns = [
      { title: t("staff.code"), field: "code", width: "150" },
      { title: t("staff.name"), field: "name", width: "150" },
      { title: t("staff.email"), field: "email", width: "150" },
      {
        title: t("staff.phoneNumber"),
        field: "phone",
        width: "150",
      },
      {
        title: t("Action"),
        field: "action",
        width: "150",
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              // {
              //   console.log("mento thuong", rowData);
              // }
              if (method === 0) {
                this.setState({
                  item: rowData,
                  shouldOpenEditorDialog: true,
                });
              } else if (method === 1) {
                this.handleDeleteEmployee(rowData.id);
              } else {
                alert("Call Selected Here:" + rowData.id);
              }
            }}
          />
        ),
      },
    ];

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: t("Dashboard.manage"), path: "/directory/apartment" },
              { name: t("staff.title") },
            ]}
          />
        </div>

        <Grid container spacing={3}>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.handleOpenModel()}
            >
              {t("Add")}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {/* <div> */}
          {shouldOpenEditorDialog && (
            <EmployeeDialog
              t={t}
              i18n={i18n}
              open={shouldOpenEditorDialog}
              handleCloseDialog={this.handleCloseDialog}
              editorEmployee={editorEmployee}
              item={item}
              resCode={resCode}
            />
          )}
          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              title={t("confirm")}
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={this.handleCloseDialog}
              onYesClick={this.confirmDelete}
              text={t("DeleteConfirm")}
              Yes={t("Yes")}
              No={t("No")}
            />
          )}
          {/* </div> */}
        </Grid>
        <MaterialTable
          title={t("Nhân viên")}
          columns={columns}
          data={employees}
          options={{
            selection: false,
            paging: true,
            actionsColumnIndex: -1,
            search: true,
            headerStyle: {
              backgroundColor: "#358600",
              color: "#fff",
            },
            padding: "dense",
            toolbar: true,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  employees: selectorEmployee,

  resCode: selectorRescode,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEmployees: () =>
      dispatch({ type: EMPLOYEE_ACTION_TYPE.GET_ALL_EMPLOYEE }),

    deleteEmployee: (id) =>
      dispatch({ type: EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE, id }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Employee);
