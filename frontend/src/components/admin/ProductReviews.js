import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import { getProductReviews, clearErrors } from '../../actions/productActions';
import { GET_REVIEWS_RESET } from '../../constants/productConstants';
import { Link } from 'react-router-dom';

const ProductReviews = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [productId, setProductId] = useState('');

  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (productId !== '') {
      dispatch(getProductReviews(productId));
    }

    // if (isDeleted) {
    //   alert.success('User Deleted Successfully');
    //   history.push('/admin/users');
    //   dispatch({ type: DELETE_USER_RESET });
    // }
  }, [dispatch, alert, error, productId]);

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'Review Id',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };
    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions: (
          <Link>
            <button
              classNameName='btn btn-danger py-1 px-2 ml-2'
              //   onClick={() => deleteReviewHandler(review._id)}
            >
              <i classNameName='fa fa-trash'></i>
            </button>
          </Link>
        ),
      });
    });
    return data;
  };

  //   const deleteUserHandler = (id) => {
  //     dispatch(deleteUser(id));
  //   };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };
  return (
    <>
      <MetaData title={`Reviews`} />
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
          <>
            <div className='row justify-content-center mt-5'>
              <div className='col-5'>
                <form onSubmit={submitHandler}>
                  <div className='form-group'>
                    <label htmlFor='productId_field'>Enter Product ID</label>
                    <input
                      type='text'
                      id='productId_field'
                      className='form-control'
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id='search_button'
                    type='submit'
                    className='btn btn-primary btn-block py-2'
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>
            {reviews?.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className='px-3'
                bordered
                striped
                hover
                responsive
              />
            ) : (
              <p className='mt-5 text-center'>No Reviews</p>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
