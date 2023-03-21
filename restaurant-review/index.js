import Review from './model/review.js'
import ReviewService from './service/reviewService.js'
;(function init() {
  if (localStorage.getItem('reviews') == null) {
    localStorage.setItem('reviews', '[]')
  }
  display()
})()

function searchReviewByRestaurantName() {
  display()
}

document
  .getElementById('searchByRestaurantNameInput')
  .addEventListener('keyup', searchReviewByRestaurantName)

function createReview() {
  const restName = document.getElementById('restaurantName').value

  if (restName === '' || restName === null) {
    alert('Please enter a restaurant name.')
  } else {
    let checkedRating = 0

    const ratingArr = document.getElementsByName('rating')

    //TODO: Refactor for loop using array method - node list to array first
    ratingArr.forEach(function (eachRating) {
      if (eachRating.checked) {
        checkedRating = parseInt(eachRating.value)
      }
    })

    const review = new Review({ name: restName, rating: checkedRating })

    ReviewService.insert(review)
    // closeReviewPopup()
    hidePopup()
    display()
  }
}

const btnNewReview = document.getElementById('btnNewReview')
btnNewReview.create = 'true'
btnNewReview.addEventListener('click', showPopup)

document
  .getElementById('btnCreateReviewSave')
  .addEventListener('click', createReview)

function hidePopup() {
  const myModal = document.querySelector('#staticBackdrop')
  bootstrap.Modal.getInstance(myModal).hide()
}

// function popupOverlayDisplay(display) {
//   const popupOverlay = document.getElementById('popup-overlay')
//   popupOverlay.style.display = display
// }
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
// function showReviewPopup(event) {
//   if (event.target.create == 'true') {
//     hideEditButton()
//     let inputRestName = document.getElementById('restaurantName')
//     inputRestName.value = ''
//     document.getElementById('5star').checked = true
//   } else {
//     hideCreateButton()
//   }
//   popupOverlayDisplay('block')
// }
// const btnNewReview = document.getElementById('btnNewReview')
// btnNewReview.create = 'true'
// btnNewReview.addEventListener('click', showReviewPopup)

// function closeReviewPopup() {
//   popupOverlayDisplay('none')
// }

// const btnClosePopup = document.getElementById('btnClosePopup')
// btnClosePopup.addEventListener('click', closeReviewPopup)

function deleteReview(event) {
  // let reviews = localStorage.getItem('reviews')
  // reviews = JSON.parse(reviews)

  // const id = event.target.value
  // for (let i = 0; i < reviews.length; i++) {
  //   if (id == reviews[i].id) {
  //     reviews.splice(i, 1)
  //   }
  // }
  // reviews = JSON.stringify(reviews)
  // localStorage.setItem('reviews', reviews)

  const id = parseInt(event.target.value)
  ReviewService.delete(id)
  display()
}

function showPopup(event) {
  const myModal = document.querySelector('#staticBackdrop')
  const popup = bootstrap.Modal.getOrCreateInstance(myModal)
  if (event.target.create == 'true') {
    hideEditButton()
    let inputRestName = document.getElementById('restaurantName')
    inputRestName.value = ''
    document.getElementById('5star').checked = true
  } else {
    hideCreateButton()
  }

  popup.show()
}
function editReview(event) {
  // showReviewPopup(event)
  showPopup(event)
  let id = parseInt(event.target.value)
  // console.log(id)
  const review = ReviewService.find(id)
  // console.log(review)
  const restName = document.getElementById('restaurantName')
  restName.value = review.name
  const ratingRadioButton = document.getElementsByName('rating')
  const rating = review.rating
  ratingRadioButton[rating - 1].checked = true
  let btnEditReviewSave = document.getElementById('btnEditReviewSave')
  btnEditReviewSave.value = id
}

let btnEditReviewSave = document.getElementById('btnEditReviewSave')
btnEditReviewSave.addEventListener('click', editReviewSave)

function editReviewSave(event) {
  const restaurantName = document.getElementById('restaurantName').value

  if (restaurantName === '' || restaurantName === null) {
    alert('Please enter a restaurant name.')
  } else {
    let checkedRating = 0

    const ratingArr = document.getElementsByName('rating')

    ratingArr.forEach(function (eachRating) {
      if (eachRating.checked) {
        checkedRating = parseInt(eachRating.value)
      }
    })

    const review = new Review({
      id: parseInt(event.target.value),
      name: restaurantName,
      rating: checkedRating
    })

    ReviewService.update(review)

    hidePopup()
    display()
  }
}
function display() {
  const reviews = ReviewService.findAll()

  const allReviewsDiv = document.getElementById('allReviewsDiv')
  allReviewsDiv.innerHTML = ''

  const searchByRestaurantNameInput = document.getElementById(
    'searchByRestaurantNameInput'
  ).value

  const filterByRestaurantName = reviews.filter((review) => {
    return review.name.includes(searchByRestaurantNameInput)
  })
  console.log(filterByRestaurantName)

  filterByRestaurantName.forEach(function (review, i) {
    const divReview = document.createElement('div')

    const divRestName = document.createElement('div')
    divRestName.innerText = review.name
    divReview.appendChild(divRestName)

    const divRating = document.createElement('div')
    divRating.innerText = review.rating
    divReview.appendChild(divRating)

    const btnEditReview = document.createElement('button')
    btnEditReview.innerText = 'Edit'
    btnEditReview.className = 'btn btn-outline-primary'
    // console.log(review.id)
    btnEditReview.value = review.id

    divReview.appendChild(btnEditReview)
    btnEditReview.addEventListener('click', editReview)

    const btnDeleteReview = document.createElement('button')
    btnDeleteReview.innerText = 'Delete'
    btnDeleteReview.className = 'btn btn-outline-primary'
    btnDeleteReview.value = review.id
    divReview.appendChild(btnDeleteReview)
    btnDeleteReview.addEventListener('click', deleteReview)

    allReviewsDiv.appendChild(divReview)
  })
}
