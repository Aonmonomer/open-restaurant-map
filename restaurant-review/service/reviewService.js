import Review from '../model/review.js'

export default class ReviewService {
  static insert(review) {
    // insert a single review class into local storage
    // receive a single review
    //do last
    //id (primary key) will be generated here
    let reviews = ReviewService.findAll()

    // if (reviews.length === 0) {
    //   this.id = 1
    // } else {
    //   const maxId = reviews.reduce((max, obj) => {
    //     return obj.id > max ? obj.id : max
    //   }, 0)
    //   this.id = maxId + 1
    //   console.log(this.id)
    //   reviews.push(review)
    //   reviews = JSON.stringify(reviews)
    //   localStorage.setItem('reviews', reviews)
    // }
    reviews.push(review)
    reviews = JSON.stringify(reviews)
    localStorage.setItem('reviews', reviews)
  }

  static update(id, review) {
    // update a single review class in local storage
    // based on the review class id
    let reviews = ReviewService.findAll()

    // console.log('id: ' + id)
    // console.log('review: ' + review)
    const idIndex = reviews.findIndex((review) => review.id === id)

    reviews.splice(idIndex, 1, review)
    reviews = JSON.stringify(reviews)
    localStorage.setItem('reviews', reviews)
  }

  static delete(id) {
    // delete a single review class in local storage
    // can be id as parameter
    let reviews = ReviewService.findAll()
    const idIndex = reviews.findIndex((review) => review.id === id)

    reviews.splice(idIndex, 1)
    reviews = JSON.stringify(reviews)
    localStorage.setItem('reviews', reviews)
  }

  static find(id) {
    // find a single review class in local storage
    // return a single review class
    const reviews = ReviewService.findAll()
    const result = reviews.find((review) => review.id === id)
    return result
  }

  static findAll() {
    // return an array of all reviews from local storage
    let reviews = localStorage.getItem('reviews')

    reviews = JSON.parse(reviews)

    reviews = reviews.map((review) => new Review(review))

    return reviews
  }
}
