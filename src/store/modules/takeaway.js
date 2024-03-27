import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const foodSlice = createSlice({
  name: 'takeaway',
  initialState: {
    foodsList: [],
    activeIndex: 0,
    activeTag: '',
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
    }
  },
})

const {getFoodsList, changeIndex, changeTag} = foodSlice.actions
//异步获取foodlist
const fetchFoodsList = () => {
  return async (dispatch)=> {
    const res = await axios.get('http://localhost:3004/takeaway')
    dispatch(getFoodsList(res.data))
  }
}
export {fetchFoodsList, changeIndex, changeTag}

export default foodSlice.reducer
