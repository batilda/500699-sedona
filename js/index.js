/*форма booking*/
var bookingBtn = document.querySelector(".booking__btn");
var searchBtn = document.querySelector(".search__btn");
var bookingForm = document.querySelector(".booking__form");
var bookingFormClosed = true;

/*элементы формы booking*/
var bookingArrival = document.querySelector(".booking__input[name=arrival-date]");
var bookingDeparture = document.querySelector(".booking__input[name=departure-date]");
var bookingAdults = document.querySelector(".booking__input[name=booking-adults]");
var bookingChildren = document.querySelector(".booking__input[name=booking-children]");

var bookingMinusAdults = document.querySelector(".js-minus--adults");
var bookingPlusAdults = document.querySelector(".js-plus--adults");
var bookingMinusChildren = document.querySelector(".js-minus--children");
var bookingPlusChildren = document.querySelector(".js-plus--children");
var ADULTS_MIN = 1;
var ADULTS_MAX = 10;
var CHILDREN_MIN = 0;
var CHILDREN_MAX = 10;


var bookingFields = [bookingArrival, bookingDeparture, bookingAdults, bookingChildren];
var isStorageSupport = true;
var storageArrival, storageDeparture, storageAdults, storageChildren;

var i;


bookingForm.classList.add("js-booking__modal");

/*заполняем формы из localStorage, если он вообще работает*/
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

/*убираем красные бордеры с элементов формы*/
function removeErrorsFromInputs(formArray) {
  for (i = 0; i < formArray.length; i++) {
    formArray[i].classList.remove("js__input--error")
   }
}

bookingBtn.addEventListener("click", function (evt) {
/*ловим клик по кнопке ПОИСК ГОСТИНИЦЫ В СЕДОНЕ*/
  evt.preventDefault();
  if (bookingFormClosed) {
    /* Открываем форму */
    bookingForm.classList.remove("js-booking__crawl--in");
    bookingForm.classList.add("js-booking__crawl--out");
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
    bookingForm.classList.remove("js-booking__crawl--out");
    bookingForm.classList.add("js-booking__crawl--in");
    bookingFormClosed = true;
  }
});


bookingMinusAdults.addEventListener("click", function(evt) {
  evt.preventDefault(); /*потому что - вдруг в верстке заменим div на элемент с действием по дефолту?*/
  if (bookingAdults.value > ADULTS_MIN) {
    bookingAdults.value--;
  } else {
    bookingAdults.value = ADULTS_MIN;
  }
});

bookingPlusAdults.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (bookingAdults.value < ADULTS_MAX) {
    bookingAdults.value++;
  } else {
  bookingAdults.value = ADULTS_MAX;
  }
});

bookingMinusChildren.addEventListener("click", function(evt) {
  evt.preventDefault(); /*потому что - вдруг в верстке заменим div на элемент с действием по дефолту?*/
  if (bookingChildren.value > CHILDREN_MIN) {
    bookingChildren.value--;
  } else {
    bookingChildren.value = CHILDREN_MIN;
  }
});

bookingPlusChildren.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (bookingChildren.value < CHILDREN_MAX) {
    bookingChildren.value++;
  } else {
  bookingChildren.value = CHILDREN_MAX;
  }
});

/*bookingForm.addEventListener("submit", function (evt) {*/
  /*почему-то событие по сабмиту формы не ловится*/
  /*ловим клик по кнопке НАЙТИ*/
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
    if ((!bookingAdults.value) || (bookingAdults.value == "0")) {
      bookingAdults.classList.add("js__input--error")
    }
/*    if (bookingArrival.value > bookingDeparture.value) {
     bookingArrival.classList.add("js__input--error")
     bookingDeparture.classList.add("js__input--error")
    }*/
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

/*Закрываем форму по Esc*/
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (!(bookingForm.classList.contains("js-booking__crawl--out"))) {
      bookingForm.classList.remove("js-booking__crawl--out");
      bookingForm.classList.add("js-booking__crawl--in");
      bookingFormClosed = true;
    }
  }
});
