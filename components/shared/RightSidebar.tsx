"use client";

import { ICategory } from "@/lib/models/category";
import { IIcon } from "@/lib/models/icon";
import AddToDo from "../forms/AddToDo";
import AddCategory from "../forms/AddCategory";
import mongoose from "mongoose";
import { useEffect, useState } from "react";

export default function RightSidebar(props: {
  categories: ICategory[];
  icons: IIcon[];
  userId: mongoose.Types.ObjectId;
  func: (categories: ICategory[]) => void;
}) {
  const [categoryList, setCategoryList] = useState<ICategory[]>(
    props.categories
  );
  useEffect(() => {
    setCategoryList(props.categories);
  }, [props.categories]);

  const pull_data = (data: ICategory) => {
    const newCatList = [...categoryList, data];
    newCatList.sort((a, b) => a.text.localeCompare(b.text));
    setCategoryList(newCatList);
    props.func(newCatList);
  };
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-dark-2 dark:text-light-1">
          Add To Do
        </h3>
        <div className="mt-7 flex w-[350px] flex-col gap-9">
          <AddToDo categories={categoryList} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-dark-2 dark:text-light-1">
          Add Category
        </h3>
        <h5 className="text-dark-2 dark:text-light-1">
          Can't find the right category? That's cool, just create it!
        </h5>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          <AddCategory
            icons={props.icons}
            userId={props.userId}
            func={pull_data}
          />
        </div>
      </div>
    </section>
  );
}
