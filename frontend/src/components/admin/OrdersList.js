import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getAllOrders, clearErrors } from '../../actions/orderActions';
//import {  } from '../../constants/orderConstants';

const OrdersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (isDeleted) {
    //   alert.success('Product Deleted Successfully');
    //   dispatch({ type: DELETE_PRODUCT_RESET });
    // }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'order Id',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'No of Items',
          field: 'numofItems',
          sort: 'asc',
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };
    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link>
            <Link
              to={`/admin/order/${order._id}`}
              className='btn btn-primary py-1 px-2'
            >
              <i className='fa fa-eye'></i>
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
      <MetaData title={`All orders`} />
      <div class='row'>
        <div class='col-12 col-md-2'>
          <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
          <>
            <h1 className='my-5'>All Orders</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
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

export default OrdersList;
