# SOCIAL(API REST)

<p>Social back-end api REST to create users, profiles, and posts</p>

# Getting started

Make sure to add your mongo database connection string at `.env` file

Run `npm install` to get the packages

Run `npx prisma db seed` register base admin and categories

Run `npm run dev` to start the application

Run `npm run test` to see the coverage or open the index.html in `coverage/lcov-report`

---
# Request examples

## Query params
limit(number) the maximum number of items returned in the response
index(number) the index start of query

The maximum response itens by response is 20

## Users

<span style="color: purple;">GET</span>
<span> list all users: [`localhost:4001/users`](http://localhost:4001/users)</span>

<span style="color: purple;">GET</span> 
<span>find one user: [`localhost:4001/users/:user_id`](http://localhost:4001/users/:id)</span>

<span style="color: green;">POST</span>
<span>create user: [`localhost:4001/users/create?index=3`](http://localhost:4001/users/create?index=3)</span> 

<h3>Params</h3>
<ul>
  <li>name: required</li>

  <li>email: required</li>

  <li>jobTitle: optional</li>
</ul>

```JSON
  {
    "name": "string",
    "email": "string",
    "jobTitle": "string"
  }
```

## Profile

<span style="color: green;">POST</span>  
<span>[`localhost:4001/profile/create`](http://localhost:4001/profile/create)</span>

```JSON
  {
    "biography": "string",
    "user_id": "string"
  }
```

## Posts

<span style="color: purple;">GET</span>
<span>list all posts: [`localhost:4001/posts`](http://localhost:4001/posts)</span>

<span style="color: purple;">GET</span>
<span>findo one post: [`localhost:4001/posts/:post_id`](http://localhost:4001/posts/:id)</span>

<span style="color: green;">POST</span>
<span>[`localhost:4001/posts?index=3&limit=10`](http://localhost:4001/posts?index=3&limit=10)</span>

<h3>Params</h3>
<ul>
  <li>title: required</li>

  <li>content: required</li>

  <li>author_id: required</li>

  <li>tags: optional</li>

  <li>category_id: required</li>
</ul>

```JSON
  {
    "title": "string",
    "content": "string",
    "author_id": "string",
    "tags": [
      "string"
    ],
    "category_id": "string"
  }
```

<span style="color: orange;">PUT</span>
<span>[`localhost:4001/posts/:post_id`](http://localhost:4001/posts/:post_id)</span>

<h3>Params</h3>
<ul>
  <li>content: optional</li>

  <li>tags: optional</li>
</ul>
<h3>Headers</h3>
<p>user_id</p>

```JSON
  {
    "content": "string",
    "tags": [
    "string"
    ]
  }
```

<span style="color: red;">DELETE</span>
<span>[`localhost:4001/posts/post_id`](http://localhost:4001/posts/:post_id)</span>

<h3>Headers</h3>
<p>user_id</p>

## Categories

<span style="color: purple;">GET</span>  
<span>[`localhost:4001/categories`](http://localhost:4001/categories)</span>

<span style="color: purple;">GET</span>  
<span>[`localhost:4001/categories/:category_id`](http://localhost:4001/categories/:category_id)</span>

# Languages, Frameworks, API's

<ul>
  <li>JS</li>

  <li>NODE</li>

  <li>TS</li>

  <li>Express</li>

  <li>Axios</li>

  <li>Prisma</li>

  <li>Cors</li>

  <li>Jest</li>

  <li>Validator</li>
</ul>
