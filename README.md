# sqa-nov-2021-team7

**Google Meet Link**  
https://meet.google.com/jqg-jvhc-uvk

## The Team
|    Name    | GitHub |
|:----:|:------:|
| Samuel Crispin - **Developer & Tester** | [![Foo](https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-16.png)](https://github.com/SamCrispin) |
| Hou Fai Man - **Developer & Tester** | [![Foo](https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-16.png)](https://github.com/houfaiman) |
| Saeed Afzal - **Developer & Tester** | [![Foo](https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-16.png)](https://github.com/saeedafzal) |

## The Project
The project this repository holds is a Todo web application. This includes the front-end repository built using [React](https://reactjs.org/) and the backend API built using [Express](http://expressjs.com/).

## Performance and Accessibility Audit

![DEV Performance](./images/DEV%20Performance.PNG)
_Development Build_

![PROD Performance](./images/PROD%20Performance.PNG)
_Production Build_

![PROD Performance](./images/Accessibility.PNG)
_Accessibility_

Testing was conducted locally using the Google Lighthouse tool to generate a report 
containing a summary of the quality of our application. Lighthouse is a free and 
open-source tool that can be accessed through the development console for
Chromium-based browsers. The tool was executed twice - one for the development build, and another 
for production. 

In the production build, it revealed a score of 100 in performance and accessibility. 
However, running the same tool on the development build showed a discrepancy in the performance
with a score of 71. A possible reason for this is the production builds are more optimised; 
for example, the build is bundled and minified using Terser, which is a minification tool within Vite
for reducing file sizes. It also does not have any additional scripts such as hot reloading, which has
a websocket connection running in the background to detect changes, and this can impact performance
and time to paint.

Testing was conducted after the core functionalities were implemented.