'use client'
import useBrowsingHistory from '@/hooks/use-browsing-history'
import React, { useEffect, useState } from 'react'
import ProductSlider from './product/product-slider'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'

interface BrowsingHistoryListProps {
  className?: string
}
export default function BrowsingHistoryList({
  className,
}: BrowsingHistoryListProps) {
  const { products } = useBrowsingHistory()
  return (
    products.length !== 0 && (
      <div className='bg-background'>
        <Separator className={cn('mb-4', className)} />
        <ProductList
          title={"Related to items that you've viewed"}
          type='related'
        />
        <Separator className='mb-4' />
        <ProductList
          title={'Your browsing history'}
          hideDetails
          type='history'
        />
      </div>
    )
  )
}
interface ProductListProps {
  title: string
  type: 'history' | 'related'
  hideDetails?: boolean
}

function ProductList({
  title,
  type = 'history',
  hideDetails = false,
}: ProductListProps) {
  const { products } = useBrowsingHistory()
  
  const [data, setData] = useState([])

  const categoryList = products.map((p) => p.category).join(',')
  const idList = products.map((p) => p.id).join(',')

  useEffect(() => {
    const fetchProducts = async () => {
      // const res = await fetch(
      //   `/api/products/browsing-history?type=${type}&categories=${products
      //     .map((product) => product.category) //get only categories
      //     .join(',')}&ids=${products.map((product) => product.id).join(',')}`
      // )
      const res = await fetch(
        `/api/products/browsing-history?type=${type}&categories=${categoryList}&ids=${idList}`
      )

      const data = await res.json()
      setData(data)
    }
    fetchProducts()
  }, [products, type])

  return (
    data.length > 0 && (
      <ProductSlider title={title} products={data} hideDetails={hideDetails} />
    )
  )
}
