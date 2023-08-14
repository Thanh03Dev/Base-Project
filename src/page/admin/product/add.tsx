import { useAddProductMutation } from "@/api/product";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
type FieldType = {
    name?: string;
    price?: string;
};

const Add = () => {
    const [addProduct, { isLoading }] = useAddProductMutation();
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        addProduct(values)
            .unwrap()
            .then(() => {
                navigate("/admin/products");
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm sách</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên sách"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên sách!" },
                        { min: 3, message: "Sách ít nhất phải 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá sách"
                    name="price"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên sách!" },
                        { min: 3, message: "Sách ít nhất phải 3 ký tự" },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="TextArea" name="desc">
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Select" name="option">
                    <Select>
                        <Select.Option value="c1">c1</Select.Option>
                        <Select.Option value="c2">c2</Select.Option>
                        <Select.Option value="c3">c3</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm sách"
                        )}
                    </Button>
                    <Button
                        className="ml-2"
                        type="primary"
                        danger
                        htmlType="submit"
                        onClick={() => navigate("/admin/products")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Add