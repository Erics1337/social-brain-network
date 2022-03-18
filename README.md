# The Social Brain Network
Not a social network, but a social network management system
	- A tool to manage the grouping of your social connections within the framework of the social brain hypothesis
## Functionality
- Follow/Unfollow other users
- Friend suggestions
- User profile that displays user's posts and account management options
- Search for users
- Feed that displays posts from members of each of your groups and loads posts on an infinite scroll
- Make a post from anywhere in app with modal
- Like/comment on posts
- Landing page explaining the Social Brain Network
- Friend Groupings associated with ranks of Dunbar's theory
- 1-on-1 messaging
- Unread message notifications
- Dark/Light UI mode based on user system preference
## Feature Wish-list
- Group chat messaging
- A personal journal feature for non-visible posts

## The Social Brain Hypothesis and Dunbar's number
https://youtu.be/zZF6vXMGBOw
## Started from tutorial by papareact:
https://www.youtube.com/watch?v=a6Xs2Ir40OI&list=PLtisOZsxayjEC3ouCwhkTSG4twFqI7eo7&index=9&t=8517s

## This Project Uses these libraries and technologies:
+ Tailwind
+ Headlessui - tailwind library for use with modal (Dialog, Transition)
+ Heroicons
+ Firebase v.9 - Storage solution from google; NoSQL and image hosting
+ Moment - formatting dates
+ Formik and Yup for forms and validation
+ randomuser.me - API for random user data to assign profile images
+ react-dnd - drag and drop library for groups page
+ react-select - dropdown menu library for search box with dynamic options
+ react-infinite-scroll-hook - Infinite scroll library for posts feed

## Next.js + Tailwind CSS
This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v2.2)](https://blog.tailwindcss.com/tailwindcss-2-2) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).
It uses the new [`Just-in-Time Mode`](https://tailwindcss.com/docs/just-in-time-mode) for Tailwind CSS.

## Get Started

```
npm install
npm run dev
```

## Testing
```
npx cypress open
```
### Specs
1. user_login.spec.js - user can log in and out