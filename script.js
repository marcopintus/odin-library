let myLibrary = [];

function Book(name,author,pages,read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.name} was written by ${this.author}, has ${this.pages} and ${this.read == true? "has been read":"has not been read yet."}`
    }
}

const test = new Book("Test","Nobody",243,true)
console.log(test.info())


function addBookToLibrary(book) {
    myLibrary.push(book);    
  }

addBookToLibrary(test)

console.log(myLibrary)