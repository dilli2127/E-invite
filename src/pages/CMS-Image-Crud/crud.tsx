import React, { memo, useState } from "react";
import { Table, Button, Row, Drawer, Input, Upload, Select, Form } from "antd";
import AntdForm from "../../components/antd/form/form";
import { UploadOutlined } from "@ant-design/icons";
import { ApiRequest } from "../../services/api/apiService";
import { dynamic_request } from "../../services/redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { API_ROUTES } from "../../services/api/utils";
import { useFileUpload } from "../../helpers/useFileUpload";

const { Option } = Select;
const formColumns = 2;

const CmsImageCrud: React.FC = ({}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState();
  const dispatch: Dispatch<any> = useDispatch();
  const { url, handleFileUpload } = useFileUpload();
  const callBackServer = React.useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );
  const formItems = [
    {
      label: "Type",
      name: "type",
      rules: [{ required: true, message: "Please Enter Type!" }],
      component: (
        <Select>
          <Option value="Home">Home</Option>
          <Option value="Gallery">Gallery</Option>
          <Option value="HomeGallery">HomeGallery</Option>
        </Select>
      ),
    },

    {
      label: "Image",
      name: "Image",
      rules: [{ required: false, message: "Please Upload Image!" }],
      component: (
        <Upload
          customRequest={async ({ file, onSuccess, onError }) => {
            if (file) {
              const uploadedImageUrl = await handleFileUpload(file);
              onSuccess && onSuccess(uploadedImageUrl);
              if (!uploadedImageUrl)
                onError && onError(new Error("File upload failed"));
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      ),
    },
  ];
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

  const FormValue = async (values: any) => {
    const type = values && values.type;
    callBackServer(
      {
        method: API_ROUTES.CmsImage.Add.method,
        endpoint: API_ROUTES.CmsImage.Add.endpoint,
        data: { type, url },
      },
      API_ROUTES.CmsImage.Add.identifier
    );
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
        <h1>CMS Images List</h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <Input
            placeholder="Search Patients"
            value={searchText}
            // onChange={handleSearch}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleDrawerOpen}>
            Add Images
          </Button>
        </div>
      </Row>
      <Table columns={columns} dataSource={[]} rowKey="id" />

      <Drawer
        title="Add New Image"
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

export default memo(CmsImageCrud);
