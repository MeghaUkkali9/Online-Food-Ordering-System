function prepareRatings(ratings) {
  console.log('Preparing Ratings ... \n');

  const ratingCountsByDish = getRatingCountsByDish(ratings);
  const ratingCountsByUser = getRatingCountsByUser(ratings);

  const POPULARITY_TRESHOLD = {
    dishRatings: 50, 
    userRatings: 5, 
  };

  const ratingsGroupedByUser = getRatingsGroupedByUser(
    ratings,
    ratingCountsByDish,
    ratingCountsByUser,
    POPULARITY_TRESHOLD
  );

  const ratingsGroupedByDish = getRatingsGroupedByDish(
    ratings,
    ratingCountsByDish,
    ratingCountsByUser,
    POPULARITY_TRESHOLD
  );

  return { ratingsGroupedByUser, ratingsGroupedByDish };
}

export function getRatingCountsByUser(ratings) {
  return ratings.reduce((result, value) => {
    const { userId, rating } = value;

    if (!result[userId]) {
      result[userId] = 0;
    }

    result[userId]++;

    return result;
  }, {});
}

export function getRatingCountsByDish(ratings) {
  return ratings.reduce((result, value) => {
    const { dishId, rating } = value;

    if (!result[dishId]) {
      result[dishId] = 0;
    }

    result[dishId]++;

    return result;
  }, {});
}

export function getRatingsGroupedByDish(ratings, ratingCountsByDish, ratingCountsByUser, popularityThreshold) {
  const { dishRatings, userRatings } = popularityThreshold;

  return ratings.reduce((result, value) => {
    const { userId, dishId, rating, timestamp } = value;

    if (ratingCountsByDish[dishId] < dishRatings || ratingCountsByUser[userId] < userRatings) {
      return result;
    }

    if (!result[dishId]) {
      result[dishId] = {};
    }

    result[dishId][userId] = { rating: Number(rating), timestamp };

    return result;
  }, {});
}

export function getRatingsGroupedByUser(ratings, ratingCounts, popularity) {
  return ratings.reduce((result, value) => {
    const { userId, dishId, rating } = value;

    if (ratingCounts[dishId] < popularity) {
      return result;
    }

    if (!result[userId]) {
      result[userId] = {};
    }

    result[userId][dishId] = { rating: Number(rating) };

    return result;
  }, {});
}

export default prepareRatings;