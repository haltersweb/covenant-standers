(function () {
    'use strict';
    let bookList = [];
    function getQueryString(inputElem) {
      let queryString = '';
      queryString = inputElem.value;
      return queryString;
    }
    function parsePassageQuery(queryString) {
        /*
          a typical query string is comma delimited and looks like this:
          John 1, Genesis 1:2, Genesis 2:1-2, Exodus 2:2-5,8
          This function will spit out the queries and return an array of objects that contain the book title, chapter, and verse list of each request in the query
        */
        let passages = queryString.split(', '), // split out the query string into separate requests
            books = []; // this will hold an array of objects, each one containing book title, chapter, and verses requested
        passages.forEach(function (passage) {
          let book = {}, /* will hold parsed title, chapter, verses */
              aTCV = [], /* title, chapter, verse query as an array */
              aCV = [], /* chapter, verse query as an array */
              aV = []; /* verse query as an array */
            book.passage = passage;
            aTCV = passage.split(' ');
            aCV = aTCV.pop().split(':');
            book.id = aTCV.join(' ').toLowerCase();
            book.chapter = parseInt(aCV.shift());
            if (aCV.length !== 0) {
              aV = aCV[0].split(',');
            }
            book.verses = []; /* array of verses from query */
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
      /* get the verse container from the DOM that will hold the verses */
      let verseContainer = document.getElementById('verseContainer');
      /* clear it of any verses */
      verseContainer.innerHTML = '';
      /* loop through the bookList and build HTML to write out the verses */
      bookList.forEach(function (book) {
          let fragment = document.createDocumentFragment(),
              h2 = document.createElement('H2');
          /* 'psalm' and 'proverb' id naming */
          book.id = ('proverb') ? 'proverbs' : book.id;
          book.id = ('psalm') ? 'psalms' : book.id;
          /* first create and h2 naming passage requested */
          h2.innerText = book.passage;
          fragment.append(h2);
          /* if there is no array of verses, assume all verses and create an array listing all verse numbers */
          if (book.verses.length === 0) {
            let bookLength = enKJV[book.id].chapters[book.chapter-1].length;
            for (let i = 0; i < bookLength; i += 1) {
              book.verses.push(i + 1);
            }
          }
          /* loop through all verses requested and make paragraphs of each */
          book.verses.forEach(function (verse) {
              let p = document.createElement('P');
              p.innerHTML = '<strong>' + verse + '</strong> ' + enKJV[book.id].chapters[book.chapter-1][verse-1];
              fragment.append(p);
          });
          /* add the h2 and paragraphs to the verse container in the DOM */
          verseContainer.append(fragment);
      });
    }
    function submitEvent() {
        let button = document.getElementById('submitQuery'),
            input = document.getElementById('scriptureQuery');
        button.addEventListener('click', function (e) {
            let queryString = getQueryString(input);
            console.log(queryString);
            bookList = parsePassageQuery(queryString);
            displayScripture(bookList);
            e.preventDefault();
        });
    }
    submitEvent();
}());
