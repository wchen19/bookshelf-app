let lists = [];
const key = "BOOKSHELF";

function refreshList() {
  let incompleteList = document.getElementById(incomplete);
  let completeList = document.getElementById(complete);

  for (let list of lists) {
    const newList = makeList(
      list.id,
      list.title,
      list.author,
      list.year,
      list.isComplete
    );
    newList[book_id] = list.id;

    if (list.isComplete) {
      completeList.append(newList);
    } else {
      incompleteList.append(newList);
    }
  }
}

function checkStorage() {
  if (typeof Storage === undefined) {
    alert("Local Storage Not Found");
    return false;
  }
  return true;
}

function saveList() {
  const parsed = JSON.stringify(lists);
  localStorage.setItem(key, parsed);
  document.dispatchEvent(new Event("onsaved"));
}

document.addEventListener("onsaved", () => {
  console.log("Data Updated");
});

function alertUpdate() {
  alert("Data Updated");
}

function loadList() {
  const getData = localStorage.getItem(key);
  let data = JSON.parse(getData);
  if (data !== null) {
    lists = data;
  }
  document.dispatchEvent(new Event("onloaded"));
}

document.addEventListener("onloaded", () => {
  refreshList();
});

function updateList() {
  if (checkStorage()) {
    saveList();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const insertForm = document.getElementById("insertBook");
  const option = document.getElementsByTagName("h3");

  option[0].addEventListener("click", function (event) {
    switchOption(event.target.className, event.target);
  });
  option[1].addEventListener("click", function (event) {
    switchOption(event.target.className, event.target);
  });
  insertForm.addEventListener("submit", function (event) {
    event.preventDefault();
    verify();
  });

  if (checkStorage()) {
    loadList();
  }
});

function findBook() {
  const bookTitle = document.querySelector("#searchTitle").value;
  for (let list of lists) {
    if (bookTitle == "") {
      reset();
    } else if (list.title.toUpperCase().includes(bookTitle.toUpperCase())) {
      document.getElementById(list.id).removeAttribute("hidden");
    } else if (list.title !== bookTitle) {
      document.getElementById(list.id).setAttribute("hidden", "hidden");
    }
  }
}

const searchForm = document.getElementById("searchBook");
searchForm.addEventListener("input", findBook);

function reset() {
  for (let list of lists) {
    document.getElementById(list.id).removeAttribute("hidden");
  }
  return;
}

function findList(book_id) {
  for (let list of lists) {
    if (list.id == book_id) {
      return list;
    }
  }
  return null;
}

function findListIndex(book_id) {
  let index = 0;
  for (let list of lists) {
    if (list.id == book_id) {
      return index;
    }
    index++;
  }
  return -1;
}
