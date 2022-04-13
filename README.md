# Put Gang Console

The Put Gang project is broken into two repositories: `put-gang-landing` and `put-gang-console`. The former is just a landing page from which the signup flow is initialized. The customer completes the Stripe payment flow from here via modals. Some data is then passed to `put-gang-console` via params, where the Firebase user is created. This gives access to a dashboard / console where either just settings are displayed (for lower tier users) or full MLM access (for upper tier users).

The console has several different sections. Subordinate user data can be viewed from here. As an example, a `level-1` user would be able to see `level-2` users whom they have recruited. The `level-1` would also see `level-3` users whom the `level-2` has recruited. So basically anyone below then in the hierarchy tree. However, they would not have access to users at a lower level that have been recruited by them or their subordinates.
