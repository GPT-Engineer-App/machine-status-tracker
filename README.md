# machine-status-tracker

A web app with 
main page - card display of "machines" and their status.
Status are - operational, second factor needed, non operational. 
When pressed each card would lead to the page of that "machine" where depending on the status the user could interact with that machine, if status is closed- user can fill a checklist for opening the machine. If status is second factor needed, the user will be able to fill a checklist for a second factor to the opening process. If status is operational the user will be able to see an 08 hours timer counting down from when the machine went through a successful process of opening by first and second factor, which will be viewed by an avatar picture and name to identify who opened the machine 

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/machine-status-tracker.git
cd machine-status-tracker
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
