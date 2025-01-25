This is a SvelteKit project for a client review and service management system.
I practiced using sveltekit and svelte and also learned some frontend and backend concepts.

Used Jwt for authentication and authorization. 
I also used cookies to store the jwt token and stores to store the data in the token so that it can be accessed in the components.

#Problems
1. Multiple calles to the api server to get the data. I havenot figured out how to get the data in one call and pass it to the child components. I have the idea of loading the data in the dashboard root then passing it to the child components but I haven't figured out how to do it, I keep getting an undefined when I try to access the data in the child components.

2. I do not know how to use popovers well enough, also, when I update in the service and review page with popovers, I want the popover to close only after the update is done.

3. Also have issues with the image upload.

thats all for now. I think.

Don't forget to Include the MIT License in your project
Site is not responsive as of this moment

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
