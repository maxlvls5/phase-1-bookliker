//document.addEventListener("DOMContentLoaded", function() {});

function getBookList() {
  fetch("http://localhost:3000/books")
    .then((response) => response.json())
    .then((bookData) => bookData.forEach(displayTitles));
}

getBookList();

function displayTitles(bookData) {
  //document.createElement("li") set created element equal to variable and append
  const title = document.createElement("li");
  title.innerText = bookData.title;
  document.querySelector("ul#list").appendChild(title);

  title.addEventListener("click", () => {
    //document.querySelector("div#show-panel")
    const bookDetail = document.querySelector("div#show-panel");
    bookDetail.innerHTML = "";

    const thumbnail = document.createElement("img");
    thumbnail.src = bookData.img_url;
    bookDetail.appendChild(thumbnail);

    const description = document.createElement("p");
    description.innerText = bookData.description;
    bookDetail.appendChild(description);

    const userList = document.createElement("ul");
    bookData.users.forEach((user) => {
      const userListItem = document.createElement("li");
      userListItem.innerText = user.username;
      userList.appendChild(userListItem);
    });
    bookDetail.appendChild(userList);

    const likeButton = document.createElement("button");
    likeButton.innerText = "Like";
    likeButton.addEventListener("click", () => {
      fetch("http://localhost:3000/books/" + bookData.id, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          users: [...bookData.users, { id: 101, username: "bob" }],
        }),
      })
        .then((response) => response.json())
        .then((newBookData) => {
          bookData = newBookData;
          const newListItem = document.createElement("li");
          newListItem.innerText = "bob";
          userList.appendChild(newListItem);
        });
    });
    bookDetail.appendChild(likeButton);
  });
}
