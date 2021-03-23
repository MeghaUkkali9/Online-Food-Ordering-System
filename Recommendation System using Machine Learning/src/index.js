import fs from 'fs';
import csv from 'fast-csv';

import prepareRatings from './preparation/ratings';
import prepareDishes from './preparation/dishes';
import { predictWithCfUserBased, predictWithCfItemBased } from './strategies/collaborativeFiltering';
import { getDishIndexByTitle } from './strategies/common';

let DISH_META_DATA = {};
let DISH_KEYWORDS = {};
let RATINGS = [];

let ME_USER_ID = 0;

let dishesMetaDataPromise = new Promise((resolve) =>
  fs
    .createReadStream('./src/data/dish_metadata.csv')
    .pipe(csv({ headers: true }))
    .on('data', fromMetaDataFile)
    .on('end', () => resolve(DISH_META_DATA)));

let dishesKeywordsPromise = new Promise((resolve) =>
  fs
    .createReadStream('./src/data/keywords.csv')
    .pipe(csv({ headers: true }))
    .on('data', fromKeywordsFile)
    .on('end', () => resolve(DISH_KEYWORDS)));

let ratingsPromise = new Promise((resolve) =>
  fs
    .createReadStream('./src/data/ratings_dish.csv')
    .pipe(csv({ headers: true }))
    .on('data', fromRatingsFile)
    .on('end', () => resolve(RATINGS)));



function fromMetaDataFile(row) {
  DISH_META_DATA[row.id] = {
    id: row.id,
    available: row.available_all_day,
    price: row.price,
    spicy: row.spicy_level,
    hotness: row.hotness,
    title: row.original_title,
    popularity: row.popularity,
    cookingtime: row.cooking_time,
    voteAverage: row.vote_average,
    voteCount: row.vote_count,
  };
}

function fromKeywordsFile(row) {
  DISH_KEYWORDS[row.id] = {
    keywords: softEval(row.keywords, []),
  };
}

function fromRatingsFile(row) {
  RATINGS.push(row);
}

console.log('Reading data from files ... \n');

Promise.all([
  dishesMetaDataPromise,
  dishesKeywordsPromise,
  ratingsPromise,
]).then(init);

function init([ dishMetaData, dishKeywords, ratings ]) {
  /* ------------ */
  //  Preparation //
  /* -------------*/

  const {
    DISHES_BY_ID,
    DISH_IN_LIST,
    X,
  } = prepareDishes(dishMetaData, dishKeywords);

  let ME_USER_RATINGS = [
    addUserRating(ME_USER_ID, 'Chicken Masala', '5.0', DISH_IN_LIST),
    addUserRating(ME_USER_ID, 'Chicken Tikka Masala', '4.0', DISH_IN_LIST),
    addUserRating(ME_USER_ID, 'Rasgula', '3.0', DISH_IN_LIST),
    addUserRating(ME_USER_ID, 'Vanilla Cake', '4.0', DISH_IN_LIST),
    addUserRating(ME_USER_ID, 'Lemonade-Lime Mocktail', '3.0', DISH_IN_LIST),
    addUserRating(ME_USER_ID, 'Motichoor Rabdi', '3.0', DISH_IN_LIST),
    addUserRating(ME_USER_ID, 'Jalebi', '5.0', DISH_IN_LIST),
    addUserRating(ME_USER_ID, 'Tiramasu Cake', '1.0', DISH_IN_LIST),
    addUserRating(ME_USER_ID, 'Kachori', '1.0', DISH_IN_LIST),
  ];


  const {
    ratingsGroupedByUser,
    ratingsGroupedByDish,
  } = prepareRatings([ ...ME_USER_RATINGS, ...ratings ]);

  console.log('\n');
  console.log('Collaborative-Filtering (User-Based) Prediction \n');

  const cfUserBasedRecommendation = predictWithCfUserBased(
    ratingsGroupedByUser,
    ratingsGroupedByDish,
    ME_USER_ID
  );

  console.log('Prediction \n');
  console.log(sliceAndDice(cfUserBasedRecommendation, DISHES_BY_ID, 10, true));

  /* ----------------------------------- */
  //  Collaborative-Filtering Prediction //
  //             Item-Based              //
  /* ----------------------------------- */

  console.log('\n');
  console.log('Collaborative-Filtering (Item-Based) Prediction ... \n');

  const cfItemBasedRecommendation = predictWithCfItemBased(
    ratingsGroupedByUser,
    ratingsGroupedByDish,
    ME_USER_ID
  );

  console.log('Prediction \n');
  console.log(sliceAndDice(cfItemBasedRecommendation, DISHES_BY_ID, 10, true));

  console.log('\n');
  console.log('End ...');
}

export function addUserRating(userId, searchTitle, rating, DISH_IN_LIST) {
  const { id, title } = getDishIndexByTitle(DISH_IN_LIST, searchTitle);

  return {
    userId,
    rating,
    dishId: id,
    title,
  };
}

export function sliceAndDice(recommendations, DISHES_BY_ID, count, onlyTitle) {
  recommendations = recommendations.filter(recommendation => DISHES_BY_ID[recommendation.dishId]);

  recommendations = onlyTitle
    ? recommendations.map(mr => ({ title: DISHES_BY_ID[mr.dishId].title, score: mr.score }))
    : recommendations.map(mr => ({ dish: DISHES_BY_ID[mr.dishId], score: mr.score }));

  return recommendations
    .slice(0, count);
}

export function softEval(string, escape) {
  if (!string) {
    return escape;
  }

  try {
    return eval(string);
  } catch (e) {
    return escape;
  }
}