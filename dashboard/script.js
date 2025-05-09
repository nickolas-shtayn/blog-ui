const postsContainer = document.querySelector(".posts");
const createPostForm = document.querySelector("form");
const userGreeting = document.querySelector("#user-greeting");

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("jwt");

  try {
    const response = await axios.get("http://localhost:1000/user", {
      headers: { authorization: token },
    });
    userGreeting.textContent = `hello, ${response.data.userEmail}`;
    if (response.data.admin) {
      const inviteLink = document.createElement("a");
      inviteLink.textContent = "invite";
      inviteLink.href = "../invite/index.html";
      document.body.insertBefore(inviteLink, userGreeting);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await axios.get("http://localhost:1000/dashboard", {
      headers: { authorization: token },
    });
    response.data.forEach((post) => {
      const { id, name, content } = post;
      const postCard = document.createElement("div");
      postCard.classList.add("posts__card");
      postCard.setAttribute("post-id", id);
      const postHeader = document.createElement("h1");
      const postContent = document.createElement("p");
      postHeader.classList.add("posts__card--header");
      postContent.classList.add("posts__card--content");
      postHeader.textContent = name;
      postContent.textContent = content;

      if (postContent.textContent.length > 60) {
        postContent.textContent = content.substring(0, 60) + "...";
      }

      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");
      editButton.textContent = "edit";
      deleteButton.textContent = "delete";
      editButton.id = "edit";
      deleteButton.id = "delete";
      const postButtons = document.createElement("div");

      editButton.addEventListener("click", () => {
        window.location.href = `.././edit/index.html?id=${id}`;
      });

      deleteButton.addEventListener("click", async () => {
        const token = localStorage.getItem("jwt");

        try {
          const response = await axios.delete(
            "http://localhost:1000/deletepost",
            { headers: { authorization: token }, data: { id } }
          );
          if (response.status === 200) {
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      });

      postCard.addEventListener("click", (event) => {
        if (event.target.id === "edit" || event.target.id === "delete") {
          return;
        }
        window.location.href = `.././post/index.html?id=${id}`;
      });
      postButtons.appendChild(editButton);
      postButtons.appendChild(deleteButton);

      postCard.appendChild(postHeader);
      postCard.appendChild(postContent);
      postCard.appendChild(postButtons);
      postsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.log(error.response);
    if (error.response.data === "Expired") {
      localStorage.clear();
      window.location.href = ".././unauthorized/index.html";
    }
    window.location.href = ".././unauthorized/index.html";
  }
});

createPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = event.target.elements["post-title"].value.trim();
  const content = event.target.elements["post-content"].value.trim();

  if (name === "" || content === "") {
    return console.error("cannot submit empty form");
  }
  const postObj = { name, content };
  createPostForm.reset();
  const token = localStorage.getItem("jwt");
  if (!token) {
    window.location.href = ".././unauthorized/index.html";
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:1000/createpost",
      postObj,
      {
        headers: { authorization: token },
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    if (error.response.data === "Expired") {
      localStorage.clear();
      window.location.href = ".././unauthorized/index.html";
    }
    window.location.href = ".././unauthorized/index.html";
  }
});
