import Review from '../model/review.js'

export default class ReviewService {
  static insert(review) {
    // insert a single review class into local storage
    // receive a single review
    //do last
    //id (primary key) will be generated here
  }

  static update(review) {
    // update a single review class in local storage
    // based on the review class id
  }

  static delete(review) {
    // delete a single review class in local storage
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
