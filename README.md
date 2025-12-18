# MEDP33100 - Final Project, Public Archive

## Live Demo

- https://the-wishing-fountain.onrender.com

## Project Overview

- This is a public archive project: 
    A wishing fountain, where it stores the total amount of coins tossed and total value of all coins.
    Users drag and drop (on desktop), tap and toss (on mobile)
    Filter buttons to control what type of data to display

## Endpoints

- PUT '/toss/:coin': Updates the count of a specific coin when tosses 
    - Request parameters: coin type (penny, nickel, dime, quarter)
- GET '/stats': Retrieves current coin statistics (total value, total count, breakdown by coin type)

## Technologies Used

- List the technologies and tools used in the project:
    - **Languages**: HTML, CSS, JavaScript
    - **Libraries**: N/A
    - **Other**: Figma for design, Procreate and Clip Studio Paint for asset illustrations, OpenAI for A.I. generated code, etc.

## Credits

- Request Methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods
- Coiny font: https://fonts.google.com/specimen/Coiny?categoryFilters=Feeling:%2FExpressive%2FPlayful;Appearance:%2FTheme%2FBlobby
- Drag and Drop: https://www.w3schools.com/html/html5_draganddrop.asp#:~:text=Do%20the%20Drop%20-%20ondrop,dropped%2C%20a%20drop%20event%20occurs.&text=Code%20explained:,element%20into%20the%20drop%20element , https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API 
- Sidebar: https://www.w3schools.com/howto/howto_js_sidenav.asp
- Routing: https://expressjs.com/en/guide/routing.html
- https://www.geeksforgeeks.org/mongodb/mongodb-cheat-sheet/ 
- Tap to toss for mobile: https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event
- https://mongoosejs.com/docs/api/model.html#model_Model.findOne, https://developer.mozilla.org/en-US/docs/Web/API/Navigator/maxTouchPoints, https://developer.mozilla.org/en-US/docs/Web/API/Navigator
- Filters: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
- CurrentTime: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
- Water Drop Sound: https://freesound.org/people/deleted_user_2104797/sounds/166318/ 


## Future Enhancements

- More animations (page loading, coin dropped, etc)
- Tailored to my aesthetic taste, make it pop out more and not be so flat
- Implement more features, such as filtering by date, and adding an option to enable instructions again
- Improved mobile layout
- More sounds, potentially background music
