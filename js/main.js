/*==================================================================================================================
Header
 ==================================================================================================================*/

/*=========================================================
futurezoneImg
Übung 3 Task 1
*/
window.addEventListener('load', function () {
  const ele = document.getElementsByClassName('headerImgCenter');
  ele[0].style.opacity = '1';
});

/*=========================================================
BurgerMenu
*/
document.querySelectorAll('.burgerMenuButton').forEach((it) => {
  it.addEventListener('click', function () {
    menuOpen('headerDiv2')
  })
})

//https://stackoverflow.com/questions/19353331/getting-or-changing-css-class-property-with-javascript-using-dom-style/19353349
function menuOpen(name) {
  const cols = document.getElementsByClassName(name);
  const body = document.getElementsByTagName('body')[0];
  for (let i = 0; i < cols.length; i++) {
    if (cols[i].style.display === 'flex') {
      cols[i].style.display = 'none';
      body.style.overflow = 'initial';
    } else {
      cols[i].style.display = 'flex';
      body.style.overflow = 'hidden';
    }
  }
}


/*=========================================================
Burger Kategorie Color
*/
document.querySelectorAll('.BurgerKatPrioA').forEach((it) => {
  if (window.matchMedia("(min-width: 37.5rem)").matches) {
    let kat = it.innerHTML;
    let opacity = 0.5;
    let color = colorChooser(kat, opacity);
    //for "MORE"
    if (color === 'rgba(0,0,0,' + opacity + ')') {
      color = 'rgba(211,211,211,' + opacity + ')'
    }
    it.addEventListener('mouseenter', function () {
      colorBottomHover(this, color, 'white', 'borderColor')
      colorBottomHover(this, color, 'white', 'backgroundColor')
    });
    it.addEventListener('mouseleave', function () {
      colorBottomHover(this, color, 'white', 'borderColor')
      colorBottomHover(this, color, 'white', 'backgroundColor')
    });
  }
});


/*=========================================================
Searchbar
 */
/*Übung 3 Task 3*/
document.querySelectorAll(".searchBtnClickable").forEach((it) => it.addEventListener("click", function () {
  const ele = document.getElementById('headerSearch');
  const eleHeader = document.getElementById('header');

  let headerHeight = 5.5;
  if (!window.matchMedia("(min-width: 37.5rem)").matches) {
    headerHeight = 3.5;
    menuOpen('headerDiv2');
  }


  if (ele.style.display === 'flex') {
    ele.style.display = 'none';
    /*header height is changed to make space for the searchbar*/
    eleHeader.style.height = headerHeight + 'rem';
    eleHeader.style.transition = 'height 0.15s ease';

    //to reset search
    clearMark(document.querySelectorAll('.searchable p,h2,h3'))
    document.getElementById('mainSearch').style.display = 'none';
  } else {
    ele.style.display = 'flex';
    /*header height is changed to make space for the searchbar*/
    eleHeader.style.height = (headerHeight + 1.75) + 'rem';
    eleHeader.style.transition = 'height 0.15s ease';
  }
}));

document.getElementById('headerSearchText').addEventListener('keyup', function (event) {
  closeAllLists()
  if (event.key === 'Enter') {
    showResultsAndStuff();
  } else if (event.key === 'Escape') {
    clearMark(document.querySelectorAll('.searchable p,h2,h3'))
    clearSearch(this);
  } else {
    getAutoComplete(this.value);
    searchNMark(this.value, document.querySelectorAll('.searchable p,h2,h3'))
  }
  if (this.value === "") {
    closeAllLists()
    clearMark(document.querySelectorAll('.searchable p,h2,h3'));
  }
});


document.getElementById('headerSearchBtn').addEventListener('click', function () {
  showResultsAndStuff();
})

function showResultsAndStuff() {
  closeAllLists()
  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: 0
  });
  clearSearchedArticle();
  let value = document.getElementById('headerSearchText').value;
  searchNMark(value, document.querySelectorAll('.searchable p,h2,h3'), true)
  /*to only see search results if you press/click the button*/
  if (document.getElementById("mainSearch").childNodes.length > 3)
    document.getElementById('mainSearch').style.display = 'flex';
  else
    document.getElementById('mainSearch').style.display = 'none';
}

function searchNMark(value, searchable, mode = false) {
  //mode is just to make sure you have to press the button to make a "true" search
  if (searchable === null || value === "") return;
  let id, r = RegExp(value, 'ig');
  clearMark(searchable);
  for (let i = 0; i < searchable.length; i++) {
    if (r.test(searchable[i].innerHTML) && !searchable[i].classList.contains('CategoryP')) {
      searchable[i].innerHTML = searchable[i].innerHTML.replace(r, match => '<mark>' + match + '</mark>');
      id = 'found ' + i;
      if (mode) {
        createNewSearchedArticle(searchable[i].innerHTML, id);
        setBookmark(searchable[i], id);
      }
    }
  }
}

function createNewSearchedArticle(element, id) {
  let ele = document.getElementById("searchArticleTemplate");
  let parent = document.getElementById("mainSearch");
  let clone = ele.content.cloneNode(true);

  let field = clone.getElementById("searchArticleTemplateP");
  field.innerHTML = field.innerHTML.replace(/{{Description}}/ig, element);
  field.id = "";

  clone.getElementById("searchArticleTemplateID").id = id;

  parent.appendChild(clone);
}

function setBookmark(element, id) {
  document.getElementById(id).addEventListener('click', function () {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start"
    });
  });
}

function clearSearchedArticle() {
  let ele = document.getElementById("mainSearch");
  while (ele.childNodes.length > 3) {
    ele.removeChild(ele.lastChild);
  }
}

function clearMark(searchable) {
  if (searchable === null) return;
  let rOpen = RegExp('<mark>', 'ig');
  let rClose = RegExp('</mark', 'ig');
  for (let i = 0; i < searchable.length; i++) {
    if (rOpen.test(searchable[i].innerHTML)) {
      searchable[i].innerHTML = searchable[i].innerHTML.replace(rOpen, '');
    }
    if (rClose.test(searchable[i].innerHTML)) {
      searchable[i].innerHTML = searchable[i].innerHTML.replace(rClose, '');
    }
  }
}

function clearSearch(ele) {
  ele.value = "";
}


function getAutoComplete(value) {
  //inspired by
  //https://www.w3schools.com/howto/howto_js_autocomplete.asp
  let par = document.getElementById("headerSearchText");
  fetch("autocomplete.php?suche=" + value)
    .then(response => {
      return response.json();
    }).then(json => {
    let a = document.createElement("div");
    a.setAttribute("id", "searchAutocomplete");
    a.setAttribute("class", "autocompleteItems");

    par.parentNode.appendChild(a);

    for (let jt in json) {
      console.log(jt);

      let b = document.createElement("div");
      b.innerHTML = "<strong>" + jt.substr(0, value.length) + "</strong>";
      b.innerHTML += jt.substr(value.length);

      b.innerHTML += "<input type='hidden' value='" + jt + "'>";

      b.addEventListener("click", function (e) {
        //since only one child with input
        par.value = this.getElementsByTagName("input")[0].value;
        showResultsAndStuff();

      });
      a.appendChild(b);
    }
  });
}

function closeAllLists() {
  /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
  let x = document.getElementById("searchAutocomplete");
  if (x === null) return;
  while (x.childNodes.length > 0) {
    x.removeChild(x.lastChild);
  }
  x.parentNode.removeChild(x);
}

/*==================================================================================================================
Sidebar
 ==================================================================================================================*/

/*=========================================================
Feature
*/
window.addEventListener('load', function () {
  featureHeaderChooser()
});

function featureHeaderChooser() {

  let ele = document.getElementById('FeatureArticleTemplate');
  let input = document.getElementById('FeatureHeaderHClick');
  let parent = document.getElementById("FeatureArticleGroup");


  const path = "./data/aside.json";
  fetch(path).then(response => {
    return response.json();
  }).then(json => {
    //clear Children
    //>3 -> has on startup 3 children
    while (parent.childNodes.length > 3) {
      parent.removeChild(parent.lastChild);
    }


    let manipulate = "";
    if (input.value === 'FeatureHeaderH1') {
      manipulate = json.Feature[0];
    } else if (input.value === 'FeatureHeaderH2') {
      manipulate = json.Feature[1];
    } else if (input.value === 'FeatureHeaderH3') {
      manipulate = json.Feature[2];
    }
    for (let item in manipulate) {
      let clone = ele.content.cloneNode(true);

      let field = clone.getElementById("FeatureArticleCategory");
      field.innerHTML = field.innerHTML.replace(/{{Category}}/ig, manipulate[item].Category);
      field.id = "";

      field = clone.getElementById("FeatureArticleHeader");
      field.innerHTML = field.innerHTML.replace(/{{Header}}/ig, manipulate[item].Header);
      field.id = "";


      parent.appendChild(clone);
    }

    //to add the colors
    let tmp = document.querySelectorAll('article.FeatureArticle');
    tmp.forEach((it) => {
      it.addEventListener('mouseenter', function () {
        colorLeftHover(this)
      });
      it.addEventListener('mouseleave', function () {
        colorLeftHover(this)
      });
    });
  });
}


document.querySelectorAll('.FeatureHeaderH').forEach((it) => {
  it.addEventListener('click', function () {
    onClickColorBottom(this)
  });
  it.addEventListener('mouseenter', function () {
    colorBottomHover(this)
  });
  it.addEventListener('mouseleave', function () {
    colorBottomHover(this)
  });
})


//hidden field -> id of element that is chosen
function onClickColorBottom(ele = document.getElementById('FeatureHeaderH1')) {
  const eleh = document.getElementById('FeatureHeaderHClick');
  if (ele.id !== eleh.value) {
    ele.style.borderBottomColor = 'black';
    document.getElementById(eleh.value).style.borderBottomColor = 'white';
    eleh.value = ele.id;

    //sets the display sidebar
    featureHeaderChooser();

  }
}

function colorLeftHover(ele, color = '') {
  const eleP = ele.childNodes[1];
  if (color === '') {
    color = colorChooser(eleP.innerHTML);
  }

  const colorStyle = ele.style.borderLeftColor;
  if (colorStyle === color) {
    ele.style.borderLeftColor = 'white';
    eleP.style.color = 'black';
  } else {
    ele.style.borderLeftColor = color;
    eleP.style.color = color;
  }
}

/*==================================================================================================================
Global functions
 ==================================================================================================================*/

function colorBottomHover(ele, colorA = 'black', colorB = 'white', toColor = 'borderColor') {
  if (ele.style[toColor] === colorA) {
    const eleh = document.getElementById('FeatureHeaderHClick');
    if (ele.id !== eleh.value) {
      ele.style[toColor] = colorB;
    }
  } else {
    ele.style[toColor] = colorA;
  }
}

function colorChooser(name, opacity = '1') {
  let color;
  if (opacity === '1') {
    switch (name) {
      case 'Netzpolitik':
        color = 'rgb(0, 139, 139)';
        break;
      case 'B2B':
        color = 'rgb(0, 128, 0)';
        break;
      case 'Produkte':
        color = 'rgb(0, 0, 255)';
        break;
      case 'Digital Life':
        color = 'rgb(255, 105, 180)';
        break;
      case 'Science':
        color = 'rgb(255, 0, 0)';
        break;
      case 'Meinung':
        color = 'rgb(255, 165, 0)';
        break;
      case 'Games':
        color = 'rgb(255, 69, 0)';
        break;
      case 'Apps':
        color = 'rgb(0, 255, 0)';
        break;
      case 'Start-Up':
        color = 'rgb(128, 0, 128)';
        break;
      case 'Community':
        color = 'rgb(0, 255, 255)';
        break;

      case 'Fuzowatch':
        color = 'rgb(255, 0, 0)';
        break;
      default:
        color = 'rgb(0, 0, 0)';
        break;
    }
  } else {
    switch (name) {
      case 'Netzpolitik':
        color = 'rgba(0, 139, 139, ' + opacity + ')';
        break;
      case 'B2B':
        color = 'rgba(0, 128, 0, ' + opacity + ')';
        break;
      case 'Produkte':
        color = 'rgba(0, 0, 255, ' + opacity + ')';
        break;
      case 'Digital Life':
        color = 'rgba(255, 105, 180, ' + opacity + ')';
        break;
      case 'Science':
        color = 'rgba(255, 0, 0, ' + opacity + ')';
        break;
      case 'Meinung':
        color = 'rgba(255, 165, 0, ' + opacity + ')';
        break;
      case 'Games':
        color = 'rgba(255, 69, 0, ' + opacity + ')';
        break;
      case 'Apps':
        color = 'rgba(0, 255, 0, ' + opacity + ')';
        break;
      case 'Start-Up':
        color = 'rgba(128, 0, 128, ' + opacity + ')';
        break;
      case 'Community':
        color = 'rgba(0, 255, 255, ' + opacity + ')';
        break;

      case 'Fuzowatch':
        color = 'rgba(255, 0, 0, ' + opacity + ')';
        break;
      default:
        color = 'rgba(0, 0, 0, ' + opacity + ')';
        break;
    }
  }
  return color;
}

function z() {
  var fibonacci = [0, 1, 1, 1]
  for (let elem in fibonacci) {
    console.log(elem);
  }
}
