import React, { memo, useEffect, useState, useCallback } from "react";
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
import { getApiRoute, showToast } from "../../helpers/message";

const { Option } = Select;
const formColumns = 2;

const CmsImageCrud: React.FC = () => {
  const [form] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialValues, setInitialValues] = useState<{
    _id?: string;
    url?: string;
  } | null>({});
  const dispatch: Dispatch<any> = useDispatch();
  const { url, handleFileUpload } = useFileUpload();

  const getRoute = getApiRoute("Get");
  const addRoute = getApiRoute("Create");
  const updateRoute = getApiRoute("Update");
  const deleteRoute = getApiRoute("Delete");

  const { loading, items } = useDynamicSelector(getRoute.identifier);
  const { items: updateItems, error: updateError } = useDynamicSelector(
    updateRoute.identifier
  );
  const { items: deleteItems, error: deleteError } = useDynamicSelector(
    deleteRoute.identifier
  );
  const { items: createItems, error: createError } = useDynamicSelector(
    addRoute.identifier
  );

  const callBackServer = useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );

  const resetForm = () => {
    setDrawerVisible(false);
    setInitialValues({});
    form.resetFields();
  };

  const getAllImages = () => {
    callBackServer(
      { method: getRoute.method, endpoint: getRoute.endpoint, data: {} },
      getRoute.identifier
    );
  };

  useEffect(() => {
    getAllImages();
  }, []);

  const handleApiResponse = (
    action: "create" | "update" | "delete",
    success: boolean
  ) => {
    if (success) {
      showToast("success", `Image ${action}d successfully`);
      getAllImages();
      resetForm();
      const actionRoute = getApiRoute(
        (action.charAt(0).toUpperCase() +
          action.slice(1)) as keyof typeof API_ROUTES.CmsImage
      );
      dispatch(dynamic_clear(actionRoute.identifier));
    } else {
      showToast("error", `Failed to ${action} image`);
    }
  };

  useEffect(() => {
    if (createItems?.statusCode === "200") handleApiResponse("create", true);
    if (createError) handleApiResponse("create", false);
  }, [createItems, createError]);

  useEffect(() => {
    if (updateItems?.statusCode === "200") handleApiResponse("update", true);
    if (updateError) handleApiResponse("update", false);
  }, [updateItems, updateError]);

  useEffect(() => {
    if (deleteItems?.statusCode === "200") handleApiResponse("delete", true);
    if (deleteError) handleApiResponse("delete", false);
  }, [deleteItems, deleteError]);

  const handleEdit = (record: any) => {
    setInitialValues(record);
    setDrawerVisible(true);
  };

  const handleDelete = (record: any) => {
    callBackServer(
      {
        method: deleteRoute.method,
        endpoint: `${deleteRoute.endpoint}/${record._id}`,
        data: { _id: record._id },
      },
      deleteRoute.identifier
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredItems = items?.result?.filter((item: any) =>
    item?.type?.toLowerCase()?.includes(searchText)
  );

  const handleFormSubmit = async (values: any) => {
    const payload = { type: values.type, url: url || initialValues?.url };

    if (initialValues?._id) {
      callBackServer(
        {
          method: updateRoute.method,
          endpoint: `${updateRoute.endpoint}/${initialValues._id}`,
          data: payload,
        },
        updateRoute.identifier
      );
    } else {
      callBackServer(
        {
          method: addRoute.method,
          endpoint: addRoute.endpoint,
          data: payload,
        },
        addRoute.identifier
      );
    }
  };
  const HandleCreate = () => {
    setInitialValues({});
    form.resetFields();
    setDrawerVisible(true);
  };

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
      rules: [{ required: false }],
      component: (
        <Upload
          customRequest={async ({ file, onSuccess, onError }) => {
            if (file) {
              const uploadedImageUrl = await handleFileUpload(file);
              if (uploadedImageUrl) {
                form.setFieldsValue({ url: uploadedImageUrl });
                onSuccess?.(uploadedImageUrl);
              } else {
                onError?.(new Error("File upload failed"));
              }
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      ),
    },
  ];

  const columns = [
    { title: "Type", dataIndex: "type", key: "type" },
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
  return (
    <div>
      <Row
        style={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <h1>CMS Images List</h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <Input
            placeholder="Search by Type"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={() => HandleCreate()}>
            Add Images
          </Button>
        </div>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredItems}
        rowKey="_id"
        loading={loading}
      />

      <Drawer
        title="Add / Edit Image"
        onClose={resetForm}
        open={drawerVisible}
        width={600}
      >
        <AntdForm
          form={form}
          initialValues={initialValues}
          formItems={formItems}
          FormValue={handleFormSubmit}
          loading={loading}
          formColumns={formColumns}
          onChildCancel={resetForm}
        />
      </Drawer>
    </div>
  );
};

export default memo(CmsImageCrud);
