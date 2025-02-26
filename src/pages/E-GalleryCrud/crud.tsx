import React, { memo, useState } from "react";
import { Table, Button, Row, Drawer, Input, InputNumber, Upload } from "antd";
import AntdForm from "../../components/antd/form/form";
import { UploadOutlined } from "@ant-design/icons";

const formColumns = 2;
const formItems = [
  {
    label: "Name",
    name: "Name",
    rules: [{ required: true, message: "Please Enter Name!" }],
    component: <Input />,
  },
  {
    label: "Mobile Number",
    name: "MobileNumber",
    rules: [{ required: true, message: "Please Enter Mobile Number!" }],
    component: <InputNumber style={{ width: "100%" }} />,
  },

  {
    label: "E-Mail",
    name: "Email",
    rules: [{ required: true, message: "Please Enter E-Mail!" }],
    component: <Input />,
  },
  {
    label: "Event Address1",
    name: "EventAddress1",
    rules: [{ required: true, message: "Please Enter Address1!" }],
    component: <Input />,
  },
  {
    label: "EventAddress2",
    name: "EventAddress2",
    rules: [{ required: true, message: "Please Enter Address2!" }],
    component: <Input />,
  },
  {
    label: "Latitude",
    name: "latitude",
    rules: [{ required: true, message: "Please Enter Latitude!" }],
    component: <InputNumber style={{ width: "100%" }} />,
  },
  {
    label: "Longitude",
    name: "longitude",
    rules: [{ required: true, message: "Please Enter Longitude!" }],
    component: <InputNumber style={{ width: "100%" }} />,
  },
];

const nestedInputs = [
  {
    label: "Image",
    name: "Image",
    rules: [{ required: true, message: "Please Upload Image!" }],
    component: (
      <Upload>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    ),
  },
];
const EGalleryCrud: React.FC = ({}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };
  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const text = e.target.value.toLowerCase();
  //   setSearchText(text);
  //   const filtered = items.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(text) ||
  //       item.description.toLowerCase().includes(text)
  //   );
  //   setFilteredItems(filtered);
  // };

  const FormValue = (values: any) => {
    console.log("Form Values:", values);
    setDrawerVisible(false);
  };

  return (
    <div>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <h1>E-Invite List</h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <Input
            placeholder="Search Patients"
            value={searchText}
            // onChange={handleSearch}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleDrawerOpen}>
            Add E-Invite
          </Button>
        </div>
      </Row>
      <Table columns={columns} dataSource={[]} rowKey="id" />

      <Drawer
        title="Add New Invite"
        placement="right"
        onClose={handleDrawerClose}
        open={drawerVisible}
        width={600}
      >
        <AntdForm
          formItems={formItems}
          nestedInputs={nestedInputs}
          nested={true}
          FormValue={FormValue}
          formColumns={formColumns}
          onChildCancel={handleDrawerClose}
        />
      </Drawer>
    </div>
  );
};

export default memo(EGalleryCrud);
