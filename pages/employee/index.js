import { Table, Space, Modal, Input, Typography } from "antd";
import { useCallback, useState } from "react";
import {
  getEmployeeData,
  postDeleteEmployee,
  postEditEmployee,
} from "../api/employee";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

function EmployeePage() {
  let formValues = {};
  const initEmployeeData = useCallback(() => {
    const result = getEmployeeData();
    return result;
  }, []);
  const [employeeData, setEmployeeData] = useState(initEmployeeData);

  const { confirm } = Modal;
  const { Title } = Typography;
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [editingValue, setEditingValue] = useState(null);

  const showEditModal = useCallback((data) => {
    setEditingValue(data);
    setIsEditModalVisible(true);
  }, []);

  const handleEditOk = useCallback(() => {
    postEditEmployee(formValues);
    setEmployeeData(initEmployeeData);

    setIsEditModalVisible(false);
  }, [formValues, initEmployeeData]);

  const handleEditCancel = useCallback(() => {
    setIsEditModalVisible(false);
  }, []);

  function showDeleteConfirmModal(employeeId) {
    confirm({
      title: "Are you sure delete this employee?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        postDeleteEmployee(employeeId);
        setEmployeeData(initEmployeeData);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const filterList = useCallback(
    (list) => (formatter) => {
      const uniqueIds = [];
      const filteredList = list
        .map((item) => {
          const isDuplicate = uniqueIds.includes(formatter(item));
          if (!isDuplicate) {
            uniqueIds.push(formatter(item));

            return {
              text: formatter(item),
              value: formatter(item),
            };
          }
        })
        .filter(Boolean);

      return filteredList;
    },
    []
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.login.localeCompare(b.login),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.salary - b.salary,
      filters: filterList(employeeData)((data) => data.salary),
      onFilter: (value, record) => record.salary === value,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <a>
              <EditOutlined onClick={() => showEditModal(record)} />
            </a>
            <a>
              <DeleteOutlined
                onClick={() => showDeleteConfirmModal(record.id)}
              />
            </a>
          </Space>
        );
      },
    },
  ];

  const displayEditModal = useCallback(() => {
    return (
      <>
        <p>Emplyee ID: {editingValue?.id}</p>
        <Input
          name="employeeName"
          placeholder="name"
          title="Name"
          defaultValue={editingValue?.name}
          onChange={(value) => {
            formValues = {
              ...editingValue,
              ...formValues,
              name: value.target.value,
            };
          }}
        />
        <Input
          name="employeeLogin"
          placeholder="login"
          title="Login"
          defaultValue={editingValue?.login}
          onChange={(value) => {
            formValues = {
              ...editingValue,
              ...formValues,
              login: value.target.value,
            };
          }}
        />
        <Input
          name="employeeSalary"
          type="number"
          placeholder="salary"
          title="Salary"
          defaultValue={editingValue?.salary}
          onChange={(value) => {
            formValues = {
              ...editingValue,
              ...formValues,
              salary: value.target.value,
            };
          }}
        />
      </>
    );
  }, [editingValue]);

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Title level={2}>Employees</Title>
        <Table
          dataSource={employeeData}
          columns={columns}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15"],
          }}
        />
      </Space>
      <Modal
        title="Edit"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Save"
      >
        {displayEditModal()}
      </Modal>
    </>
  );
}

export default EmployeePage;
