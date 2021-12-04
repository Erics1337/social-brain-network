# The Social Brain Network
Not a social network, but a social network management system
	- A tool to manage the grouping of your social connections within the framework of the social brain hypothesis
## Feature Wish-list
- Allows links (instagram does not, unless you are an influencer)
- Friend Groupings associated with ranks of Dunbar's theory
- A personal journal feature for non-visible posts

## The Social Brain Hypothesis and Dunbar's number
https://youtu.be/zZF6vXMGBOw
## Started from tutorial by papareact:
https://www.youtube.com/watch?v=a6Xs2Ir40OI&list=PLtisOZsxayjEC3ouCwhkTSG4twFqI7eo7&index=9&t=8517s

## This Project Uses:
+ tailwind
+ headlessui - tailwind library we are using is tapping into
    ++ Dialog, Transition - For modal
+ heroicons
+ faker.js - generate massive amounts of realistic data
+ NextAuth.js - Handles CSRF tokens, password encryption, password reset emails, etc...
+ Firebase v.9 - Storage solution from google; NoSQL and image hosting
+ Recoil - State management - good for non nested components that need a global store
+ react-moment - library that allows us to pass the timestamp into a string

## Next.js + Tailwind CSS
This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v2.2)](https://blog.tailwindcss.com/tailwindcss-2-2) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).
It uses the new [`Just-in-Time Mode`](https://tailwindcss.com/docs/just-in-time-mode) for Tailwind CSS.

## Get Started
```
npm run dev
```