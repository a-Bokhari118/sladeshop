import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

import { addItemToCart, removeItemFromCart } from '../../actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <>
      <MetaData title='Your Cart' />
      {cartItems.length === 0 ? (
        <h2 className='mt-5'>Your Cart Is Empty</h2>
      ) : (
        <>
          <h2 className='mt-5'>
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className='row d-flex justify-content-between'>
            <div className='col-12 col-lg-8'>
              {cartItems.map((item) => (
                <>
                  <hr />
                  <div className='cart-item' key={item.product}>
                    <div className='row'>
                      <div className='col-4 col-lg-3'>
                        <img
                          src={item.image}
                          alt='Laptop'
                          height='90'
                          width='115'
                        />
                      </div>

                      <div className='col-5 col-lg-3'>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                        <p id='card_item_price'>${item.price}</p>
                      </div>

                      <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                        <div className='stockCounter d-inline'>
                          <span
                            className='btn btn-danger minus'
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            -
                          </span>
                          <input
                            type='number'
                            className='form-control count d-inline'
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className='btn btn-primary plus'
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className='col-4 col-lg-1 mt-4 mt-lg-0'>
                        <i
                          id='delete_cart_item'
                          className='fa fa-trash btn btn-danger'
                          onClick={() => removeCartItemHandler(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              <hr />
            </div>

            <div className='col-12 col-lg-3 my-4'>
              <div id='order_summary'>
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{' '}
                  <span className='order-summary-values'>
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{' '}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{' '}
                  <span className='order-summary-values'>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button id='checkout_btn' className='btn btn-primary btn-block'>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
