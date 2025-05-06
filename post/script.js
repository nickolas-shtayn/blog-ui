const postTitle = document.querySelector("h1");
const postContent = document.querySelector("p");

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const response = await axios.get(`http://localhost:1000/post/${postId}`);

  try {
    const { name, content } = response.data[0];
    postTitle.textContent = name;
    postContent.textContent = content;
  } catch (error) {
    console.log(error);
  }
});
