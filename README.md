# Put Gang Console

The Put Gang project is broken into two repositories: `put-gang-landing` and `put-gang-console`. The former is just a landing page from which the signup flow is initialized. The customer completes the Stripe payment flow from here via modals. Some data is then passed to `put-gang-console` via params, where the Firebase user is created. This gives access to a dashboard / console where either just settings are displayed (for lower tier users) or full MLM access (for upper tier users).

The console has several different sections. Subordinate user data can be viewed from here. As an example, a `level-1` user would be able to see `level-2` users whom they have recruited. The `level-1` would also see `level-3` users whom the `level-2` has recruited. So basically anyone below then in the hierarchy tree. However, they would not have access to users at a lower level that have been recruited by them or their subordinates.


## Console User Interface Structure

When a user gains entry after logging in, they have access to several different pages via the nav menu. There is `<Console/>`, `<Users/>`, `<Affiliates/>`, `<Links/>` and `<Charts/>`.

The `<Console/>` displays `stats` related to revenue, MRR and payment due to the affiliate(s). There is also an `activities` list that displays recent events to senior users.

Within `<Users/>` is a table that displays all users when `admin` or just subordinates for other senior users. This lists role, membership level, join and expiry dates. Clicking on a user opens a modal that displays their payment history and a list of receipts.

Similarly, `<Affiliates/>` is a table that just lists subordinate affiliates of the user in the MLM structure (and thus never `standard` or `level-3` users). This gives the `stats` for each of them. Clicking on an affiliate opens the `<Affiliate/>` page where the `stats` are displayed again at the top followed by a list of all the affiliates invoices and their payment statuses.

The `<Links/>` section is for senior users and contains several automatically generated links that can be easily copied and given to prospective customers. These are the web addresses of `put-gang-landing` but with params relating to the user. Any customer that uses one of these links to signup will become a subordinate user of the referrer.

Finally, the `<Charts/>` section displays aggregated `stats` data for the past year for the `admin` user only.
