import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { useState } from "react";
import { useAppDispatch } from "../app/hook";
import {
  setCategories,
  setOrder,
  setSearch,
  setSort,
} from "../redux/slices/paginationSlice";

const SearchComponent = () => {
  const [textSearch, setTextSearch] = useState("");
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: any) => {
    setTextSearch(e.target.value);
  };
  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setSearch(textSearch));
    dispatch(setSort(""));
    dispatch(setOrder(""));
    dispatch(setCategories(""));
    setTextSearch("");
  };
  return (
    <div className=" md:w-72 relative">
      <form action="" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="tìm kiếm"
          value={textSearch}
          className="outline-none w-full border-b rounded-xl p-2 bg-white mx-auto"
          onChange={handleSearchChange}
        />
        <button
          className="text-2xl absolute top-2/4 right-0 -translate-x-2/4 -translate-y-2/4"
          type="submit"
        >
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
