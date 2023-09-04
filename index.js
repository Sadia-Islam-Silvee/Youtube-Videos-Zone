const handelCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab_container");

  data.data.slice(0, 4).forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = ` <a onclick="handelLoadVideos('${category.category_id}')"  class="btn btn-active btn-ghost hover:bg-red-500 text-white rounded-none ">${category.category}<a>`;
    tabContainer.appendChild(div);
  });
};

// categoryID

const handelLoadVideos = async (categoryID) => {
  let data = null;
  const response = await fetch(
    ` https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  data = await response.json();
  let realData = data.data;
  document.getElementById("sortView").addEventListener("click", function () {
    set(realData.sort(views));
    console.log(realData);
    function views(a, b) {
      return parseInt(b.others.views) - parseInt(a.others.views);
    }
  });
  set(realData);
};

function set(realData) {
  if (realData.length == 0) {
    const cardContainer = document.getElementById("card_container");
    const drawingContainer = document.getElementById("drawing_container");
    cardContainer.classList.add("hidden");
    drawingContainer.classList.remove("hidden");
  } else {
    //   Card Fetch
    const cardContainer = document.getElementById("card_container");

    const drawingContainer = document.getElementById("drawing_container");
    cardContainer.classList.remove("hidden");
    drawingContainer.classList.add("hidden");

    cardContainer.innerHTML = " ";
    console.log(realData);
    realData.forEach((videos) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <div class="card h-[400px] bg-base-100 shadow-xl ">
        <div class="relative"> 
        <figure><img class="w-full h-[210px]"src=${
          videos.thumbnail
        }  alt="Shoes" /></figure>
 
        ${
          videos.others.posted_date
            ? `<div class='p-1 rounded-xl bg-black text-white mt-25 absolute bottom-0 right-0'>${time_converter_from_seconds(
                videos.others.posted_date
              )}</div> `
            : ""
        }</div>

     

        <div class="card-body">
         <div class="flex items-center gap-3">
         <img class="rounded-full  w-[50px] h-[50px] " src=${
           videos.authors[0].profile_picture
         } 
             alt="">
          <h2 class="card-title font-bold text-base">${videos.title}</h2>
            
         </div>
         <div class="card-actions my-2">
                  <p>${videos.authors[0].profile_name}</p>
                  <div class="">
                  ${
                    videos.authors[0]?.verified
                      ? `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_11_290)">
                                  <path d="M19.375 10C19.375 10.8 18.3922 11.4594 18.1953 12.1969C17.9922 12.9594 18.5063 14.0219 18.1203 14.6891C17.7281 15.3672 16.5484 15.4484 15.9984 15.9984C15.4484 16.5484 15.3672 17.7281 14.6891 18.1203C14.0219 18.5063 12.9594 17.9922 12.1969 18.1953C11.4594 18.3922 10.8 19.375 10 19.375C9.2 19.375 8.54062 18.3922 7.80312 18.1953C7.04062 17.9922 5.97813 18.5063 5.31094 18.1203C4.63281 17.7281 4.55156 16.5484 4.00156 15.9984C3.45156 15.4484 2.27187 15.3672 1.87969 14.6891C1.49375 14.0219 2.00781 12.9594 1.80469 12.1969C1.60781 11.4594 0.625 10.8 0.625 10C0.625 9.2 1.60781 8.54062 1.80469 7.80312C2.00781 7.04062 1.49375 5.97813 1.87969 5.31094C2.27187 4.63281 3.45156 4.55156 4.00156 4.00156C4.55156 3.45156 4.63281 2.27187 5.31094 1.87969C5.97813 1.49375 7.04062 2.00781 7.80312 1.80469C8.54062 1.60781 9.2 0.625 10 0.625C10.8 0.625 11.4594 1.60781 12.1969 1.80469C12.9594 2.00781 14.0219 1.49375 14.6891 1.87969C15.3672 2.27187 15.4484 3.45156 15.9984 4.00156C16.5484 4.55156 17.7281 4.63281 18.1203 5.31094C18.5063 5.97813 17.9922 7.04062 18.1953 7.80312C18.3922 8.54062 19.375 9.2 19.375 10Z" fill="#2568EF"/>
                                  <path d="M12.7094 7.20626L9.14065 10.775L7.29065 8.92657C6.88909 8.52501 6.23752 8.52501 5.83596 8.92657C5.4344 9.32814 5.4344 9.9797 5.83596 10.3813L8.43127 12.9766C8.8219 13.3672 9.45627 13.3672 9.8469 12.9766L14.1625 8.66095C14.5641 8.25939 14.5641 7.60782 14.1625 7.20626C13.761 6.8047 13.111 6.8047 12.7094 7.20626Z" fill="#FFFCEE"/>
                                  </g>
                                  <defs>
                                  <clipPath id="clip0_11_290">
                                  <rect width="20" height="20" fill="white"/>
                                  </clipPath>
                                  </defs>
                                  </svg>
                                  `
                      : ""
                  }
                            </div>
                            </div>
         <p>${videos.others.views}</p>
        </div>
      </div>

        `;
      cardContainer.appendChild(div);
    });
  }
}

document.getElementById("blog_id").addEventListener("click", function () {
  window.location.href = "blog.html";
});

handelCategory();
handelLoadVideos("1000");

function time_converter_from_seconds(seconds) {
  if (!seconds) {
    return "";
  }

  var month = Math.floor(seconds / (30 * 60 * 60));
  month -= month * (30 * 60 * 60);
  var days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  var hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return (
    (0 < month ? month + " months, " : 0 < days ? days + " day, " : "") +
    hours +
    "h " +
    minutes +
    "m and " +
    seconds +
    "s"
  );
}
