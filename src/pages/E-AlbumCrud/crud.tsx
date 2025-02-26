import React, { memo, useState } from "react";
import { Table, Button, Row, Drawer, Input, InputNumber, Upload } from "antd";
import AntdForm from "../../components/antd/form/form";
import { UploadOutlined } from "@ant-design/icons";

const formColumns = 2;
const formItems = [
  {
    label: "Tittle",
    name: "tittle",
    rules: [{ required: true, message: "Please Enter Name!" }],
    component: <Input />,
  },
  {
    label: "Upload Pdf",
    name: "pdfurl",
    rules: [{ required: true, message: "Please Upload Pdf!" }],
    component: (
      <Upload>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    ),
  },
];

const EAlbumCrud: React.FC = ({}) => {
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
        <h1>E-Album List</h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <Input
            placeholder="Search Patients"
            value={searchText}
            // onChange={handleSearch}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleDrawerOpen}>
            Add E-Album
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
          FormValue={FormValue}
          formColumns={formColumns}
          onChildCancel={handleDrawerClose}
        />
      </Drawer>
    </div>
  );
};

export default memo(EAlbumCrud);
