# Retail Store App Documentation

## Overview

The **Retail Store App** is a modern and user-friendly desktop application for managing sales, inventory, and customer records in a retail environment. The app is designed with a clean interface (see screenshot) and supports several core features to streamline retail operations.

---

## Features

### 🗂️ Category Management

Manage product categories easily through the **Categories Page**.

**Table Schema:**
```sql
CREATE TABLE IF NOT EXISTS categories (
  category_id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_name TEXT NOT NULL UNIQUE
);
```

- Add new categories
- Edit existing categories
- Remove unwanted categories

---

### 📦 Items Management

Maintain inventory via the **Items Page**, linked to categories.

**Table Schema:**
```sql
CREATE TABLE IF NOT EXISTS items (
  item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_name TEXT NOT NULL UNIQUE,
  item_qty INTEGER NOT NULL,
  item_price REAL NOT NULL,
  item_barcode INTEGER,
  item_category INTEGER NOT NULL,
  FOREIGN KEY (item_category) REFERENCES categories(category_id),
  CHECK(item_price >= 0)
);
```

- Add new inventory items
- Assign items to categories
- Input price, quantity, and optional barcode

---

### ⚙️ Settings

Customize the application with the **Settings Page**.

Supported settings include:
- Store Name
- Currency Symbol
- Store Address
- Store Phone Number
- Country Code
- Dark Mode Toggle
- UI Zoom Percentage

```js
if (!getByName('STORE_NAME')) { add('STORE_NAME', 'My Store') }
if (!getByName('CURRENCY')) { add('CURRENCY', 'Rs.') }
if (!getByName('STORE_ADDRESS')) { add('STORE_ADDRESS', '123 Main St, City, Country') }
if (!getByName('STORE_PHONE')) { add('STORE_PHONE', '11111111111') }
if (!getByName('COUNTRY_CODE')) { add('COUNTRY_CODE', '92') }
if (!getByName('DARK_MODE')) { add('DARK_MODE', 'false') }
if (!getByName('ZOOM')) { add('ZOOM', '100') }
```

---

### 💳 Customer Register

Track debts between the store and customers.

**Table Schema:**
```sql
CREATE TABLE IF NOT EXISTS register (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL UNIQUE,
  loan_amount INTEGER,
  debt_amount INTEGER,
  last_update DATE NOT NULL
);
```

- Track who owes whom and how much
- Automatically logs the date of the last update

---

### 🧾 Order & Checkout System

When a bill is successfully processed, the **quantity of each item is automatically reduced** in the inventory based on the amount sold.


The main **Order Page** is where you sell and generate receipts.

- Items listed with category filters
- Add to order by clicking or scanning barcodes
- Manually set a custom price for the receipt
- Use `Ctrl` + click to add items in bulk (+10 qty)
- Apply discount and compute change automatically
- "Proceed to Checkout" generates and prints the receipt

---

## 🖥️ User Interface

The app features a **modern and intuitive UI**, as shown below:

![Retail Store App Video Demo](./retailstoreapp_demo.mp4)

---

## 📌 Notes

- All entries are persisted using SQLite database.
- Receipt generation is designed for physical printing.
- Barcode input supports manual entry and scanning devices.

---

# 🧰 Tech Stack - Retail Store App

This document outlines the technologies used in the development of the **Retail Store App**.

---

## ⚙️ Core Technologies

| Layer          | Technology     | Purpose                                  |
|----------------|----------------|------------------------------------------|
| Frontend       | ReactJs  | User Interface and interaction           |
| UI Framework   | Electron.js    | Cross-platform desktop app development   |
| Styling        | Tailwind CSS     | Responsive and modern UI design          |
| Backend        | NodeJs     | Business logic, billing, and data flow   |
| Database       | SQLite         | Local storage for categories, items, orders, and settings |
| Print Utility  | pdf-kit npm package | Receipt printing                         |

---

Built with ❤️ for efficient, small-scale retail management.

© 2025 Retail Store App. All rights reserved.
