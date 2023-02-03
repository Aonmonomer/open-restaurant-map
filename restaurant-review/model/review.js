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
    this.name = option.name
    this.rating = option.rating
  }
}
