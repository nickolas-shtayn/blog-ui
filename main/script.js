const postsContainer = document.querySelector(".posts");
const loginButton = document.querySelector("#login");
const logoutButton = document.querySelector("#logout");

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

logoutButton.addEventListener("click", () => {
  localStorage.clear();
});

localStorage.getItem("jwt") !== null
  ? (loginButton.classList.add("hidden"),
    logoutButton.classList.remove("hidden"))
  : (loginButton.classList.remove("hidden"),
    logoutButton.classList.add("hidden"));
