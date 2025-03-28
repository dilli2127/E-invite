import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Table,
  Button,
  Row,
  Drawer,
  Input,
  Upload,
  Form,
  Tooltip,
  Select,
  Image,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useFileUpload } from "../../helpers/useFileUpload";
import AntdForm from "../../components/antd/form/form";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ApiRequest } from "../../services/api/apiService";
import {
  dynamic_clear,
  dynamic_request,
  useDynamicSelector,
} from "../../services/redux";
import {
  getApiRouteEAlbum,
  getApiRouteGallarey,
  getApiRouteGallareyCategory,
  getApiRouteGetEivite,
  getApiRouteUser,
  showToast,
} from "../../helpers/Common_functions";
import { API_ROUTES } from "../../services/api/utils";
interface UserItem {
  name: string;
  _id: string;
}
const formColumns = 2;
const { Option } = Select;
const Galary: React.FC = () => {
  const getRoute = getApiRouteEAlbum("GetAll");
  const addRoute = getApiRouteEAlbum("Create");
  const updateRoute = getApiRouteEAlbum("Update");
  const deleteRoute = getApiRouteEAlbum("Delete");
  const getAllUsrs = getApiRouteUser("Get");
  const [form] = Form.useForm();
  const dispatch: Dispatch<any> = useDispatch();
  const { handleFileUpload } = useFileUpload();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [album_cover, setAlbumCover] = useState<string | null>(null);
  const [album_url, setAlbumUrl] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [initialValues, setInitialValues] = useState<{
    _id?: string;
    url?: string;
  } | null>({});
  const { items: updateItems, error: updateError } = useDynamicSelector(
    updateRoute.identifier
  );
  const { items: deleteItems, error: deleteError } = useDynamicSelector(
    deleteRoute.identifier
  );
  const { items: createItems, error: createError } = useDynamicSelector(
    addRoute.identifier
  );
  const { items: UsrsItems, error: GalleryCategoryError } =
    useDynamicSelector(getAllUsrs.identifier);
  const UserOptions = UsrsItems?.result?.map(
    (item: UserItem) => ({
      label: item.name,
      value: item._id,
    })
  );
  const callBackServer = useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );
  const { loading, items } = useDynamicSelector(getRoute.identifier);
  const columns = [
    { title: "Album Name", dataIndex: "albumname", key: "name" },
    {
      title: "Album Cover",
      dataIndex: "albumcover",
      key: "albumcover",
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
      title: "Album Url",
      dataIndex: "albumurl",
      key: "albumurl",
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
      title: "User Name",
      dataIndex: "UserItem",
      key: "user_name",
      render: (UserItem: UserItem) => UserItem?.name || "No UserItem",
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
  const formItems = [
    {
      label: "E Album Name",
      name: "albumname",
      rules: [{ required: true, message: "Please Enter Name!" }],
      component: <Input />,
    },

    {
      label: "Cover Image",
      name: "albumcover",
      rules: [{ required: true, message: "Please Upload CoverImage!" }],
      component: (
        <Upload
          customRequest={async ({ file, onSuccess, onError }) => {
            if (file) {
              const uploadedImageUrl = await handleFileUpload(file);
              if (uploadedImageUrl) {
                form.setFieldsValue({ gallerycover: uploadedImageUrl });
                setAlbumCover(uploadedImageUrl);
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
    {
      label: "Album PDF",
      name: "albumurl",
      rules: [{ required: true, message: "Please Upload CoverImage!" }],
      component: (
        <Upload
          customRequest={async ({ file, onSuccess, onError }) => {
            if (file) {
              const uploadedImageUrl = await handleFileUpload(file);
              if (uploadedImageUrl) {
                form.setFieldsValue({ gallerycover: uploadedImageUrl });
                setAlbumUrl(uploadedImageUrl);
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
    {
      label: "User",
      name: "userid",
      rules: [{ required: true, message: "Please input GalaryCategory!" }],
      component: (
        <Select allowClear placeholder="Select Category">
          {UserOptions?.map(
            (option: { label: string; value: string }) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            )
          )}
        </Select>
      ),
    },
  ];
  const getAllAlbum = () => {
    callBackServer(
      { method: getRoute.method, endpoint: getRoute.endpoint, data: {} },
      getRoute.identifier
    );
  };
  const getAllUsers = () => {
    callBackServer(
      {
        method: getAllUsrs.method,
        endpoint: getAllUsrs.endpoint,
        data: {},
      },
      getAllUsrs.identifier
    );
  };
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
  const resetForm = () => {
    setDrawerVisible(false);
    setInitialValues({});
    form.resetFields();
  };
  useEffect(() => {
    getAllAlbum();
    getAllUsers();
  }, []);
  const handleApiResponse = (
    action: "create" | "update" | "delete",
    success: boolean
  ) => {
    if (success) {
      showToast("success", `E Album ${action}d successfully`);
      getAllAlbum();
      resetForm();
      const actionRoute = getApiRouteEAlbum(
        (action.charAt(0).toUpperCase() +
          action.slice(1)) as keyof typeof API_ROUTES.EAlbum
      );
      dispatch(dynamic_clear(actionRoute.identifier));
    } else {
      showToast("error", `Failed to ${action} E Album`);
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

  const handleDrawerOpen = () => setDrawerVisible(true);


  const FormValue = (values: any) => {
    values.albumcover = album_cover;
    values.albumurl = album_url;
    if (initialValues?._id) {
      callBackServer(
        {
          method: updateRoute.method,
          endpoint: `${updateRoute.endpoint}/${initialValues._id}`,
          data: values,
        },
        updateRoute.identifier
      );
    } else {
      callBackServer(
        {
          method: addRoute.method,
          endpoint: addRoute.endpoint,
          data: values,
        },
        addRoute.identifier
      );
    }
    setDrawerVisible(false);
    form.resetFields();
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
        <h1>E Album List</h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <Input
            placeholder="Search Patients"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleDrawerOpen}>
            Add E Album
          </Button>
        </div>
      </Row>

      <Table columns={columns} dataSource={items?.result} rowKey="id" />

      <Drawer
        title="Add E Album"
        placement="right"
        onClose={resetForm}
        open={drawerVisible}
        width={600}
      >
        <AntdForm
          form={form}
          initialValues={initialValues}
          formItems={formItems}
          FormValue={FormValue}
          formColumns={formColumns}
          onChildCancel={resetForm}
        />
      </Drawer>
    </div>
  );
};

export default memo(Galary);
