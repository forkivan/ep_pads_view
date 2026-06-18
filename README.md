# ep_pads_view

A ready-made **HTML page** that lists all pads with their **creator** and
**last-edited date**. It's a thin UI layer on top of
**[ep_pads_api](https://www.npmjs.com/package/ep_pads_api)** — install both, open
the page, done. No frontend coding required.

If instead you want to build your own dashboard/site, you don't need this plugin
at all — just use the JSON from `ep_pads_api` directly.

## Screenshots

The page shows who you're logged in as, the total pad count, and a searchable,
sortable table of every pad with its creator and last-edited date.

![Pad list with the logged-in user and total count, live-filtered by pad name](https://raw.githubusercontent.com/forkivan/ep_pads_view/main/docs/screenshot-1.png)

Filter by **creator** as well as by pad name:

![The same list filtered by creator name](https://raw.githubusercontent.com/forkivan/ep_pads_view/main/docs/screenshot-2.png)

Type a few letters to instantly narrow the list (here 4 of 25 match), with the
**Last edited** column sorted:

![Typing into the filter narrows the list to 4 of 25 matches, sorted by last edited](https://raw.githubusercontent.com/forkivan/ep_pads_view/main/docs/screenshot-3.png)

## Requirements

This plugin reuses the data layers of two sibling plugins in-process, so they
**must** be installed alongside it:

- **[ep_pads_api](https://www.npmjs.com/package/ep_pads_api)** — provides the pad list.
- **[ep_current_user](https://www.npmjs.com/package/ep_current_user)** — provides the logged-in user shown in the header.

## Install

Install all three together:

```sh
cd /path/to/etherpad
pnpm run plugins i ep_pads_api ep_current_user ep_pads_view
```

## Usage

Open the page (default URL):

```
https://your-etherpad/pads-view
```

Each pad links to `/p/<padId>`.

## Features

- **Live filter** — type in the search box to filter by pad name or creator; a
  counter shows how many of the total are matched.
- **Sortable columns** — click any column header (Pad / Creator / Last edited)
  to sort; click again to reverse. Empty values sort to the bottom.
- **Progressive enhancement** — sorting/filtering is plain client-side
  JavaScript with no dependencies; with JS disabled the plain table still works.

## Configuration

All optional. In `settings.json`:

```json
"ep_pads_view": {
  "requireAuth": true,
  "path": "/pads-view"
}
```

| Option        | Default       | Meaning                                                   |
|---------------|---------------|-----------------------------------------------------------|
| `requireAuth` | `true`        | Only logged-in users may open the page. Set `false` to open it. |
| `path`        | `/pads-view`  | URL of the page.                                          |

> The data itself (creator, dates, whoami) is produced by `ep_pads_api`; see its
> README for how it reads pads and the logged-in user.

License: Apache-2.0.
