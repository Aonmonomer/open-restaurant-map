//import review model
import Review from './model/review.js'

//tips
//research how to import module scripts in html.
//if not import and export does not work.

const backToIndex = () => {
  location.href = '/index.html'
}
if (localStorage.getItem('reviews') == null) {
  localStorage.setItem('reviews', '[]')
}

const createReview = () => {
  const restName = document.getElementById('restaurantName').value

  if (restName === '' || restName === null) {
    alert('Please enter a restaurant name.')
  } else {
    let checkedRating = 0

    const ratingArr = document.getElementsByName('rating')
    for (let i = 0; i < ratingArr.length; i++) {
      if (ratingArr[i].checked == true) {
        checkedRating = parseInt(ratingArr[i].value)
      }
    }

    // replace this line with new review class
    // const review = { name: restName, rating: checkedRating }
    // const review = new Review(restName, checkedRating)
    const review = new Review({ name: restName, rating: checkedRating })

    let allreviews = localStorage.getItem('reviews')
    allreviews = JSON.parse(allreviews)
    allreviews.push(review)

    allreviews = JSON.stringify(allreviews)
    localStorage.setItem('reviews', allreviews)

    backToIndex()
  }
}

const submitBtn = document.getElementById('btnReviewSubmit')
submitBtn.addEventListener('click', createReview)

const backToIndexBtn = document.getElementById('btnBackToIndex')
backToIndexBtn.addEventListener('click', backToIndex)
