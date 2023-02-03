import Review from './model/review.js'

// document.getElementById('btnNewReview').onclick = function () {
//   location.href = '/addReview.html'
// }
;(function init() {
  if (localStorage.getItem('reviews') == null) {
    localStorage.setItem('reviews', '[]')
  }
  display()
})()

function createReview() {
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
    const review = new Review({ name: restName, rating: checkedRating })

    let allreviews = localStorage.getItem('reviews')
    allreviews = JSON.parse(allreviews)
    allreviews.push(review)

    allreviews = JSON.stringify(allreviews)
    localStorage.setItem('reviews', allreviews)
    // popupOverlay.style.display = 'none'
    // popupOverlayDisplay('none')
    closeReviewPopup()
    display()
  }
}

const submitBtn = document.getElementById('btnReviewSubmit')
submitBtn.addEventListener('click', createReview)

// const editReview = () => {}
// const editBtn = document.getElementById('btn')
// editBtn.addEventListener('click', editReview)

function popupOverlayDisplay(display) {
  const popupOverlay = document.getElementById('popup-overlay')
  popupOverlay.style.display = display
}

function showReviewPopup() {
  // popupOverlay.style.display = 'block'
  popupOverlayDisplay('block')
}
const btnNewReview = document.getElementById('btnNewReview')
btnNewReview.addEventListener('click', showReviewPopup)

function closeReviewPopup() {
  // popupOverlay.style.display = 'none'
  popupOverlayDisplay('none')
}

// rename btnBackToIndex
const btnClosePopup = document.getElementById('btnClosePopup')
btnClosePopup.addEventListener('click', closeReviewPopup)

function deleteReview(event) {
  let reviews = localStorage.getItem('reviews')
  reviews = JSON.parse(reviews)
  reviews.splice(event.target.value, 1)
  reviews = JSON.stringify(reviews)
  localStorage.setItem('reviews', reviews)
  display()
}

function display() {
  let reviews = localStorage.getItem('reviews')

  reviews = JSON.parse(reviews)

  // Build a list of review classes using variable that I have - array of objects
  //instantiate the class - array / object ---> array of classes
  // not a single line - manipulate array - loop
  for (let i = 0; i < reviews.length; i++) {
    reviews[i] = new Review(reviews[i])
    console.log(reviews)
  }

  const allReviewsDiv = document.getElementById('allReviewsDiv')
  allReviewsDiv.innerHTML = ''

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

    // const editReview = () => {
    //   const divEditRestName = document.createElement('input')
    //   divEditRestName.value = 'Cedric'
    //   divRestName.appendChild(divEditRestName)
    //   // const divEditRating = document.createElement('input')
    //   // divEditRating.type = "checkbox"
    // }

    const btnEditReview = document.createElement('button')
    btnEditReview.innerText = 'Edit'
    // btnEditReview.id = 'btnEditReview' + i
    divReview.appendChild(btnEditReview)
    // btnEditReview.addEventListener('click', editReview)

    const btnDeleteReview = document.createElement('button')
    btnDeleteReview.innerText = 'Delete'
    btnDeleteReview.value = i
    divReview.appendChild(btnDeleteReview)
    // btnDeleteReview.addEventListener('click', deleteReview)
    btnDeleteReview.addEventListener('click', deleteReview)

    allReviewsDiv.appendChild(divReview)
  }
}
