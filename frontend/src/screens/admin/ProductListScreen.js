import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Col, Row } from "react-bootstrap";
import Message from "../../components/Message";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productApiSlice";
const ProductListScreen = () => {
  const pageNumber = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery(pageNumber);
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete product ?")) {
      try {
        await deleteProduct(id);
        toast.success("Product Deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product ?")) {
      try {
        await createProduct();
        toast.success("Product Created");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <i className="fa fa-edit"></i>Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <i className="fa fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(product._id)}
                      className="btn-sm"
                    >
                      <i className="fa fa-trash" style={{ color: "white" }}></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
