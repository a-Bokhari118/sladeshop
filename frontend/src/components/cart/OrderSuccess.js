import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../layout/Loader';
import axios from 'axios';

const OrderSuccess = ({ history }) => {
  const { order, loading } = useSelector((state) => state.newOrder);
  useEffect(() => {
    if (!loading && !order) {
      history.push('/');
    }
    if (!loading) {
      const upQty = async () => {
        try {
          await axios.put(`/api/v1/order/newqty/${order.order._id}`);
        } catch (error) {
          console.log(error);
        }
      };
      upQty();
    }
  }, [order, loading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Order Success`} />

          <div className='row justify-content-center'>
            <div className='col-6 mt-5 text-center'>
              <img
                className='my-5 img-fluid d-block mx-auto'
                src='/images/done.png'
                alt='Order Success'
                width='200'
                height='200'
              />

              <h2>Your Order has been placed successfully.</h2>

              <Link to='/orders/me'>Go to Orders</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderSuccess;
