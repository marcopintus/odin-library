class Library {
    constructor() {
        this.books = [];
    }

    addBookToLibrary(book) {
        this.books.push(book);    
    }

    checkSame(newBook){
        return this.books.some(book => book.name == newBook.name && book.author == newBook.author)
    }

    writeLibrary() {
        for(let i =0; i<this.books.length; i++){
            appendNewBook(this.books[i])
        }
        delBtn = document.querySelectorAll(".b-remove");
        if (delBtn){
            delBtn.forEach(button => {
            button.addEventListener("click",
                (e) =>{
                    let bookId = document.getElementById(e.composedPath()[2].id);
                    bookId.remove();
                    this.books = this.books.filter(book => book.name != e.composedPath()[2].id)
                    }
            )
            }
        )
        } 
    }

    wipeLibrary(){
        booksContainer.textContent = '';
    }
}

class Book {
    constructor(name,author,pages,read){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
        }
        info() {
            return `${this.name} was written by ${this.author}, has ${this.pages} and ${this.read == true? "has been read":"has not been read yet."}`

    }
    
}

function appendNewBook(book){
    let newBook = document.createElement("div");
    newBook.setAttribute("id",book.name.toLowerCase().split(" ").join(""))
    newBook.classList.add("book");
    let i = 0;
    for(let prop  in book){
        let bookProp = document.createElement("p");
        bookProp.textContent = book[prop];
        newBook.appendChild(bookProp);
        i++;
        if(i > 2) break
    }
    let statusP = document.createElement("p")
    let statusCheck = document.createElement("input")
    statusCheck.classList.add("check-box");
    statusCheck.type = "checkbox";
    
    if(book.read){
        statusCheck.checked = true
    }
    statusP.appendChild(statusCheck)
    newBook.appendChild(statusP)

    let deleteBtn = document.createElement("button")
    deleteBtn.classList.add("b-remove");
    let delImg = document.createElement("img");
    delImg.src = "./icons/rubbish.svg";
    delImg.classList.add("delete-icon")
    newBook.setAttribute("id",book.name.toLowerCase().split(" ").join(""))
    deleteBtn.appendChild(delImg)
    newBook.appendChild(deleteBtn)

    bookTable.appendChild(newBook)
}

function submitBook(){
    let wrtnTitle = document.querySelector(".add-title").value;
    let wrtnAuthor = document.querySelector(".add-author").value;
    let wrtnPages = document.querySelector(".add-pages").value;
    let wrtnCheck = document.querySelector(".add-read").checked;
    let newBk = new Book(wrtnTitle,wrtnAuthor,wrtnPages,wrtnCheck)
    let check = myLibrary.checkSame(newBk);
    if (check == false && newBk.name != '' && newBk.name != " " ) {
        myLibrary.addBookToLibrary(newBk)
        myLibrary.wipeLibrary()
        myLibrary.writeLibrary()
        cCModal()
    } else {
        cCModal()
    }   
}

function cCModal(){
    document.querySelector(".add-title").value = '';
    document.querySelector(".add-author").value = '';
    document.querySelector(".add-pages").value = '';
    document.querySelector(".add-read").checked = false;
    modal.classList.remove("showing");
}


const bookTable = document.querySelector(".book-table");
let delBtn = document.querySelectorAll(".b-remove")
let allBooks = document.querySelectorAll(".book");
const addBtn = document.querySelector(".add-btn");
const addForm = document.querySelector(".add-form");
const modal = document.querySelector(".modal");
const addBookButton = document.querySelector(".submit-book");
const booksContainer = document.querySelector(".book-table");

let myLibrary = new Library();

addBookButton.addEventListener("click",submitBook)
addBtn.addEventListener("click",() => {
    modal.classList.add("showing")
})
modal.addEventListener("click", (e) => {
        if(e.composedPath()[0].classList[0] == "modal"){
            modal.classList.toggle("showing")
        } 
})