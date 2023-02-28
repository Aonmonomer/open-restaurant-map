//Learn how to export below class
//tips
//research how to import module scripts in html.
//if not import and export does not work.
//import will not work without proper html change

export default class Review {
  // constructor(name, rating) {
  //   this.name = name
  //   this.rating = rating
  // }
  constructor(option) {
    if (option.id) {
      this.id = option.id
      // console.log(option.id)
    } else {
      let reviews = localStorage.getItem('reviews')

      reviews = JSON.parse(reviews)
      if (reviews.length === 0) {
        this.id = 1
      } else {
        const maxId = reviews.reduce((max, obj) => {
          return obj.id > max ? obj.id : max
        }, 0)

        this.id = maxId + 1
      }
    }
    // getitem from localstorage
    // JSON parse the get item rom local storage
    // if array.length === 0 then create an id variable and put 1 into it       this.id = 1
    // else const maxId = myArray.reduce((max, obj) => obj.id > max ? obj.id : max, 0);
    // reviews.maxId + 1     this.id = maxId +1

    this.name = option.name
    this.rating = option.rating
  }
}
// ;() => {
//   return 1
// }
// ;() => 1

// if (option.id) { this.id = option.id}
// else { DO all the create thing}
