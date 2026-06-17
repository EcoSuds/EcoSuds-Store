# Store Upgrade Path

The current store is a lightweight static catalog with local cart state and WhatsApp confirmation. It is intentionally simple for early operations.

Possible future upgrades:

1. Inventory fields for batch quantity and low-stock notices.
2. Online payment integration.
3. Courier-rate calculation.
4. Customer accounts and saved addresses.
5. Order management dashboard.
6. Product reviews and verified customer photos.
7. International shipping settings.

Because product and category content already live in JSON/Markdown and the app exports static files, the project can move from Vercel to Netlify or another host as the business grows.
