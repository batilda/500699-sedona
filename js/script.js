var bookingBtn = document.querySelector(".booking__btn");
var searchBtn = document.querySelector(".search__btn");
var bookingForm = document.querySelector(".booking__form");
var bookingFormClosed = true;

var bookingArrival = document.querySelector(".booking__input[name=arrival-date]");
var bookingDeparture = document.querySelector(".booking__input[name=departure-date]");
var bookingAdults = document.querySelector(".booking__input[name=booking-adults]");
var bookingChildren = document.querySelector(".booking__input[name=booking-children]");
var bookingFields = [bookingArrival, bookingDeparture, bookingAdults, bookingChildren];

var isStorageSupport = true;
var storageArrival, storageDeparture, storageAdults, storageChildren;

var i;

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
if (storageDeparture) {
  bookingDeparture.value = storageDeparture;
}
if ((storageAdults) && (storageAdults != "0")) {
  bookingAdults.value = storageAdults;
}
if (storageChildren) {
  bookingChildren.value = storageChildren;
}

function removeErrorsFromInputs(formArray) {
  for (i = 0; i < formArray.length; i++) {
    formArray[i].classList.remove("js__input--error")
   }
}

bookingBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (bookingFormClosed) {
    /* Открываем форму */
    bookingForm.classList.remove("js-booking__retract");
    bookingForm.classList.add("js-booking__bounce");
    bookingFormClosed = false;
    /* ставим фокус либо на первый незаполненный, либо просто на первый input */
    if (storageArrival) {
      if (storageDeparture) {
        if (storageAdults) {
          if (storageChildren) {
                bookingArrival.focus();
            }
        } else {
          bookingAdults.focus();
        }
      } else {
        bookingDeparture.focus();
      }
    } else {
      bookingArrival.focus();
    }
  /* Закрываем форму */
  } else {
    bookingForm.classList.remove("js-booking__bounce");
    bookingForm.classList.add("js-booking__retract");
    bookingFormClosed = true;
  }
});

/*bookingForm.addEventListener("submit", function (evt) {*/  /*почему-то событие с формы не ловится*/
searchBtn.addEventListener("click", function (evt) {
  removeErrorsFromInputs(bookingFields) ;
  if (!bookingArrival.value || !bookingDeparture.value || !bookingAdults.value || (bookingAdults.value == "0")) {
    evt.preventDefault();
    if (!bookingArrival.value) {
      bookingArrival.classList.add("js__input--error")
    }
    if (!bookingDeparture.value) {
      bookingDeparture.classList.add("js__input--error")
    }
    if ((!bookingAdults.value) || (bookingAdults.value = "0")) {
      bookingAdults.classList.add("js__input--error")
    }
    if (bookingArrival.value > bookingDeparture.value) {
     bookingArrival.classList.add("js__input--error")
     bookingDeparture.classList.add("js__input--error")
    }
  } else {
    removeErrorsFromInputs(bookingFields);
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
      bookingForm.classList.remove("js-booking__bounce");
      bookingForm.classList.add("js-booking__retract");
      bookingFormClosed = true;
    }
  }
});

