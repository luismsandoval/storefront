import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategory } from "./productsSlice";

export const Categories = () => {
  // const selectedCategory = useAppSelector(
  //   (state) => state.products.selectedCategory
  // );
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("");


  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={tab}
        onChange={(event: React.SyntheticEvent, value: string) => {
          let category = value === "" ? undefined : value;
          dispatch(selectCategory(category));
          setTab(value);
        }}
      >
        <Tab label="All Products" value="" />
        <Tab label="One" value="one" />
        <Tab label="Two" value="two" />
      </Tabs>
    </Box>
  );
};
