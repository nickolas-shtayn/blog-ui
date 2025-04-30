const postsContainer = document.querySelector(".posts");
const createPostForm = document.querySelector("form");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:1000/");
    response.data.forEach((post) => {
      const { name, content } = post;
      const postCard = document.createElement("div");
      postCard.classList.add("posts__card");
      const postHeader = document.createElement("h1");
      const postContent = document.createElement("p");
      postHeader.classList.add("posts__card--header");
      postContent.classList.add("posts__card--content");
      postHeader.textContent = name;
      postContent.textContent = content;

      postCard.appendChild(postHeader);
      postCard.appendChild(postContent);

      postCard.addEventListener("click", (event) => {
        console.log("I am dynamically adding eventListeners!");
      });

      postsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.log(error);
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

  try {
    const response = await axios.post("http://localhost:1000/", postObj);
    if (response.data === "ok") {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
});
