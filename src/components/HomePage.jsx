import React ,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux' 
import {fetchCategories } from '../redux/actions/categoriesAction'
import {fetchProducts } from '../redux/actions/productsAction'
import TopSellingProduct from './TopSellingProduct'
import FlashSalesProducts from './FlashSalesProducts'
import CategoryProducts from './CategoryProducts'
import CataegoryList from './CataegoryList'



const HomePage = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state)=>state.categories)
  const products = useSelector((state)=>state.products)

  useEffect(()=>{
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  
  })
  return (
    <div>
      <TopSellingProduct/>
      <FlashSalesProducts/>
      <CategoryProducts/>
      <CataegoryList/>
    </div>
  )
}

export default HomePage
