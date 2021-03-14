import Search from './Search';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <>
      <nav className='navbar row'>
        <div className='col-12 col-md-3'>
          <div
            className='navbar-brand d-flex justify-items-center'
            style={{ height: '100%' }}
          >
            <Link to='/'>
              <img
                src='/images/s1.png'
                alt='sladeshop'
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <h3 className='tht'>
                <span style={{ color: '#fff' }}>Slade</span>
                Shop
              </h3>
            </Link>
          </div>
        </div>

        <div className='col-12 col-md-6 mt-2 mt-md-0'>
          <Search />
        </div>

        <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
          <button className='btn' id='login_btn'>
            Login
          </button>

          <span id='cart' className='ml-3'>
            Cart
          </span>
          <span className='ml-1' id='cart_count'>
            2
          </span>
        </div>
      </nav>
    </>
  );
};

export default Header;
