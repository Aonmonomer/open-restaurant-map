const backToIndex = () => {
  location.href =
    'file:///Users/sengkitmun/ga_seir/projects/open-restaurant-map/restaurant-review/index.html'
}
if (localStorage.getItem('reviews') == null) {
  localStorage.setItem('reviews', '[]')
}

const createReview = () => {
  const restName = document.getElementById('restaurantName').value
  let checkedRating = 0

  const ratingArr = document.getElementsByName('rating')
  for (let i = 0; i < ratingArr.length; i++) {
    if (ratingArr[i].checked == true) {
      checkedRating = parseInt(ratingArr[i].value)
    }
  }

  const review = { name: restName, rating: checkedRating }

  let allreviews = localStorage.getItem('reviews')
  allreviews = JSON.parse(allreviews)
  allreviews.push(review)

  allreviews = JSON.stringify(allreviews)
  localStorage.setItem('reviews', allreviews)

  backToIndex()
}
