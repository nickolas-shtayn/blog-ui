const postsContainer = document.querySelector(".posts");
const createPostForm = document.querySelector("form");

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("jwt");

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
        try {
          const response = await axios.delete(
            "http://localhost:1000/deletepost",
            { data: { id } }
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
    if (error.response.data === "Expired") {
      localStorage.clear();
    }
    const container = document.querySelector(".container") || document.body;
    container.innerHTML = `
      <div class="redirect-message">
        <h3>Session expired</h3>
        <p>Redirecting you to login in 3 seconds...</p>
      </div>
    `;
    setTimeout(() => {
      window.location.href = ".././main/index.html";
    }, 3000);
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
    console.log("You are not logged in");
    return;
  }

  try {
    const response = await axios.post("http://localhost:1000/", postObj, {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
});
