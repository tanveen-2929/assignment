import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { capturePayment, createOrder, fetchAllOrders, updateOrder } from './orderAPI';
import { useNavigate } from "react-router-dom";

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  totalOrders: 0,
};

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async ({ order, setShouldNavigate }) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay failed to load!!');
    }

    let response;
    try {
      response = await createOrder(order);
      console.log('Order created successfully', response);
    } catch (error) {
      console.error('Error creating order:', error);
      
    }

    const id = response?.data?.id;
    let paymentSuccess = false; // Track payment success

    const options = {
      key: 'rzp_test_oSItdzvqy6kWyb',
      amount: order.totalAmount * 100,
      currency: 'INR',
      name: 'Space cart',
      description: 'Thank you for purchasing the product',
      handler: async (paymentResponse) => {
        const paymentCaptureResponse = await capturePayment(order, id);
        if (paymentCaptureResponse?.data?.success) {
          console.log("Payment successful!");
          setShouldNavigate(true);
        }
      },
    };

    try {
      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', (failureResponse) => {
          console.error('Payment failed:', failureResponse.error);
        });
      } else {
        console.error('Razorpay is not available.');
        // return rejectWithValue('Razorpay is not available');
      }
    } catch (err) {
      console.error('Error opening Razorpay:', err);
      // return rejectWithValue(err);
    }
    console.log(paymentSuccess);

  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        state.orders[index] = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectStatus = (state) => state.order.status;

export default orderSlice.reducer;
