const postsContainer = document.querySelector(".posts");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:1000/");
    response.data.forEach((post) => {
      const { id, name, content } = post;
      const postCard = document.createElement("div");
      postCard.classList.add("posts__card");
      const postHeader = document.createElement("h1");
      const postContent = document.createElement("p");
      postHeader.classList.add("posts__card--header");
      postContent.classList.add("posts__card--content");
      postHeader.textContent = name;
      postContent.textContent = content;

      if (postContent.textContent.length > 60) {
        postContent.textContent = content.substring(0, 60) + "...";
      }
      postCard.appendChild(postHeader);
      postCard.appendChild(postContent);

      postCard.addEventListener("click", () => {
        window.location.href = `.././post/index.html?id=${id}`;
      });

      postsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.log(error);
  }
});
