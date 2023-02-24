import Review from './model/review.js'
;(function init() {
  if (localStorage.getItem('reviews') == null) {
    localStorage.setItem('reviews', '[]')
  }
  display()
})()

function searchReviewByRestaurantName() {
  display()
}

// how to write filter syntax

document
  .getElementById('searchByRestaurantNameInput')
  .addEventListener('keyup', searchReviewByRestaurantName)
// you can refactor it to on change event .addEventListener("change"

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
    // for (let i = 0; i < ratingArr.length; i++) {
    //   if (ratingArr[i].checked == true) {
    //     checkedRating = parseInt(ratingArr[i].value)
    //   }
    // }
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
// Reset Popup to default value
function showReviewPopup(event) {
  //TODO: refactor to use button ID instead of assigning a number 6 / readability

  if (event.target.create == 'true') {
    hideEditButton()
    let inputRestName = document.getElementById('restaurantName')
    inputRestName.value = ''
    document.getElementById('5star').checked = true
  } else {
    hideCreateButton()
  }
  popupOverlayDisplay('block')
}
const btnNewReview = document.getElementById('btnNewReview')
btnNewReview.create = 'true'
btnNewReview.addEventListener('click', showReviewPopup)

function closeReviewPopup() {
  popupOverlayDisplay('none')
}

const btnClosePopup = document.getElementById('btnClosePopup')
btnClosePopup.addEventListener('click', closeReviewPopup)

function deleteReview(event) {
  let reviews = localStorage.getItem('reviews')
  reviews = JSON.parse(reviews)
  const index = event.target.value
  reviews.splice(index, 1)
  reviews = JSON.stringify(reviews)
  localStorage.setItem('reviews', reviews)
  display()
}

function editReview(event) {
  showReviewPopup(event)
  let reviews = localStorage.getItem('reviews') // old array
  reviews = JSON.parse(reviews)
  const restName = document.getElementById('restaurantName')
  // const searchByRestaurantNameInput = document.getElementById(
  //   'searchByRestaurantNameInput'
  // ).value

  // const filterByRestaurantName = reviews.filter((review) => {
  //   return review.name.includes(searchByRestaurantNameInput)
  // })
  let id = event.target.value //problem
  // console.log(typeof id)

  for (let i = 0; i < reviews.length; i++) {
    if (id == reviews[i].id) {
      // console.log(typeof reviews[i].id)
      restName.value = reviews[i].name

      const rating = reviews[i].rating // 1,2,3,4,5
      const ratingRadioButton = document.getElementsByName('rating') // array - 0,1,2,3,4
      ratingRadioButton[rating - 1].checked = true
      let btnEditReviewSave = document.getElementById('btnEditReviewSave')
      btnEditReviewSave.value = i
    }
  }
}

let btnEditReviewSave = document.getElementById('btnEditReviewSave')
// btnEditReviewSave.value = index
btnEditReviewSave.addEventListener('click', editReviewSave)

function editReviewSave(event) {
  const restaurantName = document.getElementById('restaurantName').value
  let index = event.target.value
  if (restaurantName === '' || restaurantName === null) {
    alert('Please enter a restaurant name.')
  } else {
    let checkedRating = 0

    const ratingArr = document.getElementsByName('rating')

    //TODO : Refactor for loop using array method - node list to array first
    ratingArr.forEach(function (eachRating) {
      if (eachRating.checked) {
        checkedRating = parseInt(eachRating.value)
      }
    })
    // for (let i = 0; i < ratingArr.length; i++) {
    //   if (ratingArr[i].checked) {
    //     checkedRating = parseInt(ratingArr[i].value)
    //   }
    // }
    const review = new Review({ name: restaurantName, rating: checkedRating })

    let allreviews = localStorage.getItem('reviews')
    allreviews = JSON.parse(allreviews)
    allreviews.splice(index, 1, review)

    allreviews = JSON.stringify(allreviews)
    localStorage.setItem('reviews', allreviews)
    closeReviewPopup()
    display()
  }
}
function display() {
  let reviews = localStorage.getItem('reviews')

  reviews = JSON.parse(reviews)
  // TODO: Refactor for loop using array method - Array.map
  // use return keyword in function
  reviews = reviews.map(function (review) {
    // console.log(review)
    return new Review(review)
  })
  // for (let i = 0; i < reviews.length; i++) {
  //   reviews[i] = new Review(reviews[i])
  // }

  const allReviewsDiv = document.getElementById('allReviewsDiv')
  allReviewsDiv.innerHTML = ''

  const searchByRestaurantNameInput = document.getElementById(
    'searchByRestaurantNameInput'
  ).value

  const filterByRestaurantName = reviews.filter((review) => {
    return review.name.includes(searchByRestaurantNameInput)
  })
  console.log(filterByRestaurantName)

  // TODO: Refactor for loop using array method - Array.forEach
  // for (let i = 0; i < reviews.length; i++) {
  filterByRestaurantName.forEach(function (review, i) {
    const divReview = document.createElement('div')

    const divRestName = document.createElement('div')
    // divRestName.setAttribute('id', 'review' + (i + 1))
    divRestName.innerText = review.name
    divReview.appendChild(divRestName)

    const divRating = document.createElement('div')
    // divRating.setAttribute('id', 'review' + (i + 1))
    divRating.innerText = review.rating
    divReview.appendChild(divRating)

    const btnEditReview = document.createElement('button')
    btnEditReview.innerText = 'Edit'
    console.log(review.id)
    btnEditReview.value = review.id

    divReview.appendChild(btnEditReview)
    btnEditReview.addEventListener('click', editReview)

    const btnDeleteReview = document.createElement('button')
    btnDeleteReview.innerText = 'Delete'
    btnDeleteReview.value = review.id
    divReview.appendChild(btnDeleteReview)
    // btnDeleteReview.addEventListener('click', deleteReview)
    btnDeleteReview.addEventListener('click', deleteReview)

    allReviewsDiv.appendChild(divReview)
  })
}
