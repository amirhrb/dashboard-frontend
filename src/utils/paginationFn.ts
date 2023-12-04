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
  if (page === 1)
    middleButtonsNumbers = Array.from(Array(buttonsCount).keys()).map(
      (_i, index) => index
    );
  else
    middleButtonsNumbers = Array.from(Array(buttonsCount).keys()).map(
      (_i, index) => index + page - 1
    );
  return {
    left,
    right,
    middleButtonsNumbers,
  };
};
