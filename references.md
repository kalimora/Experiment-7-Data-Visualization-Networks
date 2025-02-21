# References

## Data Visualization & Mood Tracker

This project for CMPM 169: Creative Coding involved the creation of a mood tracker that allows users to visualize their mood throughout the year. The application was developed using p5.js and incorporates functionality for tracking daily moods, adding notes, and adjusting for leap years.

### Resources

1. **Leap Year Calculation**:
   - Utilized standard leap year calculation to adjust the number of days in February:
     ```javascript
     if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
         monthDays[1] = 29;
     } else {
         monthDays[1] = 28;
     }
     ```

2. **Local Storage API**:
   - Browser's local storage was used for saving and retrieving user data:
     [Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

### Inspirations

- Inspired by traditional paper-based mood trackers, this project aims to digitize the process allowing for ease of tracking and visualizing mood trends over time.
