import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Table,
  Button,
  Row,
  Drawer,
  Input,
  InputNumber,
  Upload,
  Form,
  Tooltip,
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
  getApiRouteCmsImage,
  getApiRouteGetEivite,
  showToast,
} from "../../helpers/Common_functions";
import { API_ROUTES } from "../../services/api/utils";

const formColumns = 2;

const EInviteCrud: React.FC = () => {
  const getRoute = getApiRouteGetEivite("Get");
  const addRoute = getApiRouteGetEivite("Create");
  const updateRoute = getApiRouteGetEivite("Update");
  const deleteRoute = getApiRouteGetEivite("Delete");
  const [form] = Form.useForm();
  const dispatch: Dispatch<any> = useDispatch();
  const { handleFileUpload } = useFileUpload();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialValues, setInitialValues] = useState<{
    _id?: string;
    url?: string;
  } | null>({});
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const { items: updateItems, error: updateError } = useDynamicSelector(
    updateRoute.identifier
  );
  const { items: deleteItems, error: deleteError } = useDynamicSelector(
    deleteRoute.identifier
  );
  const { items: createItems, error: createError } = useDynamicSelector(
    addRoute.identifier
  );
  const [InviteUrl, setInviteUrl] = useState<string[]>([]);
  const callBackServer = useCallback(
    (variables: ApiRequest, key: string) => {
      dispatch(dynamic_request(variables, key));
    },
    [dispatch]
  );
  const { loading, items } = useDynamicSelector(getRoute.identifier);
  const columns = [
    { title: "Invite Name", dataIndex: "invite_name", key: "invite_name" },
    {
      title: "Image",
      dataIndex: "invite_url",
      key: "invite_url",
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
      label: "Name",
      name: "invite_name",
      rules: [{ required: true, message: "Please Enter Name!" }],
      component: <Input />,
    },
    {
      label: "Mobile Number",
      name: "mobile_number",
      rules: [{ required: true, message: "Please Enter Mobile Number!" }],
      component: <InputNumber style={{ width: "100%" }} />,
    },
    {
      label: "E-Mail",
      name: "email",
      rules: [{ required: true, message: "Please Enter E-Mail!" }],
      component: <Input />,
    },
    {
      label: "Event Address1",
      name: "event_address1",
      rules: [{ required: true, message: "Please Enter Address1!" }],
      component: <Input />,
    },
    {
      label: "Event Address2",
      name: "event_address2",
      rules: [{ required: true, message: "Please Enter Address2!" }],
      component: <Input />,
    },
    {
      label: "Latitude",
      name: "longitude",
      rules: [{ required: true, message: "Please Enter Latitude!" }],
      component: <InputNumber style={{ width: "100%" }} />,
    },
    {
      label: "Longitude",
      name: "latitude",
      rules: [{ required: true, message: "Please Enter Longitude!" }],
      component: <InputNumber style={{ width: "100%" }} />,
    },
    {
      label: "Image",
      name: "image",
      rules: [{ required: false }],
      component: (
        <Upload
          customRequest={async ({ file, onSuccess, onError }) => {
            if (file) {
              const uploadedInviteUrl = await handleFileUpload(file);
              if (uploadedInviteUrl) {
                form.setFieldsValue({ invite_url: uploadedInviteUrl });
                setInviteUrl(uploadedInviteUrl);
                onSuccess?.(uploadedInviteUrl);
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
  const getAllInvites = () => {
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
    getAllInvites();
  }, []);
  const handleApiResponse = (
    action: "create" | "update" | "delete",
    success: boolean
  ) => {
    if (success) {
      showToast("success", `Image ${action}d successfully`);
      getAllInvites();
      resetForm();
      const actionRoute = getApiRouteGetEivite(
        (action.charAt(0).toUpperCase() +
          action.slice(1)) as keyof typeof API_ROUTES.GetEivite
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
  const handleCustomUpload = async ({ file, onSuccess, onError }: any) => {
    try {
      const uploadedImageUrl = await handleFileUpload(file);

      if (uploadedImageUrl) {
        setUploadedImageUrls((prev) => {
          const updatedUrls = [...prev, uploadedImageUrl];
          form.setFieldsValue({ images: updatedUrls });
          return updatedUrls;
        });

        onSuccess?.(uploadedImageUrl);
      } else {
        onError?.(new Error("File upload failed"));
      }
    } catch (err) {
      onError?.(new Error("File upload failed"));
    }
  };

  const handleRemove = (file: any) => {
    setUploadedImageUrls((prev) => {
      const updatedUrls = prev.filter((url) => url !== file.url);
      form.setFieldsValue({ images: updatedUrls });
      return updatedUrls;
    });
  };

  const nestedInputs = [
    {
      label: "Images",
      name: "images",
      rules: [{ required: true, message: "Please upload at least one image!" }],
      component: (
        <Upload
          customRequest={handleCustomUpload}
          listType="picture-card"
          fileList={uploadedImageUrls.map((url, index) => ({
            uid: String(index),
            name: url.split("/").pop() || `image-${index + 1}`,
            status: "done",
            url,
          }))}
          onRemove={handleRemove}
        >
          {uploadedImageUrls.length < 5 && (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      ),
    },
  ];

  const handleDrawerOpen = () => setDrawerVisible(true);


  const FormValue = (values: any) => {
    delete values.nestedItems;
    delete values.image;
    const finalData = {
      ...values,
      images: uploadedImageUrls,
      invite_url: InviteUrl,
    };
    if (initialValues?._id) {
      callBackServer(
        {
          method: updateRoute.method,
          endpoint: `${updateRoute.endpoint}/${initialValues._id}`,
          data: finalData,
        },
        updateRoute.identifier
      );
    } else {
      callBackServer(
        {
          method: addRoute.method,
          endpoint: addRoute.endpoint,
          data: finalData,
        },
        addRoute.identifier
      );
    }
    setDrawerVisible(false);
    form.resetFields();
    setUploadedImageUrls([]);
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
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleDrawerOpen}>
            Add E-Invite
          </Button>
        </div>
      </Row>

      <Table columns={columns} dataSource={items?.result} rowKey="id" />

      <Drawer
        title="Add New Invite"
        placement="right"
        onClose={resetForm}
        open={drawerVisible}
        width={600}
      >
        <AntdForm
          form={form}
          initialValues={initialValues}
          formItems={formItems}
          nestedInputs={nestedInputs}
          nested={true}
          FormValue={FormValue}
          formColumns={formColumns}
          onChildCancel={resetForm}
        />
      </Drawer>
    </div>
  );
};

export default memo(EInviteCrud);
