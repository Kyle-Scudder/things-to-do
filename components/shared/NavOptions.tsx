'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Icon from './Icon'
import { type ICategory } from '@/lib/models/category'
import HoldToDeleteComponent from '../ui/hold-to-delete-button'
import { deleteToast } from '@/lib/actions/toast.actions'
import { deleteCategory } from '@/lib/actions/category.actions'

export default function NavOptions(props: {
  position: string
  categories: ICategory[] | null
  func: (categories: ICategory[]) => void
  pullLeftSideBarOpen: (open: boolean) => void
}): JSX.Element {
  const [categoryList, setCategoryList] = useState<ICategory[]>(
    props.categories ?? []
  )
  // Update categoryList whenever props.categories changes
  useEffect(() => {
    setCategoryList(props.categories ?? [])
  }, [props.categories])

  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='contents w-full'>
      <a
        href='/'
        className={`${props.position}_link 
        ${pathname === '/' && 'bg-primary-500'}`}
      >
        <Icon
          name={'IconHome'}
          stroke='1'
          strokeLinejoin='miter'
          isActive={false}
        />
        <p className='text-dark-2 dark:text-light-1 flex relative'>Home</p>
      </a>
      {categoryList.map((category) => {
        const isActive =
          (pathname.includes(category._id.toString().toLowerCase()) &&
            category._id.toString().toLowerCase().length > 1) ||
          pathname === category._id.toString().toLowerCase()
        return (
          <HoldToDeleteComponent
            key={category._id.toString()}
            isActive={isActive}
            text={`${category.text} (${category.todoCount})`}
            icon={category.icon}
            holdText={`Deleting ${category.text}...`}
            onHoldStart={async () => {
              const updatedArray = categoryList.filter(
                (item) => item._id !== category._id
              )
              setCategoryList(updatedArray)
              await deleteToast(category)
              await deleteCategory(category)
              props.func(updatedArray)
            }}
            onHoldEnd={() => {
              props.pullLeftSideBarOpen(false)
              router.push(`/list/${category._id}`)
            }}
          ></HoldToDeleteComponent>
        )
      })}
    </div>
  )
}
