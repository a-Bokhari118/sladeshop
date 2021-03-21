import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from '../../actions/userActions';
import { UPDATE_USER_RESET } from '../../constants/userConstants';

const UpdateUser = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);
  const userId = match.params.id;
  useEffect(() => {
    if (user?._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Profile Updated Successfully');
      history.push('/admin/users');

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, alert, history, isUpdated, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('role', role);
    dispatch(updateUser(user._id, formData));
  };

  return (
    <>
      <MetaData title={`Edit User Info`} />
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
          <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
              <form className='shadow-lg' onSubmit={submitHandler}>
                <h1 className='mt-2 mb-5'>Edit User</h1>

                <div className='form-group'>
                  <label htmlFor='name_field'>Name</label>
                  <input
                    type='name'
                    id='name_field'
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label for='email_field'>Email</label>
                  <input
                    type='email'
                    id='email_field'
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label for='role_field'>Role</label>

                  <select
                    id='role_field'
                    className='form-control'
                    name='role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value='user'>user</option>
                    <option value='admin'>admin</option>
                  </select>
                </div>

                <button
                  type='submit'
                  className='btn update-btn btn-block mt-4 mb-3'
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
