import { Form, Button, Input, Typography, Row, Col } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const AntdForm = (props) => {
  const {
    FormValue,
    formItems,
    onChildCancel,
    formColumns,
    splitLabelAndField,
    nested,
    nestedInputs,
    wrapperCol,
    labelCol,
    initialValues,
    loading,
  } = props;

  const [form] = Form.useForm();
  const columns = formColumns || 1;

  const handleCancel = () => {
    onChildCancel(false);
  };

  const onFinish = (values) => {
    FormValue(values);
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "600px 600px",
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          {formItems?.map((item, index) => (
            <Col span={24 / columns} key={index}>
              {splitLabelAndField ? (
                <div>
                  <Typography.Text strong>
                    {item.label}{" "}
                    {item.rules?.some((rule) => rule.required) && (
                      <Typography.Text type="danger">*</Typography.Text>
                    )}
                  </Typography.Text>
                  <Form.Item
                    name={item.name}
                    rules={item.rules}
                    style={{ marginTop: "8px" }}
                  >
                    {item.component}
                  </Form.Item>
                </div>
              ) : (
                <Form.Item
                  label={<Typography.Text strong>{item.label}</Typography.Text>}
                  name={item.name}
                  rules={item.rules}
                  labelCol={{ span: labelCol }}
                  wrapperCol={{ span: wrapperCol }}
                >
                  {item.component}
                </Form.Item>
              )}
            </Col>
          ))}

          {nested && (
            <Form.List name="nestedItems">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Row gutter={[16, 16]} align="middle" key={key}>
                      {nestedInputs.map((input, idx) => (
                        <Col span={24 / 4} key={idx}>
                          <Form.Item
                            {...restField}
                            name={[name, input.name]}
                            fieldKey={[fieldKey, input.name]}
                            rules={[
                              {
                                required: true,
                                message: `Missing ${input.label}`,
                              },
                            ]}
                            label={input.label}
                          >
                            <Input placeholder={input.label} />
                          </Form.Item>
                        </Col>
                      ))}
                      <Col span={2}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  ))}
                  <Row justify="center">
                    <Col span={6}>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        style={{ width: "100%" }}
                      >
                        Add More Field
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Form.List>
          )}
        </Row>

        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button onClick={handleCancel}>Cancel</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AntdForm;
