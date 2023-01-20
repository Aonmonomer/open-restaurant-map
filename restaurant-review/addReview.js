const backToIndex = () => {
  location.href =
    'file:///Users/sengkitmun/ga_seir/projects/open-restaurant-map/restaurant-review/index.html'
}

localStorage.setItem('reviews', '[]')

const createReview = () => {
  const restName = document.getElementById('restaurantName').value
  let checkedRadio = 5

  if (document.getElementById('1star').checked == true) {
    checkedRadio = 1
  } else if (document.getElementById('2star').checked == true) {
    checkedRadio = 2
  } else if (document.getElementById('3star').checked == true) {
    checkedRadio = 3
  } else if (document.getElementById('4star').checked == true) {
    checkedRadio = 4
  } else if (document.getElementById('5star').checked == true) {
    checkedRadio = 5
  } else {
    alert('Please select a rating.')
  }

  const review = { name: restName, rating: checkedRadio }
  const reviews = JSON.stringify([review])

  let allreviews = localStorage.getItem('reviews')
  allreviews = JSON.parse(allreviews)
  allreviews.push(review)

  allreviews = JSON.stringify(allreviews)
  localStorage.setItem('reviews', allreviews)
}
