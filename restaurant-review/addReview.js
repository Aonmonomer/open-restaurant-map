const backToIndex = () => {
  location.href =
    'file:///Users/sengkitmun/ga_seir/projects/open-restaurant-map/restaurant-review/index.html'
}

localStorage.setItem('reviews', '[]')

const createReview = () => {
  const restName = document.getElementById('restaurantName').value
  const review = { name: restName, rating: 5 }
  const reviews = JSON.stringify([review])

  let allreviews = localStorage.getItem('reviews')
  allreviews = JSON.parse(allreviews)
  allreviews.push(review)

  allreviews = JSON.stringify(allreviews)
  localStorage.setItem('reviews', allreviews)
}
