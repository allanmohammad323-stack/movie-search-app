# Movie Pagination Decision

## Options Considered

I considered four pagination approaches for displaying movies:

1. **Load More Button**
2. **Infinite Scroll**
3. **Next / Previous Buttons**
4. **Numeric Pagination**

## Decision

I decided to use **Numeric Pagination** for the movie list.

## Reasons for Choosing Numeric Pagination

* **Easy Navigation:** Users can quickly move between different pages of movies.
* **No Long Scrolling:** Unlike Load More and Infinite Scroll, the page does not become extremely long as more movies are loaded.
* **Easy to Go Back:** Users can return directly to a previous page without scrolling through all the previously loaded movies.
* **Familiar Pattern:** Numeric pagination is a common and familiar navigation pattern that most users already understand.
* **Clear Current Position:** Users can easily see which page they are currently viewing.
* **Better Organization:** Movies are separated into manageable pages instead of displaying a continuously growing list.
* **Efficient Rendering:** Only the movies for the current page need to be displayed, rather than keeping hundreds of movie cards in the DOM.

## Why I Did Not Choose the Other Options

### Load More

Load More is simple to implement, but continuously adding movies makes the page increasingly long. This makes it harder for users to navigate back to movies they previously viewed.

### Infinite Scroll

Infinite Scroll provides a smooth browsing experience, but it can make navigation difficult. Users may have to scroll through a large amount of content to find previously viewed movies.

### Next / Previous

Next / Previous is simple and provides good navigation, but numeric pagination gives users more control because they can directly select a specific page.

## Final Choice

**Numeric Pagination** provides the best balance between usability, navigation, organization, and performance for this movie application.


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# Search Input Decision
## Options Considered

I considered two main techniques for controlling the movie search requests:

1. **Debounce**
2. **Throttle**
## Decision

I decided to use Debounce for the movie search input.

## Reasons for Choosing Debounce
Waits Until the User Stops Typing: The search request is sent only after the user stops typing for the chosen amount of time.
Reduces API Requests: It prevents sending a request for every character the user types.
Better for Search: Search usually needs the user's final input rather than every intermediate value.
Improves Performance: Fewer API requests means less unnecessary work for both the application and the API.
Better User Experience: Users can type normally without triggering a request after every keystroke.
Simple Behavior: The timer resets whenever the user types again, and the function runs only when the timer completes.
Why I Did Not Choose Throttle
**Throttle**

**Throttle runs the function at most once during the chosen time interval, even if the user continues typing.

This means API requests can still be sent while the user is typing. For a movie search, this can result in unnecessary requests for incomplete search terms.

Why Throttle Is Better for Other Events

Throttle is more suitable for events that happen continuously, such as:

* Scrolling
* Mouse movement
* Window resizing
## Final Choice

**Debounce** provides the best balance between API efficiency, performance, and user experience for the movie search input because the request runs after the user stops typing.