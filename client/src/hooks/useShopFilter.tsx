import React, { useEffect, useState } from 'react';
import axios from '@src/shared/http-client';
import {
  ProductFilter,
  Category,
  Color,
} from '@src/shared/interfaces/product.interface';
import useProductStore from '@src/stores/product';

const useShopFilter = () => {
  const { categoriesData, colorsData, setCategoriesData, setColorsData } =
    useProductStore();

  const [categories, setCategories] = useState<Category[]>(categoriesData);
  const [colors, setColors] = useState<Color[]>(colorsData);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);

  const [filter, setFilter] = useState<ProductFilter>({
    categories: [],
    colors: [],
    price: [priceRange[0], priceRange[1]],
  });

  useEffect(() => {
    if (categories.length === 0 && colors.length === 0) {
      (async () => {
        try {
          const getCategories = axios.get('/products/categories');
          const getColors = axios.get('/products/colors');

          const [getCategoriesResponse, getColorsResponse] = await Promise.all([
            getCategories,
            getColors,
          ]);

          setCategoriesData(getCategoriesResponse.data.categories);
          setColorsData(getColorsResponse.data.colors);
          setCategories(getCategoriesResponse.data.categories);
          setColors(getColorsResponse.data.colors);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  return { filter, setFilter, priceRange, colors, categories };
};

export default useShopFilter;
