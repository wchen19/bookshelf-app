const incomplete = "incompleteBookshelf";
const complete = "completeBookshelf";
const book_id = "bookId";

function switchOption(target, el) {
  const h3 = document.getElementsByTagName("h3");
  const completeTab = document.getElementById(complete);
  const incompleteTab = document.getElementById(incomplete);

  if (target == "open") {
    return;
  } else if (target.className == null) {
    el.classList.add("open");
    if (el == h3[0]) {
      h3[1].classList.remove("open");
      completeTab.setAttribute("hidden", "hidden");
      incompleteTab.removeAttribute("hidden");
    } else if (el == h3[1]) {
      h3[0].classList.remove("open");
      incompleteTab.setAttribute("hidden", "hidden");
      completeTab.removeAttribute("hidden");
    }
  }
}

function verify() {
  if (confirm("Insert book?")) {
    insertBook();
  } else {
    return;
  }
}

function createButton(buttonType, text, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonType);
  button.innerText = text;
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function addToFinishShelf(target) {
  if (confirm("Move this book to Finished Reading?")) {
    const title = target.querySelector("#title").innerText;
    const author = target.querySelector("#author").innerText;
    const year = Number(target.querySelector("#year").innerText);
    const completeList = document.getElementById(complete);

    const list = findList(target[book_id]);
    list.isComplete = true;
    const newList = makeList(list.id, title, author, year, true);
    newList[book_id] = list.id;
    completeList.append(newList);
    target.remove();
    updateList();
    alertUpdate();
  } else {
    return;
  }
}

function createFinishButton() {
  return createButton("finishButton", "Finished Reading", function (event) {
    addToFinishShelf(event.target.parentElement.parentElement.parentElement);
  });
}

function addToNotFinishShelf(target) {
  if (confirm("Move this book to Not Finished Reading?")) {
    const title = target.querySelector("#title").innerText;
    const author = target.querySelector("#author").innerText;
    const year = Number(target.querySelector("#year").innerText);
    const incompleteList = document.getElementById(incomplete);

    const list = findList(target[book_id]);
    list.isComplete = false;
    const newList = makeList(list.id, title, author, year, false);
    newList[book_id] = list.id;
    incompleteList.append(newList);
    target.remove();
    updateList();
    alertUpdate();
  } else {
    return;
  }
}

function createNotFinishButton() {
  return createButton("notFinishButton", "Not Finished Reading", function (event) {
      addToNotFinishShelf(
        event.target.parentElement.parentElement.parentElement
      );
    }
  );
}

function deleteBook(target) {
  if (confirm("Delete this book?")) {
    const index = findListIndex(target[book_id]);
    lists.splice(index, 1);
    target.remove();
    updateList();
    alertUpdate();
  } else {
    return;
  }
}

function createDeleteButton() {
  return createButton("deleteButton", "Delete Book", function (event) {
    deleteBook(event.target.parentElement.parentElement.parentElement);
  });
}

function insertBook() {
  const incompleteList = document.getElementById(incomplete);
  const completeList = document.getElementById(complete);
  const title = document.getElementById("inputTitle").value;
  const author = document.getElementById("inputAuthor").value;
  const year = Number(document.getElementById("inputYear").value);
  const isComplete = document.getElementById("inputIsComplete").checked;

  const listObject = {
    id: +new Date(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };
  const list = makeList(listObject.id, title, author, year, isComplete);

  list[book_id] = listObject.id;
  lists.push(listObject);

  if (isComplete) {
    completeList.append(list);
  } else {
    incompleteList.append(list);
  }
  updateList();
  document.getElementById("inputTitle").value='';
  document.getElementById("inputAuthor").value='';
  document.getElementById("inputYear").value='';
  document.getElementById("inputIsComplete").checked=false;
  alertUpdate();
}

function makeList(id, title, author, year, isComplete) {
  const div = document.createElement("div");
  div.setAttribute("id", id);
  const article = document.createElement("article");
  article.classList.add("book_item");
  const book = document.createElement("div");
  book.classList.add("book");
  const h2 = document.createElement("h2");
  h2.setAttribute("id", "title");
  const pAuthor = document.createElement("p");
  pAuthor.setAttribute("id", "author");
  const pYear = document.createElement("p");
  pYear.setAttribute("id", "year");
  const action = document.createElement("div");
  action.classList.add("action");
  const hr = document.createElement("hr");

  h2.innerText = title;
  pAuthor.innerText = author;
  pYear.innerText = year;
  book.append(h2, pAuthor, pYear);

  if (isComplete) {
    action.append(createNotFinishButton(), createDeleteButton());
  } else {
    action.append(createFinishButton(), createDeleteButton());
  }
  article.append(book, action);
  div.append(article, hr);

  return div;
}
