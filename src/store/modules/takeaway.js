import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const foodSlice = createSlice({
  name: 'takeaway',
  initialState: {
    foodsList: [],
    activeIndex: 0,
    activeTag: '',
    cartList:[],
  },
  reducers: {
    getFoodsList(state, action) {
      state.foodsList = action.payload
    },
    changeIndex(state, action){
      state.activeIndex = action.payload
    },
    changeTag(state, action){
      state.activeTag = action.payload
    },
    addCart(state, action){
      //是否添加过？
      const item = state.cartList.find(item => item.id === action.payload.id)
      if(item){
        item.count++
      }else{
        action.payload.count = 1
        state.cartList.push(action.payload)
      }
    },
    increCount(state, action){
      const item = state.cartList.find(item => item.id === action.payload.id)
      item.count++
    },
    decreCount(state, action){
      const item = state.cartList.find(item => item.id === action.payload.id)
      item.count--
      if(item.count === 0){
        state.cartList = state.cartList.filter(item => item.id !== action.payload.id)
      }
    },
    clearCart(state){
      state.cartList = []
    }
  },
})

const {getFoodsList, changeIndex, changeTag, addCart, increCount, decreCount, clearCart} = foodSlice.actions
//异步获取foodlist
const fetchFoodsList = () => {
  return async (dispatch)=> {
    const res = await axios.get('http://localhost:3004/takeaway')
    dispatch(getFoodsList(res.data))
    dispatch(changeTag(res.data[0]?.tag))
  }
}
export {fetchFoodsList, changeIndex, changeTag, addCart, increCount, decreCount, clearCart}

export default foodSlice.reducer
