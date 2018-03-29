var bookingBtn = document.querySelector(".booking__btn");
var searchBtn = document.querySelector(".search__btn");
var bookingForm = document.querySelector(".booking__form");
var bookingFormClosed = true;
var bookingArrival = document.querySelector(".booking__input[name=arrival-date]");
var bookingDeparture = document.querySelector(".booking__input[name=departure-date]");
var bookingAdults = document.querySelector(".booking__input[name=booking-adults]");
var bookingChildren = document.querySelector(".booking__input[name=booking-children]");
var isStorageSupport = true;


function fillFromStorage(formFields,isStorageSupport) {
  try {
    storageArrival = localStorage.getItem("bookingArrival");
    storageDeparture = localStorage.getItem("bookingDeparture");
    storageAdults = localStorage.getItem("bookingAdults");
    storageChildren = localStorage.getItem("bookingChildren");
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageArrival) {
    bookingArrival.value = storageArrival;
  }
}

bookingFields = [bookingArrival, bookingDeparture, bookingAdults, bookingChildren];

fillFromStorage(bookingFields, isStorageSupport);

bookingBtn.addEventListener("click", function (evt) {
 evt.preventDefault();
 if (bookingFormClosed) {
     /*bookingForm.classList.remove("visually-hidden");*/
     bookingForm.classList.remove("js-booking__retract");
     bookingForm.classList.add("js-booking__bounce");
     bookingArrival.focus();
   /*if (storage) {
      login.value = storage;
      password.focus();
    } else {
      login.focus();
    }*/
     bookingFormClosed = false;
   } else {
     /*bookingForm.classList.add("visually-hidden");*/
     bookingForm.classList.remove("js-booking__bounce");
     bookingForm.classList.add("js-booking__retract");
     bookingFormClosed = true;
   }
 });


/*bookingForm.addEventListener("submit", function (evt) {*/
  /*почему-то событие с формы не ловится*/
searchBtn.addEventListener("click", function (evt) {
  console.log("Нажали сабмит");
  if (!bookingArrival.value || !bookingDeparture.value || !bookingAdults.value) {
    evt.preventDefault();
    console.log("Нужно ввести заезд, отъезд и хотя бы одного взрослого");
  } else {
    if (isStorageSupport ) {
      localStorage.setItem("bookingArrival", bookingArrival.value);
  		localStorage.setItem("bookingDeparture", bookingDeparture.value);
  		localStorage.setItem("bookingAdults", bookingAdults.value);
  		localStorage.setItem("bookingChildren", bookingChildren.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (!(bookingForm.classList.contains("visually-hidden"))) {
      /*bookingForm.classList.add("visually-hidden");*/
      bookingForm.classList.remove("js-booking__bounce");
      bookingForm.classList.add("js-booking__retract");
      bookingFormClosed = true;
    }
  }
});

