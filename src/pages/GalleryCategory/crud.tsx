import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Table,
  Button,
  Row,
  Drawer,
  Input,
  Form,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
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
  getApiRouteGallareyCategory,
  showToast,
} from "../../helpers/Common_functions";
import { API_ROUTES } from "../../services/api/utils";
import TextArea from "antd/es/input/TextArea";

const formColumns = 2;

const GalaryCategory: React.FC = () => {
  const getRoute = getApiRouteGallareyCategory("Get");
  const addRoute = getApiRouteGallareyCategory("Create");
  const updateRoute = getApiRouteGallareyCategory("Update");
  const deleteRoute = getApiRouteGallareyCategory("Delete");
  const [form] = Form.useForm();
  const dispatch: Dispatch<any> = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
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
  const callBackServer = useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );
  const { loading, items } = useDynamicSelector(getRoute.identifier);
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      label: "Name",
      name: "name",
      rules: [{ required: true, message: "Please Enter Name!" }],
      component: <Input />,
    },
    {
      label: "Description",
      name: "description",
      rules: [{ required: true, message: "Please Enter Description!" }],
      component: <TextArea />,
    },
  ];
  const getAllGalleryCategory = () => {
    callBackServer(
      { method: getRoute.method, endpoint: getRoute.endpoint, data: {} },
      getRoute.identifier
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
    getAllGalleryCategory();
  }, []);
  const handleApiResponse = (
    action: "create" | "update" | "delete",
    success: boolean
  ) => {
    if (success) {
      showToast("success", `Gallery Category ${action}d successfully`);
      getAllGalleryCategory();
      resetForm();
      const actionRoute = getApiRouteGallareyCategory(
        (action.charAt(0).toUpperCase() +
          action.slice(1)) as keyof typeof API_ROUTES.GalleryCategory
      );
      dispatch(dynamic_clear(actionRoute.identifier));
    } else {
      showToast("error", `Failed to ${action} gallery category`);
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
        <h1>Gallery Category List</h1>
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

export default memo(GalaryCategory);
