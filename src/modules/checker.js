// Burger object
//
// { type: 'TYPE', item: 'ITEM' }
//
// Golden rules of a burger
//
// 1 - Bun on top and bottom
// 2 - Use the same type of bun
// 3 - The cheese should always be above the beef
// 4 - The lettuce should always be below a bun
// 5 - Never stack two buns on top of another
// 6 - Never use the same ingredient on top of another
//
// Optional rule
//
// 1 - Vegetarian (contains no beef or bacon)
//

import { TYPES, ITEMS } from '../constants/burger'

export const isBunWrapped = burger => {
  console.log(burger);
  return burger[0].type === burger[burger.length - 1].type &&
    burger[0].item.includes('BOTTOM') &&
    burger[burger.length - 1].item.includes('TOP')
}

export const isCorrectlyWrapped = burger => {
  return burger[0].item.split('_')[1] === 'BOTTOM' && burger[burger.length - 1].item.split('_')[2] === 'TOP'
}

export const isSameBun = burger => {
  const buns = burger.filter(layer => layer.type === 'BUN')
  let types = buns.map(layer => layer.item.split('_')[0])

  types = [...new Set(types)];


  return types.length === 1
}

export const isCheeseAboveBeef = burger => {
  const ingredients = burger.map(ingredient => ingredient.item)
  console.log(ingredients);
  let valid = true
  if (ingredients.includes('CHEESE') && !ingredients.includes('BEEF')) {
    return false
  }

  if (ingredients.includes('BEEF') && !ingredients.includes('CHEESE')) {
    return true
  }

  ingredients.map((ingredient, index) => {
    if (ingredient === 'BEEF' && (ingredients[index + 1] !== 'CHEESE')) {
      valid = false
    }
    if (ingredient === 'CHEESE' && (ingredients[index - 1] !== 'BEEF')) {
      valid = false
    }
  })
  return valid
}

export const isLettuceUnderBun = burger => {
  const ingredients = burger.map(ingredient => ingredient.item)
  let valid = true

  if (!ingredients.includes('LETTUCE')) {
    return true
  }

  burger.map((layer, index) => {
    if (layer.item === 'LETTUCE' && (burger[index + 1] && burger[index + 1].type !== 'BUN')) {
      valid = false
    }
    if (layer.type === 'BUN' && (burger[index - 1] && burger[index - 1].item !== 'LETTUCE')) {
      valid = false
    }
  })
  return valid
}

export const areBunsStacked = burger => {
  // const types
}

export const isBurgerValid = burger => {
  return isBunWrapped(burger) &&
    isSameBun(burger) &&
    isCorrectlyWrapped(burger) &&
    isCheeseAboveBeef(burger) &&
    isLettuceUnderBun(burger)
}
