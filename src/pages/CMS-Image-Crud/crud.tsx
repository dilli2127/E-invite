import React, { memo, useEffect, useState } from "react";
import {
  Table,
  Button,
  Row,
  Drawer,
  Input,
  Upload,
  Select,
  Form,
  Image,
  Tooltip,
} from "antd";
import AntdForm from "../../components/antd/form/form";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ApiRequest } from "../../services/api/apiService";
import {
  dynamic_clear,
  dynamic_request,
  useDynamicSelector,
} from "../../services/redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { API_ROUTES } from "../../services/api/utils";
import { useFileUpload } from "../../helpers/useFileUpload";
import { showToast } from "../../helpers/message";

const { Option } = Select;
const formColumns = 2;

const CmsImageCrud: React.FC = ({}) => {
  const [form] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState();
  const [initialValues, setInitialValues] = useState<{ _id?: string } | null>(
    null
  );
  const dispatch: Dispatch<any> = useDispatch();
  const { url, handleFileUpload } = useFileUpload();
  const { loading, items, error } = useDynamicSelector(
    API_ROUTES.CmsImage.Get.identifier
  );
  const {
    loading: update_loading,
    items: update_items,
    error: update_error,
  } = useDynamicSelector(API_ROUTES.CmsImage.Update.identifier);
  const {
    loading: delete_loading,
    items: delete_items,
    error: delete_error,
  } = useDynamicSelector(API_ROUTES.CmsImage.Delete.identifier);
  const {
    loading: create_loading,
    items: create_items,
    error: create_error,
  } = useDynamicSelector(API_ROUTES.CmsImage.Add.identifier);
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
      name: "url",
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
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Image",
      dataIndex: "url",
      key: "url",
      render: (url: string) =>
        url ? (
          <Image
            src={url}
            alt="image"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Edit">
            <EditOutlined
              style={{ cursor: "pointer", color: "#1890ff" }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const handleEdit = (record: any) => {
    setInitialValues(record);
    setDrawerVisible(true);
  };

  const handleDelete = (record: any) => {
    callBackServer(
      {
        method: API_ROUTES.CmsImage.Delete.method,
        endpoint: API_ROUTES.CmsImage.Delete.endpoint + "/" + record._id,
        data: { _id: record._id },
      },
      API_ROUTES.CmsImage.Delete.identifier
    );
  };

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };
  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtered = items?.filter((item: { title: string }) =>
      item.title.toLowerCase().includes(text)
    );
    setFilteredItems(filtered);
  };

  const FormValue = async (values: any) => {
    const type = values && values.type;
    if (!initialValues?._id) {
      callBackServer(
        {
          method: API_ROUTES.CmsImage.Add.method,
          endpoint: API_ROUTES.CmsImage.Add.endpoint,
          data: { type, url },
        },
        API_ROUTES.CmsImage.Add.identifier
      );
    } else {
      callBackServer(
        {
          method: API_ROUTES.CmsImage.Update.method,
          endpoint:
            API_ROUTES.CmsImage.Update.endpoint + "/" + initialValues?._id,
          data: { type, url },
        },
        API_ROUTES.CmsImage.Update.identifier
      );
    }
  };
  const get_all_images = () => {
    callBackServer(
      {
        method: API_ROUTES.CmsImage.Get.method,
        endpoint: API_ROUTES.CmsImage.Get.endpoint,
        data: {},
      },
      API_ROUTES.CmsImage.Get.identifier
    );
  };
  useEffect(() => {
    get_all_images();
  }, []);
  useEffect(() => {
    if (delete_items?.statusCode === "200") {
      showToast("success", "Image deleted successfully");
      get_all_images();
      dispatch(dynamic_clear(API_ROUTES.CmsImage.Update.identifier));
    setDrawerVisible(false);
    }
    if (delete_error) {
      showToast("error", "Failed to delete image");
    }
  }, [delete_items, delete_error]);
  useEffect(() => {
    if (create_items?.statusCode === "200") {
      showToast("success", "Image Created successfully");
      get_all_images();
      dispatch(dynamic_clear(API_ROUTES.CmsImage.Add.identifier));
    setDrawerVisible(false);
    }
    if (create_error) {
      showToast("error", "Failed to Create image");
    }
  }, [create_items, create_error]);
  useEffect(() => {
    if (update_items?.statusCode === "200") {
      showToast("success", "Image Updated successfully");
      get_all_images();
      dispatch(dynamic_clear(API_ROUTES.CmsImage.Update.identifier));
    setDrawerVisible(false);
    }
    if (update_error) {
      showToast("error", "Failed to Updated image");
    }
  }, [update_items, update_error]);

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
            onChange={handleSearch}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleDrawerOpen}>
            Add Images
          </Button>
        </div>
      </Row>
      <Table
        columns={columns}
        dataSource={items?.result}
        rowKey="id"
        loading={loading}
      />

      <Drawer
        title="Add New Image"
        placement="right"
        onClose={handleDrawerClose}
        open={drawerVisible}
        width={600}
      >
        <AntdForm
          initialValues={initialValues}
          formItems={formItems}
          FormValue={FormValue}
          loading={create_loading || update_loading}
          formColumns={formColumns}
          onChildCancel={handleDrawerClose}
        />
      </Drawer>
    </div>
  );
};

export default memo(CmsImageCrud);
