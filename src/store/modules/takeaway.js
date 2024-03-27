import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const foodSlice = createSlice({
  name: 'takeaway',
  initialState: {
    foodsList: [],
    activeIndex: 0,
  },
  reducers: {
    getFoodsList(state, action) {
      state.foodsList = action.payload
    },
    changeIndex(state, action){
      state.activeIndex = action.payload
    }
  },
})

const {getFoodsList, changeIndex} = foodSlice.actions
//异步获取foodlist
const fetchFoodsList = () => {
  return async (dispatch)=> {
    const res = await axios.get('http://localhost:3004/takeaway')
    dispatch(getFoodsList(res.data))
  }
}
export {fetchFoodsList, changeIndex}

export default foodSlice.reducer
