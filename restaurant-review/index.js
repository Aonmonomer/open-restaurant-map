import Review from './model/review.js'
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
    closeReviewPopup()
    display()
  }
}

document
  .getElementById('btnCreateReviewSave')
  .addEventListener('click', createReview)

function popupOverlayDisplay(display) {
  const popupOverlay = document.getElementById('popup-overlay')
  popupOverlay.style.display = display
}
function hideEditButton() {
  let btnEditReviewSave = document.getElementById('btnEditReviewSave')
  let btnCreateReviewSave = document.getElementById('btnCreateReviewSave')
  btnEditReviewSave.style.display = 'none'
  btnCreateReviewSave.style.display = 'block'
}

function hideCreateButton() {
  let btnEditReviewSave = document.getElementById('btnEditReviewSave')
  let btnCreateReviewSave = document.getElementById('btnCreateReviewSave')
  btnEditReviewSave.style.display = 'block'
  btnCreateReviewSave.style.display = 'none'
}

function showReviewPopup(event) {
  popupOverlayDisplay('block')
  if (event.target.value == 6) {
    hideEditButton()
  } else if (event.target.value < 6) {
    hideCreateButton()
  }
}
const btnNewReview = document.getElementById('btnNewReview')
btnNewReview.value = 6
btnNewReview.addEventListener('click', showReviewPopup)

function closeReviewPopup() {
  popupOverlayDisplay('none')
}

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

function editReview(event) {
  showReviewPopup(event)
  let reviews = localStorage.getItem('reviews')
  reviews = JSON.parse(reviews)
  const restName = document.getElementById('restaurantName')
  let index = event.target.value
  restName.value = reviews[index].name

  const rating = reviews[index].rating // 1,2,3,4,5
  const ratingRadioButton = document.getElementsByName('rating') // array - 0,1,2,3,4
  ratingRadioButton[rating - 1].checked = true
}

function display() {
  let reviews = localStorage.getItem('reviews')

  reviews = JSON.parse(reviews)

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

    const btnEditReview = document.createElement('button')
    btnEditReview.innerText = 'Edit'
    btnEditReview.value = i
    divReview.appendChild(btnEditReview)
    btnEditReview.addEventListener('click', editReview)

    const btnDeleteReview = document.createElement('button')
    btnDeleteReview.innerText = 'Delete'
    btnDeleteReview.value = i
    divReview.appendChild(btnDeleteReview)
    // btnDeleteReview.addEventListener('click', deleteReview)
    btnDeleteReview.addEventListener('click', deleteReview)

    allReviewsDiv.appendChild(divReview)
  }
}
