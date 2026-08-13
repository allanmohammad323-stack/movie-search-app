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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Genre Filter and Sort Options Decision
Options Considered
I considered four approaches for implementing genre filtering and sorting:

Separate State Variables

Combined Filter Object

URL Query Parameters

Context/Reducer Pattern

Decision
I decided to use Separate State Variables with useState for genre filter and sort options.

Reasons for Choosing Separate State Variables
Simple and Clear: Each filter has its own state, making the code easy to read and understand

Independent Control: Genre and sort options can be changed separately without affecting each other

Easy to Reset: Individual filters can be cleared or reset without complex logic

Direct API Mapping: Each state variable maps directly to an API parameter

Quick to Add New Filters: Adding another filter (like year or language) is as simple as adding another useState

No Over-engineering: Keeps the code simple without unnecessary complexity

Easy to Debug: State changes are explicit and easy to track

How They Work Together
Both filters work together seamlessly by:

Combining genre and sort parameters into a single API request

Each filter change triggers one API call with both filters applied

The API receives both parameters and returns combined results (e.g., "Action movies, sorted by rating")

Why I Did Not Choose the Other Options
Combined Filter Object
Requires more complex logic to update individual properties

Harder to reset specific filters

Makes it harder to track which filter actually changed

URL Query Parameters
Adds complexity with URL syncing

Requires additional routing setup

Overkill for this simple application

Context/Reducer Pattern
Adds unnecessary boilerplate code

Too complex for just two filters

Makes the code harder for beginners to understand

Performance and User Experience Benefits
Efficient API Calls: Only one request is made when both filters change

Instant Feedback: Users see results immediately when changing filters

Preserves Other Filters: Changing one filter doesn't reset the other

Clear State: Users can always see which filters are currently applied

Final Choice
Separate State Variables with useState is the best choice because it provides the simplest, most maintainable solution that still handles both filters working together effectively. It balances simplicity with functionality, making the code easy to understand while delivering a smooth user experience.