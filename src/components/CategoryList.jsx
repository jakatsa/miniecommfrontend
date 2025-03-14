import React from "react";
import { Link } from "react-router-dom";

const CategoryList = ({ categories }) => {
  return (
    <div className="flex flex-wrap items-start justify-center p-5 py-10">
      {Array.isArray(categories) &&
        categories.map((category) => (
          <Link
            key={category.id}
            className="relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-violet-600 text-gray-900 bg-gray-200 dark:bg-gray-400 dark:text-gray-200"
            to={`/categories/${category.slug}`}
          >
            <span className="text-sm">{category.name}romaaaass</span>
          </Link>
        ))}
    </div>
  );
};

export default CategoryList;
