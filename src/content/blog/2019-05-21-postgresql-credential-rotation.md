---
title: "How to Live-Rotate PostgreSQL Credentials"
description: "A practical guide to rotating database credentials without downtime, navigating PostgreSQL's confusing role system along the way."
pubDate: 2019-05-21T18:49:04
author: "Chris Dodds"
---

OK, I didn't actually learn this today, but it wasn't *that* long ago.

Postgres creds rotation is straightforward with the exception of the PG maintainers deciding in recent years that words don't mean anything while designing their identity model. "Users" and "Groups" used to exist in PG, [but were replaced in version 8.1 with the "Role" construct](https://www.postgresql.org/docs/10/user-manag.html).

In Postgres, everything is a "Role." A user is a role. A group is a role. A role is a role. If you're familiar with literally any other identity system, just mentally translate "Role" to whatever makes sense in context.

Now that we've established this nonsense, here's a way of handling live creds rotation.

```sql
CREATE ROLE user_group; -- create a role, give it appropriate grants.

CREATE ROLE user_blue WITH ENCRYPTED PASSWORD 'REPLACE ME' IN ROLE user_group;

-- This one isn't being used yet, so disable the login.
CREATE ROLE user_green WITH ENCRYPTED PASSWORD 'REPLACE ME AS WELL' IN ROLE user_group nologin;
```

That gets you prepped. When you're ready to flip things.

```sql
ALTER USER user_green WITH PASSWORD 'new_password' login;
```

Update the creds wherever else they need updating, restart processes, confirm everything is using the new credentials, etc. Then

```sql
ALTER USER user_blue WITH PASSWORD 'new_password_2' nologin;
```

Easy, peasy.

