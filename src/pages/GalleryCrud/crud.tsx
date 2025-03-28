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
  getApiRouteGallarey,
  getApiRouteGallareyCategory,
  getApiRouteGetEivite,
  showToast,
} from "../../helpers/Common_functions";
import { API_ROUTES } from "../../services/api/utils";
interface GalleryCategoryItem {
  name: string;
  _id: string;
}
const formColumns = 2;
const { Option } = Select;
const Galary: React.FC = () => {
  const getRoute = getApiRouteGallarey("GetAll");
  const addRoute = getApiRouteGallarey("Create");
  const updateRoute = getApiRouteGallarey("Update");
  const deleteRoute = getApiRouteGallarey("Delete");
  const getGallareyCategory = getApiRouteGallareyCategory("Get");
  const [form] = Form.useForm();
  const dispatch: Dispatch<any> = useDispatch();
  const { handleFileUpload } = useFileUpload();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [imageurl, setimageurl] = useState<string | null>(null);
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
  const { items: GalleryCategoryItems, error: GalleryCategoryError } =
    useDynamicSelector(getGallareyCategory.identifier);
  const galleryCategoryOptions = GalleryCategoryItems?.result?.map(
    (item: GalleryCategoryItem) => ({
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
    { title: "Gallery Name", dataIndex: "galleryname", key: "name" },
    {
      title: "Image",
      dataIndex: "gallerycover",
      key: "gallerycover",
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
  const formItems = [
    {
      label: "Gallery Name",
      name: "galleryname",
      rules: [{ required: true, message: "Please Enter Name!" }],
      component: <Input />,
    },

    {
      label: "Cover Image",
      name: "gallerycover",
      rules: [{ required: true, message: "Please Upload CoverImage!" }],
      component: (
        <Upload
          customRequest={async ({ file, onSuccess, onError }) => {
            if (file) {
              const uploadedImageUrl = await handleFileUpload(file);
              if (uploadedImageUrl) {
                form.setFieldsValue({ gallerycover: uploadedImageUrl });
                setimageurl(uploadedImageUrl);
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
      label: "Galary Category",
      name: "gallerycategory",
      rules: [{ required: true, message: "Please input GalaryCategory!" }],
      component: (
        <Select allowClear placeholder="Select Category">
          {galleryCategoryOptions?.map(
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
  const getAllGallery = () => {
    callBackServer(
      { method: getRoute.method, endpoint: getRoute.endpoint, data: {} },
      getRoute.identifier
    );
  };
  const getAllGalleryCategory = () => {
    callBackServer(
      {
        method: getGallareyCategory.method,
        endpoint: getGallareyCategory.endpoint,
        data: {},
      },
      getGallareyCategory.identifier
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
    getAllGallery();
    getAllGalleryCategory();
  }, []);
  const handleApiResponse = (
    action: "create" | "update" | "delete",
    success: boolean
  ) => {
    if (success) {
      showToast("success", `Gallery ${action}d successfully`);
      getAllGallery();
      resetForm();
      const actionRoute = getApiRouteGallarey(
        (action.charAt(0).toUpperCase() +
          action.slice(1)) as keyof typeof API_ROUTES.Gallery
      );
      dispatch(dynamic_clear(actionRoute.identifier));
    } else {
      showToast("error", `Failed to ${action} gallery`);
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
    values.gallerycover = imageurl;
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
        <h1>Gallery List</h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <Input
            placeholder="Search Patients"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleDrawerOpen}>
            Add Gallery Category
          </Button>
        </div>
      </Row>

      <Table columns={columns} dataSource={items?.result} rowKey="id" />

      <Drawer
        title="Add Gallery Category"
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
