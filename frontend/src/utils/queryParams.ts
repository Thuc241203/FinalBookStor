import queryString from "query-string";

export const queryParams = ({ _page, _limit, _sort, _order, _search,_category }:any) => {
  const queryParams = {
    _page,
    _limit,
    _sort,
    _order,
    _search,
    _category
  }as any;
  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] === undefined || queryParams[key] === "") {
      delete queryParams[key];
    }
  });
  return queryString.stringify(queryParams);
};
