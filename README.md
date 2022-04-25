# Put Gang Console

The Put Gang project is broken into two repositories: `put-gang-landing` and `put-gang-console`. The former is just a landing page from which the signup flow is initialized. The customer completes the Stripe payment flow from here via modals. Some data is then passed to `put-gang-console` via params, where the Firebase user is created. This gives access to a dashboard / console where either just `<Settings/>` are displayed (for junior users) or full MLM access (for senior users).


## Multi-Level Marketing Structure

The user hierarchy has 5 levels as follows: `admin`, `level-1`, `level-2`, `level-3` and `standard`. That is also the order of seniority, with the last two at the roughly the same access level and considered 'junior'. The other 3 are typically regarded as 'senior'. Since the `admin` is the most senior, they have access to everything and can see all users. There is only a single `admin` per project.

New affiliate users are created by using a referral link to signup (see `<Links/>` section in the console UI description below). For example, if an `admin` user provides a link to a new user, then the new user will have a `role` of `level-1`. Similarly, a `level-1` user will produce a `level-2` which in turn can produce a `level-3`. If a user signs up without an affiliate link, they will be `standard` and outside of the MLM system.

By default, the MLM structure is hidden from a `level-2` user. However, they can opt-in and gain access to the admin console. This allows them to see all of the pages listed in the console UI structure below.

Affiliate users can only see their subordinates. As an example, a `level-1` user would be able to see `level-2` users whom they have recruited. The `level-1` would also see `level-3` users who that `level-2` has recruited. So basically anyone below them in the hierarchy tree. However, they would not have access to users at a lower level that have been recruited by someone else not originating from them.


## Console User Interface Structure

The console UI is broken down into two broad parts: The navigation menu on the left hand side and the user menu at the top right. Only senior users have access to the former whereas all users have access to the latter.

### Navigation Menu

When a senior user gains entry after logging in, they have access to several different pages via the nav menu. There is `<Console/>`, `<Users/>`, `<Affiliates/>`, `<Links/>` and `<Charts/>`.

The `<Console/>` displays `stats` related to revenue, MRR and payment due to the affiliate(s). There is also an `activities` list that displays recent events to senior users.

Within `<Users/>` is a table that displays all users when `admin` or just subordinates for other senior users. This lists role, membership level, join and expiry dates. Clicking on a user opens a modal that displays their payment history and a list of receipts.

Similarly, `<Affiliates/>` is a table that just lists subordinate affiliates of the user in the MLM structure (and thus never `standard` or `level-3` users). This gives the `stats` for each of them. Clicking on an affiliate opens the `<Affiliate/>` page where the `stats` are displayed again at the top followed by a list of all the affiliates invoices and their payment statuses.

The `<Links/>` section is for senior users and contains several automatically generated links that can be easily copied and given to prospective customers. These are the web addresses of `put-gang-landing` but with params relating to the user. Any customer that uses one of these links to signup will become a subordinate user of the referrer.

Finally, the `<Charts/>` section displays aggregated `stats` data for the past year for the `admin` user only.

### User Menu

The user menu has three parts - `Home`, `<Settings/>` and `Logout`. These are available to all users.

Selecting `Home` redirects to the default page for the user. If they are senior, then `Home` will redirect to `<Console/>`. For junior users, they will remain on `<Settings/>` as they don't have access to the navigation menu.

The `<Settings/>` section allows the user to configure several pieces of data for their account. They can set `name` as will appear throughout the console. They can also set their `insta` handle which sets a profile image. The Discord integration is also set here. The `admin` can also toggle the availability of `card` payments. For junior users (including `level-2` without MLM activation), this is the only page they have access to.

The last part is `Logout` that logs the user out of Firebase and returns them to the login page.

-----------------------------------------------------------------------------


## Initial Setup

Since the whole project lies behind a login screen, even just setting up the Put Gang project as a developer requires hooking up to Firebase. Ask for the credentials from @phillypro.

If creating a new platform (i.e. outside of Put Gang) from this repository, set up a new [Firebase project](https://firebase.google.com/) first. This will be required for hosting, functions and Firestore database.

Either way, fork the project and run the following shell commands.

### `npm install -g firebase-tools`

After setting up the Firebase project, install the Firebase CLI.

### `firebase login`

You will also need to [login](https://firebase.google.com/docs/cli#sign-in-test-cli) and link this project to the remote, which will be the Google account associated with it.


## Project Setup

In the **put-gang-console directory**, run the following commands:

### `npm install`

Install all of the Node dependencies for React and other third party packages used in the frontend.

### `npm run start`

Opens the browser at `localhost:3000` on the login page.

### `cd functions && npm install`

Navigate to the functions folder in a **new shell tab** to complete configuration of Firebase functions. Install all of the Node dependencies for Express and other third party packages used by Firebase functions.

### `npm run start`

Run the `start` script to spin up a new server. This allows local access to Firebase Functions.


## Contribution Guidelines

When building a new feature, developers should create a new branch. On completion, the branch should be pushed to `main` for review by the repo owner (@Isoaxe or @phillypro in the case of Put Gang). Following a successful review, the branch will be merged with `main`. It is the developers responsibility to fully test the new feature and ensure that it works as expected.

### `npm run deploy` (repo owner only)

Navigate to the `put-gang-console` root directory. After merging the feature branch to `main` and pulling from the remote, the **project owner** (_not_ the developer) should deploy the updated codebase to the hosted environment.
