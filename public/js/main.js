// window.scroll(function () {
//   if (window.scrollTop() == document.height() - window.height()) {
//     AddMoreContent();
//   }
// });

// function AddMoreContent() {
//   $.post('getMoreContent.php', function (data) {
//     //Assuming the returned data is pure HTML
//     $(data).insertBefore($('#placeHolder'));
//   });
// }

const popupTriggers = document.querySelectorAll('#popup-trigger');
const popups = document.querySelectorAll('#popup');
const popupClosers = document.querySelectorAll('#popup-closer')

for (popupTrigger of popupTriggers) {
  const index = [...popupTriggers].indexOf(popupTrigger)
  popupTrigger.addEventListener('click', (e) => {
    popups[index].removeAttribute('style')
    popupClosers[index].addEventListener('click', (e) => {
      popups[index].setAttribute('style', 'display:none')
    })
  })
}
