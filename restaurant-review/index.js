document.getElementById('btnNewReview').onclick = function () {
  location.href =
    'file:///Users/sengkitmun/ga_seir/projects/open-restaurant-map/restaurant-review/addReview.html'
}

let reviews = localStorage.getItem('reviews')

reviews = JSON.parse(reviews)

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
