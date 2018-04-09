(function () {
    'use strict';
    console.clear();
    let bookList = [];
    function getQueryString(inputElem) {
      let queryString = '';
      queryString = inputElem.value;
      return queryString;
    }
    function parsePassageQuery(queryString) {
        let passages = queryString.split(', ');
        let books = [];
        passages.forEach(function (passage) {
          let book = {}, /* will hold parsed title, chapter, verses */
              aTCV = [], /* title, chapter, verse query as an array */
              aCV = [], /* chapter, verse query as an array */
              aV = [], /* verse query as an array */
              verses = []; /* array of verses from query */
            book.passage = passage;
            aTCV = passage.split(' ');
            aCV = aTCV.pop().split(':');
            book.id = aTCV.join(' ').toLowerCase();
            book.chapter = parseInt(aCV.shift());
            book.verses = [];
            if (aCV.length !== 0) {
              aV = aCV[0].split(',');
            }
            aV.forEach(function (v) {
              if(v.includes('-')) {
                let spread = v.split('-');
                for (let n = parseInt(spread[0]); n <= parseInt(spread[1]); n += 1 ) {
                  book.verses.push(n);
                }
              } else {
                book.verses.push(parseInt(v));
              }
            });
            books.push(book);
        });
      return books;
    }
    function displayScripture(bookList) {
      let verseContainer = document.getElementById('verseContainer');
      verseContainer.innerHTML = '';
      bookList.forEach(function (book) {
          let fragment = document.createDocumentFragment(),
              h2 = document.createElement('H2');
          h2.innerText = book.passage;
          fragment.append(h2);
          book.verses.forEach(function (verse) {
              let p = document.createElement('P');
              p.innerHTML = '<strong>' + verse + '</strong> ' + enKJV[book.id].chapters[book.chapter-1][verse-1];
              fragment.append(p);
          });
          console.log(book);
          verseContainer.append(fragment);
      });
    }
    function submitEvent() {
        let button = document.getElementById('submitQuery'),
            input = document.getElementById('scriptureQuery');
        button.addEventListener('click', function () {
            let queryString = getQueryString(input);
            console.log(queryString);
            bookList = parsePassageQuery(queryString);
            displayScripture(bookList);
        });
    }
    submitEvent();
}());