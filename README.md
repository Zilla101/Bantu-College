# Bantu College

Static marketing site and portals for Bantu College, Warri. Canonical domain: `https://www.bantucollege.com`.

## Local preview

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173`. On a phone joined to the same network, use the machine's LAN address, for example `http://192.168.0.188:4173`.

## Deploy contents

Publish only the public pages and their assets:

```
index.html  about.html  academics.html  admissions.html
success.html  404.html  portal.html  admin-portal.html
admin/  assets/  robots.txt  sitemap.xml
```

Do not publish the following, and upload only the list above rather than the whole folder:

| Path | Why it stays out |
| --- | --- |
| `.git/`, `.backups/` | History and working snapshots |
| `_archive/` | Holds a personal letter that is unrelated to the college |
| `bantucollegebrandguidelines/` | Internal design source material |
| `README.md` | Repository notes |

`robots.txt` already disallows `admin/`, `_archive/` and the brand guidelines folder, but that only stops crawlers. Keep them off the host entirely.

## Indexed pages

`index.html`, `about.html`, `academics.html`, `admissions.html`. Everything else carries `noindex`.

## Data layer

Portals currently run entirely in the browser, with records held on the device through `assets/js/bantu-db.js`. A server backed database is required before multiple users share live records.
