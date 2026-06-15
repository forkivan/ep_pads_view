'use strict';

const eejs = require('ep_etherpad-lite/node/eejs');
const settings = require('ep_etherpad-lite/node/utils/Settings');

// Data comes from sibling plugins (required peers), reused in-process — no HTTP
// round-trip, no duplicated logic:
//   - ep_pads_api    -> the pad list
//   - ep_current_user -> the logged-in user shown in the header
const { collectPads } = require('ep_pads_api/lib/data');
const { getUser } = require('ep_current_user/lib/user');

// Config (settings.json -> "ep_pads_view": { ... }). All optional.
//   requireAuth : only logged-in users may open the page (default true)
//   path        : URL of the page                        (default "/pads-view")
const cfg = settings.ep_pads_view || {};
const requireAuth = cfg.requireAuth !== false;
const pagePath = String(cfg.path || '/pads-view').replace(/\/+$/, '');

exports.expressCreateServer = (hookName, context) => {
  const app = context.app;

  app.get(pagePath, async (req, res) => {
    if (requireAuth && !getUser(req)) return res.status(401).send('authentication required');
    try {
      const pads = await collectPads();
      const user = getUser(req);
      res.set('Cache-Control', 'no-store');
      res.send(eejs.require('ep_pads_view/templates/list.html', { pads, user }));
    } catch (err) {
      console.error('[ep_pads_view] failed to render page:', err);
      res.status(500).send('internal error');
    }
  });
};
