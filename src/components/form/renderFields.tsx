import { Form, Input, Select, Checkbox, InputNumber } from "antd";

const FormRenderField = (field: any) =>
{
    switch (field.type)
    {
        case "number":
            return (
                <Form.Item
                    name={field.name}
                    label={field.label}
                    rules={field.rules}
                >
                    <InputNumber placeholder={`Please enter ${field.label}`} />
                </Form.Item>
            );
        case "text":
            return (
                <Form.Item
                    name={field.name}
                    label={field.label}
                    rules={field.rules}
                >
                    <Input placeholder={`Please enter ${field.label}`} />
                </Form.Item>
            );
        case "textarea":
            return (
                <Form.Item
                    name={field.name}
                    label={field.label}
                    rules={field.rules}
                >
                    <Input.TextArea rows={4} placeholder={`Please enter ${field.label}`} />
                </Form.Item>
            );
        case "select":
            return (
                <Form.Item
                    name={field.name}
                    label={field.label}
                    rules={field.rules}
                >
                    <Select placeholder={`Please select ${field.label}`} options={field.options} />
                </Form.Item>
            );
        case "checkbox":
            return (
                <Form.Item
                    name={field.name}
                    valuePropName="checked"
                    label={field.label}
                    rules={field.rules}
                >
                    <Checkbox />
                </Form.Item>
            );
        default:
            return null;
    }
};

export default FormRenderField;
