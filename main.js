/* ================================================================== */
// onload function to add events on hover, clicks, and scroll
$(() => {
  initIconLoader();
  initContentLoader();
  initHomeClickEvent();
  initHoverEvents();
  initClickEvents();
  initIconClickBoxes();
  initScrollAction();
});

/* ============================ LOADER ====================================== */
// create animation of icons
// 1. create array of other images (except goku)
const initIconLoader = () => {
  $("#content-container").hide();
  window.loaderIcons = [
    "chibi sai.png",
    "Narto1chibi.png",
    "Rengoku chibi.png",
    "eren chibi.png"
  ].map(path => `assets/loading-icons/${path}`); // for each returning values
  window.loaderInterval = setInterval(changeIcon, 1000); // call first changeIcon after 1s
}

const changeIcon = () => {
  const loaderImg = $("#loader img"); // get img element
  if(!window.loaderIcons || window.loaderIcons.length == 0) { // if no icons or array of icons is empty
    clearInterval(window.loaderInterval); // stop loop when no more icons
    loaderImg.hide(); // hide loader image
  } else {
    loaderImg.attr("src", window.loaderIcons.shift());
    // loaderImg.attr -> sets attribute src with value of 2nd parameter
    // window.loaderIcons.shift() -> get first element and remove from array
  }
}
/* ============================= SHOW HOME AND SECTION ============================ */
// show welcome and hide loader container after icon loading animation
const initContentLoader = () => {
  setTimeout(() => {
    $("#home-container").removeClass("hidden"); // show konnichiwa
    $("#loader-container").addClass("hidden"); // hide loading animation container
    $("#content-container").show();
  }, 5000);
}
/* =============================== HOVER ============================================ */
// add hover events
const initHoverEvents = () => {
  const column = $('main > section'); // get all sections

  // when using () => {}, we get window for this, but when using function, we get section
  column.mouseenter(function () { // widen section on hover
    column.addClass("narrow"); // apply css to all columns
    column.removeClass('wide'); // reset css of all columns
    $(this).removeClass('narrow');
    $(this).addClass('wide'); //$(this) -> element that was hovered
  });

  column.mouseleave(function () {
    column.removeClass("narrow");
    column.removeClass('wide');
  });
}
/* =============================== RESET ============================================ */
// reset to home and reset css of sections
const initHomeClickEvent = () => {
  const homeIcon = $('.page-switcher > .home-switch');
  homeIcon.click(function () {
    $("#home-container").removeClass("hidden");
    $(".page-switcher").addClass("hidden");
    initHoverEvents();
    resetSections();
    resetHoverEvents();
  })
}
// reset to defualt home settings
const resetSections = () => {
  const columns = $('main > section');
  const columnTitles = $('main > section > .column-title');
  const columnContents = $('main > section > .column-content');
  columns.removeClass('section-hide');
  columns.removeClass('narrow');
  columns.removeClass('wide');
  columns.removeClass('full-width');
  columnTitles.removeClass("hidden");
  columnContents.addClass("hidden");
}
/* =============================== CLICK ============================================ */
// add click events to icons
const initIconClickBoxes = () => {
  const columns = $('main > section'); // select sections
  const pageSwitcher = $(".page-switcher > img"); // icon selector except home
  pageSwitcher.click(function () {
    const iconIndex = pageSwitcher.index(this); // find index of icon
    columns[iconIndex].click(); // get column using same page switcher index then click
  });
}

// event for section click
const initClickEvents = () => {
  const columns = $('main > section');
  columns.click(function() {
    const columnIndex = columns.index(this); // find index of clicked column
    activateIcon(columnIndex);
    removeSections();
    clickColumn(columnIndex);
  });
}
/* =============================== ICON OPACITY ============================================ */
// enable icon to make opacity 1
const activateIcon = (columnIndex) => {
  const pageSwitcher = $(".page-switcher"); // sekect page switcher container
  const pageSwitcherIcon = $(".page-switcher > img"); // select icons
  const currentPageSwitcherIcon = $(pageSwitcherIcon[columnIndex]); // find icon using index
  pageSwitcher.removeClass("hidden"); // show icons container
  pageSwitcherIcon.removeClass("active"); // remove opacity 1 of other icons
  currentPageSwitcherIcon.addClass("active"); //add opacity 1 to selected icon
}
/* =============================== HIDE SECTION ============================================ */
// hide anime images
const removeSections = () => {
  const columns = $('main > section');
  columns.off("mouseenter"); // disable hover event
  columns.off("mouseleave"); // disable hover out event
  columns.removeClass('wide');
  columns.removeClass('full-width');
  columns.addClass('section-hide');
}
/* =============================== SHOW CONTENT ============================================ */
// show column content
const clickColumn = (columnIndex) => {
  const columns = $('main > section'); // select all sections
  const column = $(columns[columnIndex]); // get selected column using index
  column.addClass('full-width'); // show section using full width
  column.children(".column-title").addClass("hidden"); // hide title
  column.children(".column-content").removeClass("hidden"); // show content
}
/* =============================== HIDE WELCOME AFTER SCROLL ================================ */
// hide konnichiwa after clicking scroll down image
const initScrollAction = () => {
  $(window).scroll(() => {
    if ($(document).height() <= $(window).scrollTop() + $(window).height()) { // if end of page is reached
      $("#home-container").addClass("hidden"); // hide konnichiwa
    }
});
}