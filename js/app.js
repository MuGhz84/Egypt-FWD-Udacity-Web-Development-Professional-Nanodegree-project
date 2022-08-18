/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

// a variable stat stores the height of the screen/window on initiall load
let windowHeight;
const docSections = document.querySelectorAll("section");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function buildScrollToTopButton(){
  /**
   * instead of using an HTML button element for the scrollToTop button...
   * I use the
   * simple <a> element.
   */
  const navBtn = document.createElement("a");
  navBtn.id = "scrollToTop";
  navBtn.href = "#";

  /**
   * instead of using an image inside the button..
   * I use the
   * Unicode Character 'UP ARROWHEAD BETWEEN TWO HORIZONTAL BARS' (U+2324)
   */
  navBtn.textContent = 	"\u2324";
  
  document.body.appendChild(navBtn);
}


/**
   * this fnction creates a collapse button (of specific id and class) and return it...
   * to be appended to each section
   */
function buildCollapseButton(btnId) {
  const collapseBtn = document.createElement("button");
  collapseBtn.id = btnId;
  collapseBtn.type = "button";
  collapseBtn.classList.add("collapse");
  collapseBtn.textContent = "\u2796";
  return collapseBtn;
}




/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
/* this function encapsulates building the navigation items logic */
function buildNavMenu() {

    //const ulNav = document.getElementById("navbar__list");
    const fragment = document.createDocumentFragment();


    for (let i = 0; i < docSections.length; i++) {
        //let sec = docSections[i];

        //add an anchor, targeting the section element -Id- attribute
        let anchor = document.createElement("a");
        //anchor.href = docSections[i].getAttribute("id");
        anchor.href = "#"+docSections[i].id;
        anchor.appendChild(document.createTextNode(docSections[i].getAttribute("data-nav")));
        anchor.classList.add("menu__link");
        
        //add a list item, targeting the section element -datanav- attribute
        let listElem = document.createElement("li");
        listElem.appendChild(anchor);
        listElem.classList.add("nav_item");

        fragment.appendChild(listElem);
      }

      //attach the navigation items to the navigation menu/bar
      const navBar = document.getElementById("navbar__list");
      navBar.appendChild(fragment);
}



// Add class 'active' to section when near top of viewport
function buildInteraction() {
//Add functionality to distinguish the section in view. 
  let io = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
          let elem = entry.target;
          if (entry.intersectionRatio >= 0.80) {
            let activeNow = document.getElementsByClassName("your-active-class");
            activeNow[0].classList.remove("your-active-class");
            elem.classList.add("your-active-class");
// Add an active state to your navigation items when a section is in the viewport.
            let allLinks = document.getElementsByClassName("menu__link");
            let found;
            for(let i=0; i<allLinks.length; i++ ){
              allLinks[i].classList.remove("active");
              if ((allLinks[i].textContent) === elem.getAttribute("data-nav")){
                found = allLinks[i];
              }
            }
            found.classList.add("active");
          }
        }
      })
    },
    {
        root: null,
        rootMargin: '50px 20px 10px 40px',
        threshold: 1.0
    }
  );
  // Start observing an element
  const sections = document.querySelectorAll("section");
  for (let i = 0; i < sections.length; i++) {
      let sec = sections[i];
      io.observe(sec);
    }
}



// Scroll to anchor ID using scrollTO event
/* this function encapsulates the scrolling logic */
function addScrollingFunctionality () {

    const theList = document.querySelector('#navbar__list');
    //const items = theList.childNodes;

    theList.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "A") {
            e.preventDefault();
            let sectionID = e.target.getAttribute("href");
            sectionID = sectionID.substring(1);
            let targetSection = document.getElementById(sectionID);
            targetSection.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});


            /****
             * I find .scrollIntoView() more suitable than scrollTo() ...
             * , or maybe its just me can't use it properly!!!
             */
            
            /*
            let sectionWindow = targetSection.getBoundingClientRect();
            window.scrollTo({
                top: sectionWindow.top,
                left: sectionWindow.left,
                behavior: 'smooth'
              });*/
        }
    });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', function(e) {
  buildNavMenu();
  buildScrollToTopButton();
  addScrollingFunctionality();
  buildInteraction();
  activateNavBarHiding();
  addCollapseButtons();
});
// Scroll to section on link click
//addScrollingFunctionality();

// Set sections as active
//buildInteraction();



/**
 * 
 * Hide fixed navigation bar while not scrolling (it should still be present on page load).
 * ***Hint: setTimeout can be used to check when the user is no longer scrolling.
 */
 function activateNavBarHiding(){
   const navBar = document.querySelector(".page__header");
   let flag = null;
   document.addEventListener('scroll', function() {
    
    //code for handling the scroll to top button
    const scrollButton = document.getElementById("scrollToTop");
    windowHeight = window.innerHeight
    if(window.scrollY < windowHeight) {
      scrollButton.style.display = "none";
    } else if(window.scrollY > windowHeight) {
      scrollButton.style.display = "block";
    }
    //end of code for handling the scroll to top button

    //code for handling the show/hide of the navbar
    let nowScrollpos = window.pageYOffset;
     if(flag !== null) {
       clearTimeout(flag);
       navBar.classList.remove("hide");
      }
      flag = setTimeout(function() {
        if((nowScrollpos > 0)){
          navBar.classList.add("hide");
        }
      }, 100);
    });
    //end of code for handling the show/hide of the navbar
  }


  /**
   * 
 * Make sections collapsible.
 */

function addCollapseButtons() {
  //add a collapse button right after each section in the Section

  for (let i = 0; i < docSections.length; i++) {
    let sec = docSections[i];
    let header = sec.getElementsByTagName("h2");
    let btn = buildCollapseButton(sec.id + "__collapse");
    header[0].after(btn);
    btn.addEventListener("click", function(){
      let para = this.nextElementSibling;
      let para2 = para.nextElementSibling;
      if (para.style.display === "none") {
        para.style.display = "block";
        para2.style.display = "block";
        btn.textContent = "\u2796";
      } else {
        para.style.display = "none";
        para2.style.display = "none";
        btn.textContent = "\u2795";
      }
    });

  }  

  
   /*collapse.addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
         content.style.display = "none";
      } else {
         content.style.display = "block";
      }
   });*/
}