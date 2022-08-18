# Landing Page Project

## Table of Contents

* [Instructions](#instructions)
* [Description](#description).
* [Dependencies](#dependencies).
* [Installation](#installation).
* [How To / code reference...](#How-To-...).

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.



## Description

- The app.js has been linked to the HTML file.
- The HTML, index.html, has at least 3 content sections.
- A navigation menu has been built.
- The functionality to distinguish the section in view has been added.
- The functionality to scroll to sections has been added.
- The functionality to a dd an active state to the navigation items when a section is in the viewport has been added as well.
- The navigation bar hides when the user stop scrolling. However, the navigation bar is still present on page load of when user scrolls to top of the page.
- A scroll to top button on the page has also been added, the scroll to top button is only visible when the user scrolls below the fold of the page.
- The sections are collapsible. When the page loads, all sections are expanded (sounds counter intuitive but the functionality is working 100%). However, the collapse functionality exists and the user can collapse or expand any section.
- The HTML and the CSS files were both Updated/changed. The design/content were kept the same and no additional sections were added in the version I am sending to you, but everything was built to dynmically adapt to any changes in the html content.


## Dependencies
- None.

## Installation
- Open the index.html in any browser.

## How To ...
- The code in the function `document.addEventListener('DOMContentLoaded', function(e) {
  buildNavMenu();
  buildScrollToTopButton();
  addScrollingFunctionality();
  buildInteraction();
  activateNavBarHiding();
  addCollapseButtons();
});` in the app.jsp file is the entry point for the small app. It is responsible for building and adding all additional HTML element and element listeners once the page content is loaded. 
- function names is self-explanatory..... e.g., 
- `buildScrollToTopButton()`, encapsulates the code for building the scroll to top button.
- `buildCollapseButton(arg1)`, encapsulates the code for building the collapse button/anchor, this function takes an id (arg1) and return an html anchor( functions as a button) element. Later, the `addCollapseButtons()` function uses it for building a collapse button for each section in the page.
- `buildNavMenu()`, build the navigation bar/menu.
- `buildInteraction()`, this function, in addition to highlighting/distinguishing the section in view. It also add an active state to the navigation item in the navigation bar when a section is in the viewport.
- `addScrollingFunctionality`, this function enables navigating/scrolling the chosen section whenever the corresponding item in the nav. menu is clicked. I oped for using the `scrollIntoView()` instead of `scrollTo()`.
- `activateNavBarHiding()`, this function encapsulates the logic for hiding the navigation bar when the user stop scrolling, but the navigarion bar is dieplayed on page load or when the user scrolls to top.
- `addCollapseButtons()`, as indicated earlier, this function attaches a collapse button (built by the `buildScrollToTopButton()`) to each section, buld the listened for each button as well, and then attach the elements to the html page in the right places.

