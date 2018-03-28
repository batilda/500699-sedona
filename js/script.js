var bookingBtn = document.querySelector(".booking__btn");
var bookingForm = document.querySelector(".booking__form");
var bookingFormOpened = false;


/*
function toggleBookingForm() {
  if (bookingFormOpened) {
      bookingBtn.classList.remove("visually-hidden");
        bookingFormOpened = false;
    } else {
    bookingBtn.classList.add("visually-hidden");
        bookingFormOpened = true;
        alert('Test');
    }
}
*/

function handlerBookingBtn(evt) {
  evt.preventDefault();
  console.log("test");
    alert("test Try test");
}

if (bookingBtn) {
  bookingBtn.addEventListener("click", handlerBookingBtn);
} else {
  console.log("test failed");
    alert('Test failed failed');
}

/*bookingBtn.addEventListener("click", toggleBookingForm());*/
