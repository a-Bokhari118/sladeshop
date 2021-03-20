import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';

import { getOrderDetails, clearErrors } from '../../actions/orderActions';

const OrderDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order = {} } = useSelector(
    (state) => state.orderDetails
  );
  console.log(order);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  const shippingDetails = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.postalCode}, ${shippingInfo?.country} `;
  return (
    <>
      <MetaData title={`Order Details: ${order._id}`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='row d-flex justify-content-between'>
            <div className='col-12 col-lg-8 mt-5 order-details'>
              <h1 className='my-5'>Order # {order._id}</h1>

              <h4 className='mb-4'>Shipping Info</h4>
              <p>
                <b>Name:</b> {user?.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo?.phoneNo}
              </p>
              <p className='mb-4'>
                <b>Address:</b> {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className='my-4'>Payment</h4>
              <p
                className={
                  paymentInfo?.status === 'succeeded'
                    ? 'greenColor'
                    : 'redColor'
                }
              >
                <b>
                  {paymentInfo?.status === 'succeeded'
                    ? `PAID at ${String(order.paidAt).substring(0, 10)}`
                    : 'NOT PAID'}
                </b>
              </p>

              <h4 className='my-4'>Order Status:</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes('Delivered')
                    ? 'greenColor'
                    : 'redColor'
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className='my-4'>Order Items:</h4>

              <hr />
              <div className='cart-item my-1'>
                {orderItems?.map((item) => (
                  <div className='row my-5' key={item.product}>
                    <div className='col-4 col-lg-2'>
                      <img
                        src={item.image}
                        alt={item.name}
                        height='45'
                        width='65'
                      />
                    </div>

                    <div className='col-5 col-lg-5'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                      <p>${item.price}</p>
                    </div>

                    <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                      <p>{item.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
