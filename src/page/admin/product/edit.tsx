import {
    useEditProductMutation,
    useGetProductsByIdQuery
} from "@/api/product";
import { pause } from "@/utils/pause";
import { Button, Form, Input, Select, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
type FieldType = {
    name?: string;
    price?: string;
    desc?: string;
    option?: string;
};
const Edit = () => {
    const { id } = useParams<{ id: string }>();
    const [updateProduct, { isLoading: isUpdateLoading }] = useEditProductMutation();
    const {
        data: productData,
        isLoading: isGetProductLoading,
    } = useGetProductsByIdQuery(id || "");

    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            name: productData?.name,
            price: productData?.price,
            desc: productData?.desc,
            option: productData?.option,
        });
    }, [productData]);
    const onFinish = (values: any) => {
        updateProduct({ ...values, id: id })
            .unwrap()
            .then(async () => {
                console.log("Update success");
                await pause(3000);
                navigate("/admin/products");
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    if (isGetProductLoading) return <Skeleton />;
    return (
        <>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Sửa sách</h2>
            </header>
            <Form
                form={form}
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

                <Form.Item<FieldType> label="Giá sách" name="price">
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
                        {isUpdateLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Cập nhật sách"
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

export default Edit