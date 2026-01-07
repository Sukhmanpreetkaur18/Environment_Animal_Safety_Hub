let blogsData = [
  {title: "Eco Gardening Tips", author: "User12", category: "environment", img: "https://picsum.photos/seed/blog1/300/200"},
  {title: "Plastic-Free Living", author: "User34", category: "diy", img: "https://picsum.photos/seed/blog2/300/200"},
  {title: "Solar Power Ideas", author: "User56", category: "energy", img: "https://picsum.photos/seed/blog3/300/200"},
  {title: "Tech for Nature", author: "User78", category: "technology", img: "https://picsum.photos/seed/blog4/300/200"},
  {title: "Composting at Home", author: "User90", category: "environment", img: "https://picsum.photos/seed/blog5/300/200"},
  {title: "DIY Birdhouses", author: "User21", category: "diy", img: "https://picsum.photos/seed/blog6/300/200"},
  {title: "Energy Efficient Homes", author: "User33", category: "energy", img: "https://picsum.photos/seed/blog7/300/200"},
  {title: "Urban Gardening Hacks", author: "User45", category: "environment", img: "https://picsum.photos/seed/blog8/300/200"},
  {title: "Rainwater Harvesting", author: "User11", category: "environment", img: "https://picsum.photos/seed/blog9/300/200"},
  {title: "Minimalist Home Decor", author: "User22", category: "diy", img: "https://picsum.photos/seed/blog10/300/200"},
  {title: "Wind Energy Explained", author: "User35", category: "energy", img: "https://picsum.photos/seed/blog11/300/200"},
  {title: "Smart Irrigation Systems", author: "User46", category: "technology", img: "https://picsum.photos/seed/blog12/300/200"},
  {title: "Plant-Based Recipes", author: "User57", category: "diy", img: "https://picsum.photos/seed/blog13/300/200"},
  {title: "Green Roof Benefits", author: "User68", category: "environment", img: "https://picsum.photos/seed/blog14/300/200"},
  {title: "Solar Panel Maintenance", author: "User79", category: "energy", img: "https://picsum.photos/seed/blog15/300/200"},
  {title: "Home Automation for Energy Saving", author: "User80", category: "technology", img: "https://picsum.photos/seed/blog16/300/200"},
  {title: "Recycled Crafts Ideas", author: "User81", category: "diy", img: "https://picsum.photos/seed/blog17/300/200"},
  {title: "Organic Vegetable Gardening", author: "User82", category: "environment", img: "https://picsum.photos/seed/blog18/300/200"},
  {title: "LED Lighting Upgrades", author: "User83", category: "energy", img: "https://picsum.photos/seed/blog19/300/200"},
  {title: "Sustainable Tech Gadgets", author: "User84", category: "technology", img: "https://picsum.photos/seed/blog20/300/200"},
  {title: "DIY Herb Garden", author: "User85", category: "diy", img: "https://picsum.photos/seed/blog21/300/200"},
  {title: "Compostable Kitchen Waste", author: "User86", category: "environment", img: "https://picsum.photos/seed/blog22/300/200"},
  {title: "Geothermal Energy Basics", author: "User87", category: "energy", img: "https://picsum.photos/seed/blog23/300/200"},
  {title: "Tech for Urban Farming", author: "User88", category: "technology", img: "https://picsum.photos/seed/blog24/300/200"},
  {title: "Upcycled Furniture Ideas", author: "User89", category: "diy", img: "https://picsum.photos/seed/blog25/300/200"},
  {title: "Indoor Air Quality Tips", author: "User90", category: "environment", img: "https://picsum.photos/seed/blog26/300/200"},
  {title: "Energy Star Appliances", author: "User91", category: "energy", img: "https://picsum.photos/seed/blog27/300/200"},
  {title: "Wearable Eco-Tech", author: "User92", category: "technology", img: "https://picsum.photos/seed/blog28/300/200"},
  {title: "DIY Natural Cleaning Products", author: "User93", category: "diy", img: "https://picsum.photos/seed/blog29/300/200"}
];


// ------------------------------
// Render Blogs
// ------------------------------
function renderBlogs(filter = "all", search = "") {
  const container = document.getElementById("blogs-container");
  container.innerHTML = "";

  let filteredBlogs = blogsData.filter(blog => {
    const matchesFilter = filter === "all" || blog.category === filter;
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (filteredBlogs.length === 0) {
    container.innerHTML = "<p class='text-sm' style='text-align:center;width:100%'>No blogs found</p>";
    return;
  }

  filteredBlogs.forEach(blog => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";
    blogCard.innerHTML = `
      <img src="${blog.img}" alt="Blog Image">
      <div class="blog-title">${blog.title}</div>
      <div class="blog-author">by ${blog.author}</div>
      <div class="blog-actions row">
        <i class="fa-regular fa-heart upvote-btn" title="Upvote"></i>
        <i class="fa-regular fa-comment comment-btn" title="Comment"></i>
        <button class="read-btn">Read More</button>
      </div>
    `;
    container.appendChild(blogCard);
  });
}

// Initial render
renderBlogs();

// ------------------------------
// Filter Buttons
// ------------------------------
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderBlogs(btn.dataset.filter, document.querySelector(".search-blog")?.value || "");
  });
});

// ------------------------------
// Search Blogs
// ------------------------------
const searchInput = document.querySelector(".top-bar .input");

searchInput?.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  // Get all dynamically created blog cards each time user types
  const blogCards = document.querySelectorAll(".blog-card");

  blogCards.forEach(card => {
    const blogTitle = card.querySelector(".blog-title").textContent.toLowerCase();
    const blogAuthor = card.querySelector(".blog-author").textContent.toLowerCase(); 

    if (blogTitle.includes(searchValue) || blogAuthor.includes(searchValue)) {
      card.style.display = "flex"; 
    } else {
      card.style.display = "none";
    }
  });
});

// ------------------------------
// Create Blog Modal
// ------------------------------
const createBtn = document.querySelector(".create-blog-btn");
const modal = document.getElementById("createBlogModal");
const closeModal = modal?.querySelector(".close-modal");
const submitBtn = modal?.querySelector(".submit-blog-btn");

if(createBtn){
  createBtn.addEventListener("click", () => modal.style.display = "flex");
}

if(closeModal){
  closeModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", e => {
    if(e.target === modal) modal.style.display = "none";
  });
}

// ------------------------------
// Submit Blog
// ------------------------------
if(submitBtn){
  submitBtn.addEventListener("click", () => {
    const title = modal.querySelector(".blog-title-input").value.trim();
    const category = modal.querySelector(".blog-category-input").value;
    const desc = modal.querySelector(".blog-desc-input").value.trim();
    const imageInput = modal.querySelector(".blog-image-input");
    const imgURL = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : "https://picsum.photos/300/200";

    if(title && desc){
      const newBlog = {title, author: "You", category, img: imgURL};
      blogsData.unshift(newBlog); // add to top
      renderBlogs(document.querySelector(".filter-btn.active").dataset.filter, searchInput.value);
      modal.style.display = "none";

      // Reset form
      modal.querySelector(".blog-title-input").value = "";
      modal.querySelector(".blog-desc-input").value = "";
      modal.querySelector(".blog-image-input").value = "";
    }
  });
}

// ------------------------------
// View Blog from Right Panel
// ------------------------------
document.querySelectorAll(".view-blog-btn").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const blog = blogsData[i];
    if(blog){
      renderBlogs("all", ""); // Clear filter/search
      const container = document.getElementById("blogs-container");
      container.innerHTML = "";
      const blogCard = document.createElement("div");
      blogCard.className = "blog-card";
      blogCard.innerHTML = `
        <img src="${blog.img}" alt="Blog Image">
        <div class="blog-title">${blog.title}</div>
        <div class="blog-author">by ${blog.author}</div>
        <p class="blog-desc-text">${blog.title} details and content goes here...</p>
      `;
      container.appendChild(blogCard);
    }
  });
});
