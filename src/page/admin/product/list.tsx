import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
import { Button, Popconfirm, Table } from "antd";
import { Link } from "react-router-dom";

const ListAdmin = () => {
  const { data: productsList } = useGetProductsQuery();
  const [removeProduct] = useRemoveProductMutation();
  const confirm = (id: number | string) => {
    removeProduct(id)
  }
  const dataSource = productsList?.map((product) => ({
    key: product.id,
    name: product.name,
    price: product.price,
    desc: product.desc,
    option: product.option,
  }));
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Desc",
      dataIndex: "desc",
    },
    {
      title: "Option",
      dataIndex: "option",
    },
    {
      title: "Action",
      dataIndex: "key",
      render: (id: number) => (
        <>
          <div>
            <Button>
              <Link to={`${id}/edit`}>
                Sửa
              </Link>
            </Button>
            <Popconfirm
              title="Delete the task"
              onConfirm={() => confirm(id)}
              description="Are you sure to delete this task?"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default ListAdmin;
