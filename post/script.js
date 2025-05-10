const postTitle = document.querySelector("#title");
const postContent = document.querySelector("#content");

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const response = await axios.get(`http://localhost:1000/post/${postId}`);

  try {
    const { name, content } = response.data[0];
    postTitle.textContent = name;
    postContent.innerHTML = content;
  } catch (error) {
    console.log(error);
  }
});
