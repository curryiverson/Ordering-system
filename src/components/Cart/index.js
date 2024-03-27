import classNames from 'classnames'
import Count from '../Count'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import {increCount, decreCount, clearCart} from '../../store/modules/takeaway'

const Cart = () => {
  const {cartList} = useSelector(state => state.foods)
  const dispatch = useDispatch()

  const totolPrice = cartList.reduce((pre, item) => {
    return pre + item.price * item.count
  }, 0)
  const [visible, setVisible] = useState(false)
  const changeVisible = () => {
    if(cartList.length){
      setVisible(!visible)
    }
  }
  useEffect(() => {
    if(!cartList.length){
      setVisible(false)
    }
  },[cartList])
  // 减号购物车按钮
  const onMinus = (item) => {
    dispatch(decreCount(item))
  }
  // 加号购物车按钮
  const onPlus = (item) => {
    console.log('onPlus')
    dispatch(increCount(item))
  }
  //清空购物车
  const clearCartList = () => {
    dispatch(clearCart())
  }
  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div
        onClick={() => setVisible(false)}
        className={classNames('cartOverlay', visible && 'visible')}
      />
      <div className="cart">
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div className={classNames('icon', cartList.length && 'fill') } onClick={changeVisible}>
          {true && <div className="cartCornerMark">{cartList.length}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totolPrice.toFixed(2)}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {false ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel', visible && 'visible')}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={clearCartList}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cartList.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    onMinus={() => onMinus(item)}
                    onPlus={() => onPlus(item)}
                    count={item.count}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart
