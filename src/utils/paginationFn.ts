// this is how page links are handled
export const paginationHandler = ({
  limit,
  articlesCount,
  page,
  buttonsCount,
}: {
  limit: number;
  articlesCount: number;
  page: number;
  buttonsCount: number;
}) => {
  const allPagesCount = Math.ceil(articlesCount / limit);
  const left = page > 1 ? page - 1 : page;
  const right = page < allPagesCount ? page + 1 : allPagesCount;
  let middleButtonsNumbers;
  /* Note: this clause makes [0, 1, 2, 3] array 
  in map methods callback we do the mathmatical operation to get proper array
    Array.from(Array(buttonsCount).keys()).map(
      (_i, index) => index 
    );
  */
  if (page <= 1){
    // in page 1 below (maybe negative number come from url) it should be [1, 2, 3, 4]
    middleButtonsNumbers = Array.from(Array(buttonsCount).keys()).map(
      (_i, index) => index + 1
    );
  }
    // minus 2 down below is because last two page should not show not existing pages
  else if(page > 1 && page <= allPagesCount - 2){
    // if page is (1, ensingPage-2] it should be [num-1, num, num+1, num+2]
    middleButtonsNumbers = Array.from(Array(buttonsCount).keys()).map(
      (_i, index) => index + page - 1
    );
  } 
  else{
    /* in last two page and 
    page number over all amount just show 
    [last - 3, last - 2, last - 1, last] */
    middleButtonsNumbers = Array.from(Array(buttonsCount).keys()).map(
      (_i, index) => index + allPagesCount - 3
    );
  }
  return {
    left,
    right,
    middleButtonsNumbers,
  };
};
