# feedia

Media feed

# Code Flows

## Auth

The UI/API authentication flow involves a few steps and is worth documenting:

1. User opens UI `/login` route and clicks login button (ui/../login/Login.vue)
2. Button redirects the user to the API `/auth/google` endpoint (api/../routes/auth.ts)
3. The `/auth/google` endpoint redirects the user to the Google Auth0 page
4. The user logs into Google
5. If successful, Google Auth0 redirects to the API at `/auth/google/callback`
   1. If unsuccessful, the route redirects to the UI `/login` with the `authError` query parameter set to `true`
6. The API pulls the user profile info off the Google response
7. The API stores the user info in Postgres with an upsert
8. Within `/auth/google/callback`, the API creates a token with a subset of the user info
9. The API redirects back to the root of the UI with a query parameter `token`
10. The UI intercepts the `token` query parameter, saves the value in the `user` store, and removes the query parameter from the URL (ui/../router/guards.js)
11. The UI client continues to use the token to make API requests

## Storage of Title Information

Title (i.e. movie and book) information is retrieved from external sources like Open Library and The Movie Database. The app stores some information that links to these external sources. The app primarily stores the external data source ID (e.g. Open Library), the data type (e.g. Book), and the title. The title can then be linked to external data sources as well as other internal data, like ratings and reviews.

### Internal Title Population

There is no initial data load as there are millions of records from the external sources. Instead, titles are populated as they are consumed by users.

1. User searches for titles
2. App checks relevant external data sources for matching titles
3. App displays the titles from the external sources
4. Right after title information is displayed to the user, we begin matching the external title information to internal title information
   1. The front end passes the titles with the following information:
      - Title
      - Media type (e.g. movie)
      - External data source
      - External ID
5. For each title in the array, the API searches for an existing title in the `title` table, searching by external data source and ID via a join from `table` to `title_external_id`.
6. The back end returns a modified array, adding internal information to the external information (without overlaps).
   1. The key here is the `id` field, which is the internal title ID. If no match is found, then the internal title ID is `undefined`.
7. In the front end, the API results with the internal information are joined to the external information
8. The front end displays title internal information where it exists
9. When a user selects a title, the front end makes a similar request to the back end, but now only for one title
   1. If the front end has an internal ID for the title, it passes it to the back end. Otherwise, it passes the external info listed above (title, media type, external data source, external ID).
10. The back end executes a similar lookup process (by internal or external identifiers) to get title information
11. If the title exists, the back end returns relevant information (like ratings, reviews, etc.). This time, if the title does not exist in the `title` table, a new record is created with the information passed from the front end. The new ID is returned to the front end (and obviously the other information is undefined).
12. The front end displays the internal information. If there wasn't an ID before, it modifies the route for the details page so that it is reproducable without external information. (This does leave a gap between page opening and link updating, but I think it is an acceptable gap.)
