const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');

// @desc    create new order
// @route   Post /api/v1/order/new
// @access  private
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// @desc    single order
// @route   GET /api/v1/order/:id
// @access  private
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('No Order Found', 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// @desc    get logged in user orders
// @route   GET /api/v1/orders/me
// @access  private
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//==============================================================
//Admin
//==============================================================

// @desc    GET all orders /admin
// @route   GET /api/v1/admin/orders
// @access  private
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmout = 0;

  orders.forEach((order) => {
    totalAmout += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmout,
    orders,
  });
});

// @desc    Update / proccess order / admin
// @route   PUT /api/v1/admin/order/:id
// @access  private
exports.updateOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400));
  }
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });
  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

  await order.save();
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// @desc    Delete order / admin
// @route   PUT /api/v1/admin/order/:id
// @access  private
exports.deleteOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    next(new ErrorHandler('Order Not Found!', 404));
  }

  await order.remove();
  res.status(200).json({
    success: true,
  });
});
