//import review model

import Review from './model/review.js'
//tips
//research how to import module scripts in html.
//if not import and export does not work.

document.getElementById('btnNewReview').onclick = function () {
  location.href = '/addReview.html'
}

let reviews = localStorage.getItem('reviews')

reviews = JSON.parse(reviews)

// Build a list of review classes using variable that I have - array of objects
//instantiate the class - array / object ---> array of classes
// not a single line - manipulate array - loop
for (let i = 0; i < reviews.length; i++) {
  reviews[i] = new Review(reviews[i])
  console.log(reviews)
}

// 22-36 should work without changes
for (let i = 0; i < reviews.length; i++) {
  const divReview = document.createElement('div')

  const divRestName = document.createElement('div')
  // divRestName.setAttribute('id', 'review' + (i + 1))
  divRestName.innerText = reviews[i].name
  divReview.appendChild(divRestName)

  const divRating = document.createElement('div')
  // divRating.setAttribute('id', 'review' + (i + 1))
  divRating.innerText = reviews[i].rating
  divReview.appendChild(divRating)

  document.body.appendChild(divReview)
}
