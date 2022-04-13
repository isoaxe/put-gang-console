# Put Gang Console

The Put Gang project is broken into two repositories: `put-gang-landing` and `put-gang-console`. The former is just a landing page from which the signup flow is initialized. The customer completes the Stripe payment flow from here via modals. Some data is then passed to `put-gang-console` via params, where the Firebase user is created. This gives access to a dashboard / console where either just settings are displayed (for lower tier users) or full MLM access (for upper tier users).


## Multi-Level Marketing Structure

The user hierarchy has 5 levels as follows: `admin`, `level-1`, `level-2`, `level-3` and `standard`. That is also the order of seniority, with the last two at the roughly the same access level and considered 'junior'. The other 3 are typically regarded as 'senior'. Since the `admin` is the most senior, they have access to everything and can see all users. There is only a single `admin` per project.

New affiliate users are created by using a referral link to signup (see `<Links/>` section in the console UI description below). For example, if an `admin` user provides a link to a new user, then the new user will have a `role` of `level-1`. Similarly, a `level-1` user will produce a `level-2` which in turn can produce a `level-3`. If a user signs up without an affiliate link, they will be `standard` and outside of the MLM system.

By default, the MLM structure is hidden from a `level-2` user. However, they can opt-in and gain access to the admin console. This allows them to see all of the pages listed in the console UI structure below.

Affiliate users can only see their subordinates. As an example, a `level-1` user would be able to see `level-2` users whom they have recruited. The `level-1` would also see `level-3` users who that `level-2` has recruited. So basically anyone below them in the hierarchy tree. However, they would not have access to users at a lower level that have been recruited by someone else not originating from them.


## Console User Interface Structure

When a user gains entry after logging in, they have access to several different pages via the nav menu. There is `<Console/>`, `<Users/>`, `<Affiliates/>`, `<Links/>` and `<Charts/>`.

The `<Console/>` displays `stats` related to revenue, MRR and payment due to the affiliate(s). There is also an `activities` list that displays recent events to senior users.

Within `<Users/>` is a table that displays all users when `admin` or just subordinates for other senior users. This lists role, membership level, join and expiry dates. Clicking on a user opens a modal that displays their payment history and a list of receipts.

Similarly, `<Affiliates/>` is a table that just lists subordinate affiliates of the user in the MLM structure (and thus never `standard` or `level-3` users). This gives the `stats` for each of them. Clicking on an affiliate opens the `<Affiliate/>` page where the `stats` are displayed again at the top followed by a list of all the affiliates invoices and their payment statuses.

The `<Links/>` section is for senior users and contains several automatically generated links that can be easily copied and given to prospective customers. These are the web addresses of `put-gang-landing` but with params relating to the user. Any customer that uses one of these links to signup will become a subordinate user of the referrer.

Finally, the `<Charts/>` section displays aggregated `stats` data for the past year for the `admin` user only.
