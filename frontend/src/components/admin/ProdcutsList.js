import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getAdminProducts, clearErrors } from '../../actions/productActions';

const ProdcutsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: 'Id',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Stock',
          field: 'stock',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };
    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <Link>
            <Link
              to={`/admin/product/${product._id}`}
              className='btn btn-primary py-1 px-2'
            >
              <i className='fa fa-pencil'></i>
            </Link>
            <button className='btn btn-danger py-1 px-2 ml-2'>
              <i className='fa fa-trash'></i>
            </button>
          </Link>
        ),
      });
    });
    return data;
  };
  return (
    <>
      <MetaData title={`All Products`} />
      <div class='row'>
        <div class='col-12 col-md-2'>
          <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
          <>
            <h1 className='my-5'>All products</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className='px-3'
                bordered
                striped
                hover
                responsive
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProdcutsList;
