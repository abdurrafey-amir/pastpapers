# PastPapers

A web app for browsing and generating A-Level past papers.

## Features
- Browse by exam board, subject, topic, year, and paper number  
- Combine selected questions into a PDF with marking schemes  
- Simple, responsive React frontend + Flask backend  
- SQLite database with support for exam boards, subjects, topics, and questions  

## Tech Stack
- **Frontend:** React  
- **Backend:** Flask (Python)  
- **Database:** SQLite with SQLAlchemy  

## Demo
for now, there's only 1 actual question in the database. to test the pdf generation, choose these options.

- Board: CIE
- Subject: Physics
- Topic: Forces or You can choose both aswell
- Paper: 2 or the default option
- Years: 2020 and any other year

 I'll be adding more questions with actual refined pictures soon after i get the necessary data and clean it up. I added this one question just to test the pdf generation and if you choose any other option that doesn't include this question then you probably won't get an error anywhere other than the console (i'll fix this too so that it actually tells you that question isn't available)


demo url: https://pastpapers-ship.onrender.com/ (wait for it to load if it is inactive)