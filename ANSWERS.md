1. How long did you spend on the coding test?
```
I spent around 14 hours~
```

2. What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
```
If I had more time, and considering the scope of the project:

API:
 Input valditation - some Schema validation like ZOD.
 A better caching layer
  
Frontend: 
 Translations
 Better error handling - more user-oriented errors to improve UX
 Better loading state management, such as implementing React context
 A table to see the current stock of fruit for an office
  
Ops:
 HTTPS, CORS, Sanitization
 Backups
  
Testing:
 Better tests
```

3. Describe your solution in plain English. Point out your design decisions and the reasoning behind them.

After reading the reqiurements, I chose a fairly straightforward stack with some project-specific decisions.
```
For our API backend, I chose:
 Nodejs/Ts as requested
 Drizzle ORM
 Morgan for logging
 Axios
 Jest
For our frontend:
 Preact + TS
 Tailwindcss
 React-Query
 Vite


I initially started the project with a goal to keep it simple - not over-engineer and not get into a position where I would require some outside help (AI) to implement a new tool because of my lack of knowledge. 


The tech stack I chose for the backend involved Drizzle ORM - an ORM framework I have no knowledge of, but I wanted to learn and try it out for a while. I did not want to have pure SQL commands, and the readme mentioned scaleability, therefore I used Drizzle ORM to have some schema-first solution that gives us type-safe SQL features and keeps the projects bundle size down.

On the topic of Scaleability, I created some useful utilities that I would want in a basic project, such as 
Easy to read API Logging using Morgan
General API responses & status codes to improve DRY
React query and separated hooks to handle caching, errors, refetching, and all the other goodies that come with it.
Split the functionality of the API into Routes, Controllers, Services to keep testing easier, separate concerns, and keep our service logic reusable. 


I also went with TailwindCSS mostly because I am comfortable with it and thoroughly enjoy using it - I'm not a big
fan of splitting styling into multiple files as I feel that adds even more complexity in terms of file bloat, especially
in a full-stack monolith. Tailwind, mostly, avoids that. Another reason is that I really enjoyed Lepaya's design theory and felt that adding some of those to this project will benefit me, Tailwind allows me to create easy-to-use generic components.

As for the front-end design, I went with a simple centered design, keeping it simple and easy to use. I went with Tabs 
to switch context between receiving information and giving information since those were the only 2 requirements 
It felt natural to make it into 2 tabs.

I did feel like I wanted to spice it up a little bit, so I added a minigame into the website since I know that Office Managers mostly "don't do anything all day" (Joke). Now they can push some fruit into the garbage on our page.

As for testing, I went with the standard Jest for API and Playwright for the frontend, mostly because they are easy to use.

Little caveat: 
 I went with Preact - which is a thinner, faster, and more suited solution to this project to keep performance optimal. Preact is a React alternative that keeps most of React's API features and is fully compatible with any React library/tool. I assumed this would be ok in terms of tech stack choice. I wanted to keep performance snappy and impressive.

```


4. Have you learned something new doing this test? If yes, describe it here.
```
 Yes, I picked up some basic Drizzle ORM knowledge and figured that I still like Prisma more, for now.
 I have not used Docker too much in my career. I learned how to set up configuration files, bang my head against the wall, and my AI friend to allow you guys to build, compose, and serve the whole project in one command, and I am now excited to use Docker for other projects & ideas.
 I'm not a backend-heavy engineer; Most of my career has been focused on the frontend or managing a team that has specialist backend engineers. I learned a lot while creating this project; What are the best practices and how to separate concerns correctly. Coming from a NextJS backend to creating a pure Express backend that is scalable was a challenge, but, I enjoyed it a lot and appreciate the opportunity to build this project and interview.

  
```