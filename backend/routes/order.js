const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrders,
  deleteOrders,
  updateQty,
} = require('../controllers/orderController');
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/order/newqty/:id').put(isAuthenticatedUser, updateQty);

router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);

router
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrders)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrders);

module.exports = router;
