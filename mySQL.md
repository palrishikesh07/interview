# Core SQL and Essentials — Interview Questions & Answers

Beginner-friendly theory, examples, and interview-ready explanations.

> **Note:** SQL syntax varies slightly between MySQL, PostgreSQL, SQL Server, and Oracle. Examples below use broadly familiar SQL.

---

## 1. What is SQL, and what are its major components?

### Answer

**SQL (Structured Query Language)** is used to create, retrieve, update, and delete data in relational databases such as MySQL, PostgreSQL, SQL Server, and Oracle.

### Major components

- **DDL (Data Definition Language):** Defines database structures. Examples: `CREATE`, `ALTER`, `DROP`.
- **DML (Data Manipulation Language):** Modifies data. Examples: `INSERT`, `UPDATE`, `DELETE`.
- **DQL (Data Query Language):** Retrieves data. Example: `SELECT`.
- **DCL (Data Control Language):** Controls permissions. Examples: `GRANT`, `REVOKE`.
- **TCL (Transaction Control Language):** Manages transactions. Examples: `COMMIT`, `ROLLBACK`, `SAVEPOINT`.

### Example

```sql
-- DDL: Create a table
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10, 2)
);

-- DML: Insert data
INSERT INTO employees (id, name, salary)
VALUES (1, 'Asha', 60000.00);

-- DQL: Retrieve data
SELECT name, salary
FROM employees;
```

### Interview tip

SQL is a **declarative language**. We specify what data we want, and the database determines how to retrieve it efficiently.

---

## 2. What is the difference between DELETE, TRUNCATE, and DROP?

### Answer

| Feature | DELETE | TRUNCATE | DROP |
|---|---|---|---|
| Purpose | Removes rows | Removes all rows | Removes the table |
| Supports WHERE | Yes | No | No |
| Table structure remains | Yes | Yes | No |
| Can remove selected rows | Yes | No | No |
| Typical use | Delete specific records | Empty a table | Remove a table permanently |

### Examples

```sql
-- Delete specific employees
DELETE FROM employees
WHERE salary < 30000;

-- Remove all rows but keep the table
TRUNCATE TABLE employees;

-- Remove the table and its structure
DROP TABLE employees;
```

### Important points

- `DELETE` can remove selected rows using `WHERE`.
- `TRUNCATE` clears all rows and is often faster when the whole table must be emptied.
- `DROP` removes the table definition and its data.
- Transaction rollback, trigger behavior, identity reset, and foreign-key restrictions depend on the database system.

### Interview tip

Use `DELETE` when removing selected records, `TRUNCATE` when clearing a table, and `DROP` when removing the table itself.

---

## 3. What are primary key, foreign key, unique constraint, and index?

### Answer

**Primary key**

- Uniquely identifies each row.
- Cannot contain `NULL`.
- A table has one primary-key constraint, which can contain multiple columns.

**Foreign key**

- Establishes a relationship between tables.
- Ensures that a referenced value exists in the referenced key, subject to the database's rules.
- Helps maintain referential integrity.

**Unique constraint**

- Prevents duplicate values or duplicate combinations of values.
- The treatment of `NULL` values varies by database.

**Index**

- Helps speed up searches, filtering, joins, and sorting.
- Uses additional storage.
- Can slow down inserts, updates, and deletes because indexes must be maintained.

### Example

```sql
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100) UNIQUE
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE,
    department_id INT,
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

-- Create an index for department searches
CREATE INDEX idx_employees_department
ON employees(department_id);
```

### Example query

```sql
SELECT employee_id, employee_name
FROM employees
WHERE department_id = 10;
```

An index on `department_id` may help the database find matching employees faster.

### Interview tip

A **constraint protects data integrity**, whereas an **index improves query performance**. Primary keys and unique constraints are commonly supported by indexes.

---

## 4. What is the difference between WHERE and HAVING?

### Answer

- **WHERE** filters individual rows before grouping and aggregation.
- **HAVING** filters groups after `GROUP BY` and aggregation.

### Example

```sql
SELECT
    department_id,
    AVG(salary) AS average_salary
FROM employees
WHERE salary > 20000
GROUP BY department_id
HAVING AVG(salary) > 50000;
```

### How it works

1. `WHERE salary > 20000` filters individual employees.
2. `GROUP BY department_id` groups employees by department.
3. `AVG(salary)` calculates the average salary for each group.
4. `HAVING AVG(salary) > 50000` keeps only departments whose average exceeds 50,000.

### Interview tip

Remember:

- `WHERE` = filter rows.
- `HAVING` = filter groups.

An aggregate such as `AVG()` generally cannot be used directly in the `WHERE` clause at the same query level.

---

## 5. What are the types of SQL commands: DDL, DML, DCL, and TCL?

### Answer

| Type | Full form | Purpose | Commands |
|---|---|---|---|
| DDL | Data Definition Language | Defines database structures | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| DML | Data Manipulation Language | Modifies data | `INSERT`, `UPDATE`, `DELETE` |
| DCL | Data Control Language | Controls permissions | `GRANT`, `REVOKE` |
| TCL | Transaction Control Language | Controls transactions | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

`SELECT` is commonly classified separately as DQL, although some learning materials include it under DML.

### Examples

```sql
-- DDL
ALTER TABLE employees
ADD COLUMN city VARCHAR(80);

-- DML
UPDATE employees
SET city = 'Pune'
WHERE employee_id = 1;

-- DCL: syntax varies by database
GRANT SELECT ON employees TO analyst_user;

-- TCL: transaction example
START TRANSACTION;

UPDATE employees
SET salary = salary + 1000
WHERE employee_id = 1;

COMMIT;
```

### Interview tip

Remember the purpose:

- DDL = structure
- DML = data
- DCL = permissions
- TCL = transactions

---

## 6. What is the difference between a schema and a database?

### Answer

A **database** is a container that stores and organizes data objects.

A **schema** is a logical namespace or grouping for objects such as tables, views, and stored procedures.

The exact relationship depends on the database system.

- **PostgreSQL:** A database can contain multiple schemas.
- **SQL Server:** A database can contain multiple schemas.
- **MySQL:** Schema and database are largely synonymous.

### Example (PostgreSQL)

```sql
CREATE DATABASE company_db;

-- Connect to company_db before running this:
CREATE SCHEMA hr;

CREATE TABLE hr.employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100)
);

SELECT *
FROM hr.employees;
```

Here:

- `company_db` is the database.
- `hr` is a schema.
- `employees` is a table inside the schema.

### Why use schemas?

- Organize tables by department or purpose.
- Avoid naming conflicts.
- Manage permissions.
- Separate application modules logically.

### Interview tip

Always explain the database engine because the meaning of schema differs between systems.

---

## 7. What are transactions and ACID properties?

### Answer

A **transaction** is a group of database operations treated as one logical unit.

A transaction should either complete successfully or be rolled back according to the transaction's rules.

### ACID properties

**A — Atomicity**

All operations succeed together, or the transaction is rolled back.

**C — Consistency**

The transaction preserves defined rules and database constraints.

**I — Isolation**

Concurrent transactions are prevented from interfering in ways disallowed by the chosen isolation level.

**D — Durability**

After a successful commit, changes are designed to survive failures, subject to the database's durability configuration.

### Example: Transfer money

Suppose we transfer 500 from account 1 to account 2.

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 500
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 500
WHERE account_id = 2;

COMMIT;
```

If an error occurs before committing, the application can issue:

```sql
ROLLBACK;
```

Both updates should run within the same transaction.

### Why are ACID properties important?

- Banking transactions
- Payment systems
- Order processing
- Inventory management
- Financial applications

### Interview tip

ACID helps maintain data correctness. Isolation does not necessarily mean that every transaction runs alone; guarantees depend on the selected isolation level.

---

## 8. What is the difference between UNION and UNION ALL?

### Answer

Both combine the results of multiple `SELECT` statements.

- **UNION:** Removes duplicate result rows.
- **UNION ALL:** Keeps duplicate result rows.

The queries must return the same number of columns, with compatible data types in corresponding positions.

### Example: UNION

```sql
SELECT city FROM customers
UNION
SELECT city FROM suppliers;
```

If both tables contain `Pune`, it appears once in the combined result.

### Example: UNION ALL

```sql
SELECT city FROM customers
UNION ALL
SELECT city FROM suppliers;
```

If both tables contain `Pune`, it can appear twice.

### Difference

| Feature | UNION | UNION ALL |
|---|---|---|
| Removes duplicates | Yes | No |
| Performance | May be slower due to duplicate elimination | Often faster |
| Preserves duplicate rows | No | Yes |

### Interview tip

Use `UNION` when you need distinct results. Use `UNION ALL` when duplicates are meaningful or when you want to avoid unnecessary duplicate elimination.

---

## 9. What are normalization and denormalization?

### Answer

**Normalization** organizes data into related tables to reduce duplication and prevent insert, update, and delete anomalies.

**Denormalization** intentionally introduces some duplication or precomputed data to improve particular read or reporting workloads.

### Example: Poorly normalized table

| order_id | customer_name | customer_phone | product |
|---|---|---|---|
| 101 | Asha | 9990001111 | Keyboard |
| 102 | Asha | 9990001111 | Mouse |

The customer's details are repeated for each order.

This can cause problems:

- Updating a phone number requires multiple changes.
- Different rows may accidentally contain inconsistent phone numbers.
- Customer information may be difficult to manage independently of orders.

### Normalized design

```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_phone VARCHAR(20)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    product VARCHAR(100),
    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);
```

Now customer details are stored once, and orders refer to the customer through `customer_id`.

### Normal forms

**1NF — First Normal Form**

Each column holds a single value under the chosen data model, without repeating groups.

**2NF — Second Normal Form**

The table is in 1NF, and every non-key attribute depends on the whole candidate key, not just part of a composite key.

**3NF — Third Normal Form**

The table is in 2NF, and non-key attributes do not depend transitively on a candidate key.

### When is denormalization useful?

A reporting system might store precomputed daily sales totals so dashboards do not need to aggregate millions of order records repeatedly.

### Interview tip

- Normalize for data integrity and maintainability.
- Denormalize when a measured performance or reporting need justifies the trade-off.
- Denormalization increases storage and may make updates more complex.

---

## 10. What is the difference between OLTP and OLAP?

### Answer

**OLTP (Online Transaction Processing)** supports day-to-day business operations such as placing orders, updating accounts, and recording payments.

**OLAP (Online Analytical Processing)** supports reporting, dashboards, trend analysis, and business decisions based on large amounts of data.

### Differences

| Feature | OLTP | OLAP |
|---|---|---|
| Purpose | Run business transactions | Analyze business data |
| Queries | Short inserts, updates, and lookups | Complex joins and aggregations |
| Data | Current operational records | Often historical and integrated data |
| Workload | Many concurrent, small transactions | Fewer, heavier analytical queries |
| Typical design | Often normalized | Often dimensional or denormalized |
| Example | Place an online order | Compare quarterly sales by region |

### OLTP example

Retrieve one order:

```sql
SELECT order_id, status, total_amount
FROM orders
WHERE order_id = 1001;
```

### OLAP example

Calculate sales by region:

```sql
SELECT
    region,
    SUM(total_amount) AS total_sales
FROM sales
WHERE sale_date >= '2026-01-01'
  AND sale_date < '2027-01-01'
GROUP BY region;
```

### Real-world example

In an e-commerce application:

- The OLTP database handles customer orders and payments.
- The analytical system processes sales trends, revenue reports, and dashboards.

### Interview tip

OLTP focuses on running the business. OLAP focuses on analyzing the business.

---

# Quick Revision Sheet

| Question | One-line answer |
|---|---|
| What is SQL? | A language for defining, querying, and manipulating relational data. |
| DELETE vs TRUNCATE vs DROP | Remove selected rows; clear all rows; remove the table. |
| Primary key | Uniquely identifies a row and cannot be NULL. |
| Foreign key | Enforces a reference to a key in another or the same table. |
| Unique constraint | Prevents duplicate values or combinations. |
| Index | Can speed up reads at the cost of storage and write overhead. |
| WHERE vs HAVING | Filter rows before grouping vs groups after aggregation. |
| DDL/DML/DCL/TCL | Structure / data / permissions / transactions. |
| Schema vs database | Logical namespace vs database container; depends on the engine. |
| ACID | Atomicity, Consistency, Isolation, Durability. |
| UNION vs UNION ALL | Remove duplicates vs keep duplicates. |
| Normalization | Reduce duplication and data anomalies. |
| Denormalization | Add redundancy deliberately for a workload. |
| OLTP vs OLAP | Operational transactions vs analytical queries. |

---

# How to Answer SQL Questions in an Interview

Follow this simple three-step structure:

1. **Define the concept** in one or two sentences.
2. **Explain the difference or trade-off** using simple language.
3. **Give a small SQL example** and explain when you would use it.

## Practice strategy

- Read each question and explain it without looking at the answer.
- Write the SQL snippets yourself.
- Practice explaining the real-world use case.
- Pay special attention to database-specific behavior, especially transactions, `TRUNCATE`, `NULL` in unique constraints, indexes, and schema terminology.

**Goal:** Be able to explain each topic clearly in 30–60 seconds and write the example query confidently.

# SQL Joins and Set Operations — Interview Questions & Answers

Beginner-friendly theory, SQL code examples, expected results, and interview tips.

---

## 11. Explain INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.

### Answer

A **JOIN** combines rows from two or more tables based on a related column or a specified join condition.

Consider these two tables.

**Employees**

| employee_id | employee_name | department_id |
|---:|---|---:|
| 1 | Rahul | 10 |
| 2 | Priya | 20 |
| 3 | Amit | 30 |
| 4 | Neha | NULL |

**Departments**

| department_id | department_name |
|---:|---|
| 10 | IT |
| 20 | HR |
| 40 | Finance |

### A. INNER JOIN

**Definition:** Returns only rows that match the join condition in both tables.

```sql
SELECT
    e.employee_name,
    d.department_name
FROM employees e
INNER JOIN departments d
    ON e.department_id = d.department_id;
```

**Output**

| employee_name | department_name |
|---|---|
| Rahul | IT |
| Priya | HR |

**Explanation:** Amit's department ID (30) does not exist in `departments`, and Neha has no department ID. Therefore, neither employee appears in the result.

**Use case:** Retrieve employees who belong to an existing department.

### B. LEFT JOIN (LEFT OUTER JOIN)

**Definition:** Returns all rows from the left table and matching rows from the right table. If there is no match, right-table columns contain `NULL`.

```sql
SELECT
    e.employee_name,
    d.department_name
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.department_id;
```

**Output**

| employee_name | department_name |
|---|---|
| Rahul | IT |
| Priya | HR |
| Amit | NULL |
| Neha | NULL |

**Explanation:** Every employee appears, even if the employee has no matching department.

**Use case:** Find all employees, including those who are not assigned to a valid department.

### C. RIGHT JOIN (RIGHT OUTER JOIN)

**Definition:** Returns all rows from the right table and matching rows from the left table. If there is no match, left-table columns contain `NULL`.

```sql
SELECT
    e.employee_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d
    ON e.department_id = d.department_id;
```

**Output**

| employee_name | department_name |
|---|---|
| Rahul | IT |
| Priya | HR |
| NULL | Finance |

**Explanation:** Finance appears even though no employee belongs to department 40.

**Use case:** Retrieve all departments, including departments that have no employees.

### D. FULL OUTER JOIN

**Definition:** Returns all matching and non-matching rows from both tables. Missing values from either side are filled with `NULL`.

```sql
SELECT
    e.employee_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d
    ON e.department_id = d.department_id;
```

**Output**

| employee_name | department_name |
|---|---|
| Rahul | IT |
| Priya | HR |
| Amit | NULL |
| Neha | NULL |
| NULL | Finance |

**Explanation:** The result includes all employees and all departments, whether or not they match.

**Important:** PostgreSQL and SQL Server support `FULL OUTER JOIN`. MySQL does not support it directly. In MySQL, you can combine a `LEFT JOIN` with a `RIGHT JOIN` using `UNION` to simulate it, taking care to avoid duplicate matching rows.

### Quick comparison

| Join type | Returns |
|---|---|
| `INNER JOIN` | Only matching rows |
| `LEFT JOIN` | All left rows plus matching right rows |
| `RIGHT JOIN` | All right rows plus matching left rows |
| `FULL OUTER JOIN` | All rows from both tables, matched where possible |

### Interview tip

Remember:

- INNER = matches only.
- LEFT = everything on the left.
- RIGHT = everything on the right.
- FULL = everything from both sides.

---

## 12. What is a SELF JOIN? Explain with an example.

### Answer

A **SELF JOIN** joins a table with itself.

It is useful when rows in the same table are related to each other, such as employees and their managers.

Consider an `employees` table:

| employee_id | employee_name | manager_id |
|---:|---|---:|
| 1 | Anil | NULL |
| 2 | Rahul | 1 |
| 3 | Priya | 1 |
| 4 | Amit | 2 |

Here, `manager_id` references another employee's `employee_id`.

### Example

Find each employee's manager.

```sql
SELECT
    e.employee_name AS employee,
    m.employee_name AS manager
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.employee_id;
```

**Output**

| employee | manager |
|---|---|
| Anil | NULL |
| Rahul | Anil |
| Priya | Anil |
| Amit | Rahul |

### Explanation

- `employees e` represents the employee.
- `employees m` represents the manager.
- `e.manager_id = m.employee_id` connects an employee to their manager.
- `LEFT JOIN` keeps employees who do not have a manager.

We use aliases (`e` and `m`) because the same table appears twice in the query.

### Another example: Find employees working in the same department

```sql
SELECT
    e1.employee_name AS employee_1,
    e2.employee_name AS employee_2,
    e1.department_id
FROM employees e1
JOIN employees e2
    ON e1.department_id = e2.department_id
   AND e1.employee_id < e2.employee_id;
```

The condition `e1.employee_id < e2.employee_id` prevents matching an employee with themselves and avoids returning both `(A, B)` and `(B, A)`.

### Common use cases

- Employee-manager relationships.
- Finding employees in the same department.
- Comparing records within a table.
- Hierarchical relationships such as categories and parent categories.

### Interview tip

A SELF JOIN is not a separate SQL join keyword. It is a normal join in which the same table is used more than once with different aliases.

---

## 13. When does a JOIN return a Cartesian product?

### Answer

A **Cartesian product** occurs when every row from one table is combined with every row from another table.

If table A contains `m` rows and table B contains `n` rows, the result contains:

`m × n` rows.

For example:

- Table A contains 3 rows.
- Table B contains 4 rows.
- Cartesian product = `3 × 4 = 12` rows.

### Example

**Colors**

| color |
|---|
| Red |
| Blue |

**Sizes**

| size |
|---|
| Small |
| Medium |
| Large |

```sql
SELECT
    c.color,
    s.size
FROM colors c
CROSS JOIN sizes s;
```

**Output**

| color | size |
|---|---|
| Red | Small |
| Red | Medium |
| Red | Large |
| Blue | Small |
| Blue | Medium |
| Blue | Large |

The result contains `2 × 3 = 6` rows.

### When else can it happen?

A Cartesian product can occur when:

1. You explicitly use `CROSS JOIN`.
2. You use comma-separated tables without a join condition.
3. You accidentally omit a required join condition.
4. Your join condition matches every row, such as `ON 1 = 1`.

### Example of an accidental Cartesian product

```sql
-- Potential mistake: no join condition
SELECT *
FROM employees e, departments d;
```

If `employees` has 100 rows and `departments` has 10 rows, the result contains 1,000 rows.

### How to avoid it

```sql
SELECT
    e.employee_name,
    d.department_name
FROM employees e
INNER JOIN departments d
    ON e.department_id = d.department_id;
```

Always verify that the join condition reflects the intended relationship.

### Interview tip

A Cartesian product is not always a mistake. It is useful when you intentionally need every possible combination, such as generating product-and-size combinations or test data.

---

## 14. What is the difference between CROSS JOIN and INNER JOIN?

### Answer

**CROSS JOIN** returns every possible combination of rows from two tables.

**INNER JOIN** returns only the combinations that satisfy a join condition.

### Example tables

**Products**

| product_id | product_name |
|---:|---|
| 1 | Laptop |
| 2 | Phone |

**Categories**

| category_id | category_name |
|---:|---|
| 10 | Electronics |
| 20 | Furniture |

### A. CROSS JOIN

```sql
SELECT
    p.product_name,
    c.category_name
FROM products p
CROSS JOIN categories c;
```

**Output**

| product_name | category_name |
|---|---|
| Laptop | Electronics |
| Laptop | Furniture |
| Phone | Electronics |
| Phone | Furniture |

The result has `2 × 2 = 4` rows.

### B. INNER JOIN

Suppose `products` contains a `category_id` column:

| product_id | product_name | category_id |
|---:|---|---:|
| 1 | Laptop | 10 |
| 2 | Phone | 10 |
| 3 | Chair | 20 |

Query:

```sql
SELECT
    p.product_name,
    c.category_name
FROM products p
INNER JOIN categories c
    ON p.category_id = c.category_id;
```

**Output**

| product_name | category_name |
|---|---|
| Laptop | Electronics |
| Phone | Electronics |
| Chair | Furniture |

Only rows matching the category ID are returned.

### Quick comparison

| Feature | CROSS JOIN | INNER JOIN |
|---|---|---|
| Join condition | Not required | Normally specified with `ON` |
| Result | Every possible combination | Matching combinations only |
| Number of rows | `m × n` | Depends on matching rows |
| Common use | Generate all combinations | Combine related records |

### Interview tip

Use `CROSS JOIN` when every combination is needed. Use `INNER JOIN` when you need related records from both tables.

---

## 15. JOIN vs SUBQUERY: Which performs better?

### Answer

A **JOIN** combines rows from multiple tables into a result.

A **subquery** is a query nested inside another SQL query. It can be used in clauses such as `WHERE`, `FROM`, or `SELECT`.

Neither approach is always faster. Performance depends on the database optimizer, indexes, table sizes, query structure, data distribution, and execution plan.

### Example tables

Assume:

- `employees(employee_id, employee_name, department_id)`
- `departments(department_id, department_name)`

### A. Using JOIN

Find employees who belong to the IT department.

```sql
SELECT
    e.employee_name,
    d.department_name
FROM employees e
INNER JOIN departments d
    ON e.department_id = d.department_id
WHERE d.department_name = 'IT';
```

### B. Using a subquery

```sql
SELECT
    employee_name
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE department_name = 'IT'
);
```

Both queries can identify employees belonging to IT.

### When is JOIN useful?

- You need columns from multiple tables.
- You want to combine related records.
- You need to return details from both tables.
- You are building reports with multiple related entities.

### When is a subquery useful?

- You need to filter based on another query's result.
- You want to test whether a related record exists.
- You need an aggregate value to compare against.
- A nested query expresses the business rule more clearly.

### Example: Using EXISTS

Find employees who have a matching department.

```sql
SELECT
    e.employee_name
FROM employees e
WHERE EXISTS (
    SELECT 1
    FROM departments d
    WHERE d.department_id = e.department_id
);
```

`EXISTS` checks whether the subquery returns at least one row. The database may optimize this as a semi-join.

### Performance considerations

| Factor | JOIN | Subquery |
|---|---|---|
| Performance | Can be efficient | Can be equally efficient |
| Multiple table columns | Convenient | May require additional query logic |
| Existence checks | Possible with joins | `EXISTS` is often expressive |
| Optimization | Depends on the execution plan | Often transformed by the optimizer |
| Best choice | Based on query requirements | Based on query requirements |

### How to optimize either approach

1. Create appropriate indexes on join and filter columns.
2. Avoid selecting unnecessary columns with `SELECT *`.
3. Filter rows as early as appropriate.
4. Check the execution plan using `EXPLAIN` or the database's equivalent.
5. Test performance with representative data.
6. Be careful with `NOT IN` when the subquery can return `NULL`; consider `NOT EXISTS` where appropriate.

### Important interview point

Do not say that JOINs are always faster than subqueries. Modern database optimizers can transform many equivalent queries into similar execution plans.

Choose the clearest query that produces the correct results, then measure performance.

---

# Quick Revision Sheet

| Topic | Key point |
|---|---|
| INNER JOIN | Returns matching rows only. |
| LEFT JOIN | Returns every left-table row and matching right-table data. |
| RIGHT JOIN | Returns every right-table row and matching left-table data. |
| FULL OUTER JOIN | Returns all rows from both tables, matched where possible. |
| SELF JOIN | Joins a table to itself using aliases. |
| Cartesian product | Every row from A is combined with every row from B. |
| CROSS JOIN | Explicitly generates all possible combinations. |
| INNER JOIN vs CROSS JOIN | Matching rows vs all combinations. |
| JOIN vs subquery | Neither is universally faster; check the execution plan. |
| EXISTS | Checks whether a matching row exists. |

---

# Interview Practice Questions

Try answering these without looking at the solutions:

1. Find all employees who do not belong to any department.
2. Find departments that have no employees.
3. Find each employee's manager using a SELF JOIN.
4. Explain why a join might unexpectedly return millions of rows.
5. Write a query to return all employees and departments, including unmatched rows, in MySQL.
6. Explain the difference between `JOIN` and `EXISTS`.
7. How would you investigate a slow join query?

## Sample solutions

### 1. Employees without a matching department

```sql
SELECT e.*
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.department_id
WHERE d.department_id IS NULL;
```

This finds employees whose department ID has no match, including employees whose department ID is `NULL`.

### 2. Departments without employees

```sql
SELECT d.*
FROM departments d
LEFT JOIN employees e
    ON d.department_id = e.department_id
WHERE e.employee_id IS NULL;
```

### 3. Employee and manager names

```sql
SELECT
    e.employee_name AS employee,
    m.employee_name AS manager
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.employee_id;
```

### 4. Why might a join return too many rows?

Common reasons include a missing join condition, an incomplete join condition, duplicate matching keys, or a many-to-many relationship.

### 5. FULL OUTER JOIN equivalent in MySQL

```sql
SELECT
    e.employee_name,
    d.department_name
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.department_id

UNION ALL

SELECT
    e.employee_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d
    ON e.department_id = d.department_id
WHERE e.employee_id IS NULL;
```

The second query adds only departments that had no matching employee, so matching rows are not duplicated. This assumes `employee_id` is a non-null primary key.

### 6. JOIN vs EXISTS

- `JOIN` combines matching rows and can return multiple result rows when several matches exist.
- `EXISTS` checks whether at least one matching row exists and does not multiply the outer row just because multiple matches exist.

### 7. How to investigate a slow join

- Run `EXPLAIN` or `EXPLAIN ANALYZE`, where supported.
- Check indexes on join and filter columns.
- Look for full table scans, unexpectedly large intermediate results, and inaccurate row estimates.
- Verify that the join condition is correct.
- Test with realistic data and compare execution times.

---

**Final interview tip:** For every JOIN question, explain which table's rows are preserved, what happens when there is no match, and how `NULL` values affect the output. Those three points help demonstrate practical SQL understanding.

# SQL Aggregate Functions and GROUP BY — Interview Questions & Answers

Easy theory, practical SQL examples, expected outputs, and interview tips.

---

## 16. How does GROUP BY work with aggregate functions?

### Answer

`GROUP BY` groups rows that have the same values in one or more columns. Aggregate functions perform calculations on each group and return one result per group.

### Common aggregate functions

| Function | Purpose | Example |
|---|---|---|
| `COUNT()` | Counts rows or non-NULL values | `COUNT(*)` |
| `SUM()` | Calculates the total | `SUM(salary)` |
| `AVG()` | Calculates the average | `AVG(salary)` |
| `MIN()` | Finds the minimum value | `MIN(salary)` |
| `MAX()` | Finds the maximum value | `MAX(salary)` |

### Example table: employees

| employee_id | employee_name | department | salary |
|---:|---|---|---:|
| 1 | Rahul | IT | 60000 |
| 2 | Priya | IT | 70000 |
| 3 | Amit | HR | 40000 |
| 4 | Neha | HR | 50000 |
| 5 | Karan | Sales | 45000 |

### Example 1: Count employees per department

```sql
SELECT
    department,
    COUNT(*) AS total_employees
FROM employees
GROUP BY department;
```

**Output**

| department | total_employees |
|---|---:|
| IT | 2 |
| HR | 2 |
| Sales | 1 |

### Example 2: Calculate average salary per department

```sql
SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department;
```

**Output**

| department | average_salary |
|---|---:|
| IT | 65000 |
| HR | 45000 |
| Sales | 45000 |

### How does it work?

1. SQL reads the rows from the table.
2. `GROUP BY department` places rows with the same department into groups.
3. `AVG(salary)` calculates the average salary within each group.
4. The query returns one row per department.

### Important rule

When using `GROUP BY`, a selected column generally must either:

- Appear in the `GROUP BY` clause, or
- Be used inside an aggregate function.

Some database systems permit additional columns under specific functional-dependency rules.

### Interview tip

`GROUP BY` is commonly used for department-wise salary, category-wise sales, customer-wise orders, and monthly revenue reports.

---

## 17. How do you use HAVING with grouped results?

### Answer

`HAVING` filters groups after grouping and aggregation. It is commonly used when a condition depends on an aggregate function such as `COUNT()`, `SUM()`, or `AVG()`.

### Example

Find departments with more than two employees.

```sql
SELECT
    department,
    COUNT(*) AS total_employees
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;
```

Only departments with more than two employees will be returned.

### Example 2: Departments with an average salary greater than 50,000

```sql
SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
```

**Output using the sample employees table**

| department | average_salary |
|---|---:|
| IT | 65000 |

### WHERE vs HAVING

| Feature | WHERE | HAVING |
|---|---|---|
| Filters | Individual rows | Groups |
| Applied conceptually | Before grouping | After grouping |
| Aggregate conditions | Generally cannot filter on aggregates at the same query level | Can filter using aggregates |
| Example | `WHERE salary > 40000` | `HAVING AVG(salary) > 50000` |

### Example using both WHERE and HAVING

Find departments with more than one employee whose salary is above 40,000.

```sql
SELECT
    department,
    COUNT(*) AS total_employees
FROM employees
WHERE salary > 40000
GROUP BY department
HAVING COUNT(*) > 1;
```

**Explanation**

1. `WHERE salary > 40000` filters individual employees.
2. `GROUP BY department` groups the remaining employees.
3. `COUNT(*)` counts the employees in each group.
4. `HAVING COUNT(*) > 1` keeps only groups containing more than one qualifying employee.

### Interview tip

Use `WHERE` to filter rows before calculating aggregates and `HAVING` to filter the resulting groups.

---

## 18. How do you find the total salary per department?

### Answer

Use `SUM()` with `GROUP BY` to calculate the total salary for each department.

### SQL query

```sql
SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department;
```

**Output**

| department | total_salary |
|---|---:|
| IT | 130000 |
| HR | 90000 |
| Sales | 45000 |

### Explanation

- `SUM(salary)` adds the salaries within each group.
- `GROUP BY department` creates one group per department.
- `AS total_salary` gives the calculated column a readable name.

### Interview follow-up 1: Find the department with the highest total salary

```sql
SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY total_salary DESC
LIMIT 1;
```

**Output**

| department | total_salary |
|---|---:|
| IT | 130000 |

`LIMIT 1` is supported by MySQL and PostgreSQL. SQL Server typically uses `TOP (1)` or `OFFSET ... FETCH`.

### Interview follow-up 2: Find departments with a total salary greater than 100,000

```sql
SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) > 100000;
```

**Output**

| department | total_salary |
|---|---:|
| IT | 130000 |

### Interview tip

Remember the pattern:

```sql
SELECT grouping_column, AGGREGATE_FUNCTION(value_column)
FROM table_name
GROUP BY grouping_column;
```

This pattern works for total sales per region, orders per customer, and expenses per category.

---

## 19. How do you count duplicate values or rows in a table?

### Answer

There are several ways to count rows and identify duplicates in SQL.

### Example table: employees

| employee_id | employee_name | email |
|---:|---|---|
| 1 | Rahul | rahul@example.com |
| 2 | Priya | priya@example.com |
| 3 | Amit | rahul@example.com |
| 4 | Neha | neha@example.com |
| 5 | Karan | priya@example.com |

### A. Count all rows in a table

```sql
SELECT COUNT(*) AS total_rows
FROM employees;
```

**Output**

| total_rows |
|---:|
| 5 |

### B. Find duplicate email addresses

```sql
SELECT
    email,
    COUNT(*) AS occurrence_count
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

**Output**

| email | occurrence_count |
|---|---:|
| rahul@example.com | 2 |
| priya@example.com | 2 |

**Explanation**

1. `GROUP BY email` groups rows with the same email.
2. `COUNT(*)` counts rows in each email group.
3. `HAVING COUNT(*) > 1` returns only repeated email values.

### C. Count how many distinct email values are duplicated

```sql
SELECT COUNT(*) AS duplicated_email_values
FROM (
    SELECT email
    FROM employees
    GROUP BY email
    HAVING COUNT(*) > 1
) AS duplicates;
```

**Output**

| duplicated_email_values |
|---:|
| 2 |

This counts duplicate email groups, not the number of extra rows.

### D. Count the number of extra duplicate rows

For non-NULL email values:

```sql
SELECT
    SUM(occurrence_count - 1) AS extra_duplicate_rows
FROM (
    SELECT COUNT(*) AS occurrence_count
    FROM employees
    WHERE email IS NOT NULL
    GROUP BY email
    HAVING COUNT(*) > 1
) AS duplicates;
```

**Output**

| extra_duplicate_rows |
|---:|
| 2 |

For example, if an email occurs three times, it contributes two extra duplicate rows.

### E. Find duplicates based on multiple columns

Suppose you want to identify employees with the same name and email.

```sql
SELECT
    employee_name,
    email,
    COUNT(*) AS occurrence_count
FROM employees
GROUP BY employee_name, email
HAVING COUNT(*) > 1;
```

This identifies repeated combinations of `employee_name` and `email`.

### Interview tip

To identify duplicate values, use:

```sql
GROUP BY column_name
HAVING COUNT(*) > 1;
```

Be clear about what you are counting: duplicate values, duplicate groups, or extra duplicate rows.

---

## 20. What is the difference between COUNT(*) and COUNT(column)?

### Answer

`COUNT(*)` counts all rows in a result set.

`COUNT(column)` counts only rows where that column is not `NULL`.

### Example table: employees

| employee_id | employee_name | bonus |
|---:|---|---:|
| 1 | Rahul | 5000 |
| 2 | Priya | NULL |
| 3 | Amit | 3000 |
| 4 | Neha | NULL |
| 5 | Karan | 2000 |

### A. Using COUNT(*)

```sql
SELECT COUNT(*) AS total_employees
FROM employees;
```

**Output**

| total_employees |
|---:|
| 5 |

All five rows are counted, including rows with a `NULL` bonus.

### B. Using COUNT(bonus)

```sql
SELECT COUNT(bonus) AS employees_with_bonus_value
FROM employees;
```

**Output**

| employees_with_bonus_value |
|---:|
| 3 |

Only three rows contain a non-`NULL` bonus value.

### C. Using COUNT(DISTINCT column)

```sql
SELECT COUNT(DISTINCT bonus) AS distinct_bonus_values
FROM employees;
```

**Output**

| distinct_bonus_values |
|---:|
| 3 |

The distinct non-`NULL` values are 5000, 3000, and 2000.

### Quick comparison

| Expression | What it counts |
|---|---|
| `COUNT(*)` | All rows |
| `COUNT(column)` | Rows where the column is not `NULL` |
| `COUNT(DISTINCT column)` | Distinct non-`NULL` values |
| `COUNT(1)` | Normally all rows, like `COUNT(*)` |

### Interview tip

If a table contains 100 rows and a column contains 15 `NULL` values:

- `COUNT(*)` returns 100.
- `COUNT(column)` returns 85.

**Remember:** `COUNT(column)` does not count `NULL` values, but it does count valid values such as `0` and an empty string.

---

# Quick Revision Sheet

| Question | Key answer |
|---|---|
| GROUP BY | Groups rows with matching values. |
| COUNT() | Counts rows or non-NULL values, depending on the expression. |
| SUM() | Calculates the total of non-NULL numeric values. |
| AVG() | Calculates the average of non-NULL numeric values. |
| MIN() | Returns the minimum value. |
| MAX() | Returns the maximum value. |
| HAVING | Filters groups after aggregation. |
| Total salary per department | `SUM(salary)` with `GROUP BY department`. |
| Find duplicates | `GROUP BY column HAVING COUNT(*) > 1`. |
| COUNT(*) | Counts all rows. |
| COUNT(column) | Counts non-NULL values in the column. |
| COUNT(DISTINCT column) | Counts distinct non-NULL values. |

---

# Interview Practice Questions

Try solving these without looking at the answers.

1. Find the number of employees in each department.
2. Find departments whose average salary is greater than 60,000.
3. Find the department with the highest total salary.
4. Find email addresses that appear more than once.
5. Count the number of distinct departments in the employees table.
6. Find employees whose salary is above the average salary of all employees.
7. Explain why `COUNT(*)` and `COUNT(email)` might return different results.

## Sample solutions

### 1. Count employees in each department

```sql
SELECT
    department,
    COUNT(*) AS total_employees
FROM employees
GROUP BY department;
```

### 2. Departments with an average salary above 60,000

```sql
SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;
```

### 3. Department with the highest total salary

```sql
SELECT
    department,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY total_salary DESC
LIMIT 1;
```

### 4. Find duplicate emails

```sql
SELECT
    email,
    COUNT(*) AS occurrence_count
FROM employees
WHERE email IS NOT NULL
GROUP BY email
HAVING COUNT(*) > 1;
```

### 5. Count distinct departments

```sql
SELECT COUNT(DISTINCT department) AS distinct_departments
FROM employees;
```

Note: `COUNT(DISTINCT department)` does not count `NULL` as a distinct value.

### 6. Employees earning above the average salary

```sql
SELECT employee_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

### 7. Why can COUNT(*) and COUNT(email) differ?

`COUNT(*)` counts every row, while `COUNT(email)` counts only rows where `email` is not `NULL`.

---

## Final interview tip

For aggregate-function questions, remember this sequence:

1. `WHERE` filters rows.
2. `GROUP BY` forms groups.
3. Aggregate functions calculate values per group.
4. `HAVING` filters groups.
5. `ORDER BY` sorts the final results.

Practice writing these queries yourself to become comfortable with SQL interview problems.


# SQL Subqueries, CTEs, and Advanced Querying — Interview Questions & Answers

Easy theory, practical SQL code snippets, expected outputs, and interview tips.

---

## 21. What is a subquery, and where can you use it?

### Answer

A **subquery** is a SQL query written inside another SQL query. It is also called an inner query or nested query.

A subquery can return a single value, a single row, multiple rows, or a table-like result, depending on the query.

### Where can you use subqueries?

- `WHERE` — filter rows based on another query.
- `SELECT` — calculate a value for each result row.
- `FROM` — use a query result as a derived table.
- `HAVING` — filter grouped results using a nested query.
- `INSERT`, `UPDATE`, and `DELETE` — use query results when modifying data.

### Example 1: Find employees earning more than the average salary

```sql
SELECT employee_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

**Explanation:**

1. The inner query calculates the average salary.
2. The outer query finds employees earning more than that average.

Suppose the average salary is 50,000. The outer query returns employees earning more than 50,000.

### Example 2: Find employees working in the IT department

```sql
SELECT employee_name
FROM employees
WHERE department_id = (
    SELECT department_id
    FROM departments
    WHERE department_name = 'IT'
);
```

This works when the inner query returns exactly one department ID.

If multiple rows can match, use `IN` instead:

```sql
SELECT employee_name
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE department_name IN ('IT', 'HR')
);
```

### Example 3: Subquery in the FROM clause

Find the average salary by department, then return departments with an average salary above 50,000.

```sql
SELECT department, average_salary
FROM (
    SELECT
        department,
        AVG(salary) AS average_salary
    FROM employees
    GROUP BY department
) AS department_summary
WHERE average_salary > 50000;
```

The subquery creates a temporary result that the outer query filters.

### Advantages

- Makes complex queries easier to break into smaller parts.
- Allows filtering based on calculated values.
- Can express existence and comparison conditions clearly.
- Can avoid repeating some calculations in a query.

### Interview tip

A subquery is useful when the result of one query is needed by another query. Whether it performs better than a JOIN or CTE depends on the database optimizer and execution plan.

---

## 22. What is the difference between correlated and non-correlated subqueries?

### Answer

A **non-correlated subquery** can execute independently of the outer query because it does not reference columns from the outer query.

A **correlated subquery** references one or more columns from the outer query.

### A. Non-correlated subquery

Find employees earning more than the overall average salary.

```sql
SELECT employee_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

**How it works:**

1. The inner query calculates the overall average salary.
2. The outer query compares each employee's salary against that result.

The inner query does not reference the current employee row.

### B. Correlated subquery

Find employees earning more than the average salary of their own department.

```sql
SELECT e.employee_name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e.department_id
);
```

**How it works:**

1. The outer query selects an employee.
2. The inner query calculates the average salary for that employee's department.
3. The outer query checks whether the employee earns more than that department average.

The condition `e2.department_id = e.department_id` references the outer query's row, making the subquery correlated.

### Difference table

| Feature | Non-correlated | Correlated |
|---|---|---|
| Depends on outer query | No | Yes |
| References outer columns | No | Yes |
| Can run independently | Yes | Not as written |
| Typical example | Compare with overall average | Compare with department average |
| Performance | Often straightforward to optimize | Can be more expensive, but optimization varies |

### Interview tip

Do not assume that a correlated subquery always executes literally once for every outer row. The database optimizer may transform it into a more efficient execution plan.

**Easy way to remember:**

- Non-correlated = independent query.
- Correlated = depends on the outer query.

---

## 23. How do you find the second-highest salary?

### Answer

There are multiple ways to find the second-highest salary. First clarify whether the interviewer wants the **second-highest distinct salary** or the employee in the second position when salaries are sorted.

Assume the following data:

| employee_name | salary |
|---|---:|
| Rahul | 90000 |
| Priya | 80000 |
| Amit | 80000 |
| Neha | 70000 |
| Karan | 60000 |

The second-highest **distinct** salary is 80,000.

### Method 1: Using a subquery and MAX()

```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);
```

**How it works:**

1. The inner query finds the highest salary: 90,000.
2. The outer query considers salaries below 90,000.
3. `MAX(salary)` returns the highest remaining salary: 80,000.

**Advantages:** Simple and widely supported.

**Important:** If there is no second distinct salary, the result is `NULL`.

### Method 2: Using DISTINCT, ORDER BY, and OFFSET

```sql
SELECT DISTINCT salary
FROM employees
WHERE salary IS NOT NULL
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

**How it works:**

- `DISTINCT` removes repeated salary values.
- `ORDER BY salary DESC` sorts salaries from highest to lowest.
- `OFFSET 1` skips the highest distinct salary.
- `LIMIT 1` returns the next salary.

This syntax works in MySQL and PostgreSQL. Other databases may use different pagination syntax.

### Method 3: Using DENSE_RANK()

```sql
WITH salary_ranks AS (
    SELECT
        employee_name,
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
    WHERE salary IS NOT NULL
)
SELECT employee_name, salary
FROM salary_ranks
WHERE salary_rank = 2;
```

**Output**

| employee_name | salary |
|---|---:|
| Priya | 80000 |
| Amit | 80000 |

`DENSE_RANK()` assigns the same rank to equal salaries without leaving gaps in the ranking.

For example:

| Salary | DENSE_RANK |
|---:|---:|
| 90000 | 1 |
| 80000 | 2 |
| 80000 | 2 |
| 70000 | 3 |
| 60000 | 4 |

Both Priya and Amit are returned because they share the second-highest distinct salary.

### ROW_NUMBER() vs RANK() vs DENSE_RANK()

| Function | Behavior for tied salaries |
|---|---|
| `ROW_NUMBER()` | Assigns a unique sequential number to each row; tie order may be nondeterministic without a tie-breaker |
| `RANK()` | Gives ties the same rank and skips subsequent ranks |
| `DENSE_RANK()` | Gives ties the same rank without skipping ranks |

Example for salaries 90,000, 80,000, 80,000, and 70,000:

| Salary | ROW_NUMBER* | RANK | DENSE_RANK |
|---:|---:|---:|---:|
| 90000 | 1 | 1 | 1 |
| 80000 | 2 | 2 | 2 |
| 80000 | 3 | 2 | 2 |
| 70000 | 4 | 4 | 3 |

*For `ROW_NUMBER()`, the order of the tied 80,000 rows requires a tie-breaker if a consistent result is needed.*

### Interview tip

- For the second-highest distinct salary value, use `MAX()` with a subquery or `DENSE_RANK()`.
- If the interviewer asks for the employees receiving that salary, use `DENSE_RANK()` and filter for rank 2.
- Always clarify how duplicate salaries should be handled.

---

## 24. What is a Common Table Expression (CTE)?

### Answer

A **Common Table Expression (CTE)** is a named query result defined using the `WITH` keyword. It can be referenced by the main query and can make complex SQL easier to read and maintain.

A CTE exists only for the duration of the statement in which it is defined. It is not automatically a permanent table.

### Basic syntax

```sql
WITH cte_name AS (
    SELECT column1, column2
    FROM table_name
)
SELECT *
FROM cte_name;
```

### Example 1: Find departments with an average salary above 50,000

```sql
WITH department_salary AS (
    SELECT
        department_id,
        AVG(salary) AS average_salary
    FROM employees
    GROUP BY department_id
)
SELECT department_id, average_salary
FROM department_salary
WHERE average_salary > 50000;
```

**Explanation:**

1. The CTE calculates the average salary per department.
2. The main query filters the CTE result.
3. The query is easier to understand because the calculation is separated from the filtering logic.

### Example 2: CTE to find the second-highest distinct salary

```sql
WITH salary_ranks AS (
    SELECT
        employee_name,
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
    WHERE salary IS NOT NULL
)
SELECT employee_name, salary
FROM salary_ranks
WHERE salary_rank = 2;
```

### Can we use multiple CTEs?

Yes. Multiple CTEs can be defined in one `WITH` clause and can reference earlier CTEs.

```sql
WITH department_totals AS (
    SELECT
        department_id,
        SUM(salary) AS total_salary
    FROM employees
    GROUP BY department_id
),
high_salary_departments AS (
    SELECT department_id, total_salary
    FROM department_totals
    WHERE total_salary > 100000
)
SELECT *
FROM high_salary_departments;
```

### CTE vs subquery

| Feature | CTE | Subquery |
|---|---|---|
| Syntax | Uses `WITH` | Nested inside a query |
| Readability | Often clearer for complex logic | Good for small, simple queries |
| Reuse | Can be referenced multiple times within the same statement | Usually written at each required location |
| Recursive logic | Supports recursive queries where available | Not the usual approach for recursion |
| Performance | Depends on the database and execution plan | Depends on the database and execution plan |

### Important interview points

- A CTE is not necessarily stored in memory or materialized.
- Some databases may inline or materialize CTEs depending on the query and engine.
- CTEs improve query organization but do not automatically make queries faster.
- CTE syntax and features vary by database version.

### Interview tip

Use CTEs when a query has multiple logical steps, complex aggregations, window functions, or recursive relationships.

---

## 25. What is a recursive CTE? Explain with an example and use cases.

### Answer

A **recursive CTE** is a CTE that references itself to process hierarchical or repeatedly related data.

It typically has two parts:

1. **Anchor member:** Produces the initial rows.
2. **Recursive member:** Uses the previous result to produce the next level of rows.

The database continues the recursion until the recursive member produces no more rows or a configured limit is reached.

### Example: Employee management hierarchy

Consider this table:

| employee_id | employee_name | manager_id |
|---:|---|---:|
| 1 | Anil | NULL |
| 2 | Rahul | 1 |
| 3 | Priya | 1 |
| 4 | Amit | 2 |
| 5 | Neha | 4 |

The hierarchy is:

- Anil is the top-level manager.
- Rahul and Priya report to Anil.
- Amit reports to Rahul.
- Neha reports to Amit.

### Recursive CTE query

The following example uses PostgreSQL-compatible syntax.

```sql
WITH RECURSIVE employee_hierarchy AS (
    -- Anchor member: start with the top-level manager
    SELECT
        employee_id,
        employee_name,
        manager_id,
        1 AS hierarchy_level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive member: find employees reporting
    -- to the employees in the previous level
    SELECT
        e.employee_id,
        e.employee_name,
        e.manager_id,
        eh.hierarchy_level + 1
    FROM employees e
    INNER JOIN employee_hierarchy eh
        ON e.manager_id = eh.employee_id
)
SELECT
    employee_id,
    employee_name,
    manager_id,
    hierarchy_level
FROM employee_hierarchy
ORDER BY hierarchy_level, employee_id;
```

### Expected output

| employee_id | employee_name | manager_id | hierarchy_level |
|---:|---|---:|---:|
| 1 | Anil | NULL | 1 |
| 2 | Rahul | 1 | 2 |
| 3 | Priya | 1 | 2 |
| 4 | Amit | 2 | 3 |
| 5 | Neha | 4 | 4 |

### How does recursion work?

**Step 1: Anchor member**

The query finds Anil because his `manager_id` is `NULL`. Anil is assigned hierarchy level 1.

**Step 2: First recursive iteration**

The query finds employees whose `manager_id` equals Anil's `employee_id`. Rahul and Priya are returned at level 2.

**Step 3: Second recursive iteration**

The query finds employees reporting to Rahul or Priya. Amit is found under Rahul at level 3.

**Step 4: Third recursive iteration**

The query finds Neha under Amit at level 4.

**Step 5: Stop**

When no further employees match the previous level, recursion ends.

### Important syntax note

- PostgreSQL uses `WITH RECURSIVE`.
- MySQL 8.0 and later supports recursive CTEs using `WITH RECURSIVE`.
- SQL Server uses `WITH` for recursive CTEs and does not include the `RECURSIVE` keyword.
- Recursion limits and termination behavior differ by database.

### Common use cases

1. Employee-manager hierarchies.
2. Organizational charts.
3. Category and subcategory trees.
4. Parent-child relationships.
5. Bill of materials in manufacturing.
6. Traversing hierarchical data.
7. Generating sequences of numbers or dates.

### Interview follow-up: What happens if recursion does not stop?

A cycle in hierarchical data or an incorrect recursive condition can cause recursion to continue until the database reaches a recursion limit or raises an error.

For production queries, validate the hierarchy, ensure the recursive condition progresses correctly, and use appropriate cycle detection or recursion limits where supported.

### Interview tip

Remember the pattern:

```sql
WITH RECURSIVE cte_name AS (
    -- Anchor query

    UNION ALL

    -- Recursive query referencing cte_name
)
SELECT *
FROM cte_name;
```

The anchor starts the process, and the recursive member discovers the next level.

---

# Quick Revision Sheet

| Question | Key answer |
|---|---|
| Subquery | A query nested inside another query. |
| Non-correlated subquery | Can execute independently of the outer query. |
| Correlated subquery | References columns from the outer query. |
| Second-highest salary | Use `MAX()` with a subquery or `DENSE_RANK()`. |
| CTE | A named query result defined using `WITH`. |
| Multiple CTEs | Define multiple named query results in one `WITH` clause. |
| Recursive CTE | Repeatedly processes related rows using an anchor and recursive member. |
| CTE vs subquery | Primarily a readability and query-structure choice; performance varies. |
| Recursive use cases | Hierarchies, categories, parent-child data, and sequences. |

---

# Interview Practice Questions

Try solving these without looking at the answers.

1. Find employees earning more than the overall average salary.
2. Find employees earning more than their department's average salary.
3. Find the second-highest distinct salary.
4. Return all employees who receive the second-highest distinct salary.
5. Rewrite a nested subquery using a CTE.
6. Explain the difference between a CTE and a temporary table.
7. Find all employees reporting directly or indirectly to a given manager.
8. What is the anchor member in a recursive CTE?
9. What can cause infinite or excessive recursion?
10. When would you use `EXISTS` instead of `IN`?

## Sample solution: Employees earning above their department average

```sql
SELECT
    e.employee_name,
    e.salary,
    e.department_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e.department_id
);
```

## Sample solution: Second-highest distinct salary

```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);
```

## Sample solution: Find employees reporting to a manager, directly or indirectly

The following PostgreSQL/MySQL 8.0+ example starts with manager ID `2` and finds all descendants.

```sql
WITH RECURSIVE reports AS (
    -- Direct reports
    SELECT
        employee_id,
        employee_name,
        manager_id
    FROM employees
    WHERE manager_id = 2

    UNION ALL

    -- Indirect reports
    SELECT
        e.employee_id,
        e.employee_name,
        e.manager_id
    FROM employees e
    INNER JOIN reports r
        ON e.manager_id = r.employee_id
)
SELECT *
FROM reports;
```

This returns employees who report directly or indirectly to employee 2, but does not include employee 2 itself.

---

# Final Interview Advice

For subqueries and advanced SQL:

- Explain what the inner query returns.
- Explain how the outer query uses that result.
- For correlated queries, identify the reference to the outer row.
- For ranking problems, clarify how duplicate values should be treated.
- For CTEs, explain readability and scope.
- For recursive CTEs, clearly identify the anchor, recursive member, and termination condition.

**Goal:** Understand the execution logic instead of memorizing query syntax. That makes it easier to solve variations of the same interview question.
# SQL Window Functions — Interview Questions & Answers

Easy theory, practical SQL examples, expected outputs, and interview tips for SQL interviews.

---

## 26. What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?

### Answer

These are SQL window functions used to assign rankings or sequence numbers to rows based on specified ordering criteria.

The main difference is how they handle duplicate values (ties).

Consider the following `employees` table:

| employee_id | employee_name | salary |
|---:|---|---:|
| 1 | Rahul | 90000 |
| 2 | Priya | 80000 |
| 3 | Amit | 80000 |
| 4 | Neha | 70000 |
| 5 | Karan | 60000 |

### A. ROW_NUMBER()

Assigns a unique sequential number to every row, even when multiple rows have the same salary.

```sql
SELECT
    employee_name,
    salary,
    ROW_NUMBER() OVER (
        ORDER BY salary DESC, employee_id
    ) AS row_num
FROM employees;
```

**Output**

| employee_name | salary | row_num |
|---|---:|---:|
| Rahul | 90000 | 1 |
| Priya | 80000 | 2 |
| Amit | 80000 | 3 |
| Neha | 70000 | 4 |
| Karan | 60000 | 5 |

The `employee_id` provides a tie-breaker, making the numbering deterministic when IDs are unique.

### B. RANK()

Assigns the same rank to tied values, but skips subsequent rank numbers.

```sql
SELECT
    employee_name,
    salary,
    RANK() OVER (
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;
```

**Output**

| employee_name | salary | salary_rank |
|---|---:|---:|
| Rahul | 90000 | 1 |
| Priya | 80000 | 2 |
| Amit | 80000 | 2 |
| Neha | 70000 | 4 |
| Karan | 60000 | 5 |

Both Priya and Amit receive rank 2. Neha receives rank 4 because rank 3 is skipped.

### C. DENSE_RANK()

Assigns the same rank to tied values without skipping subsequent ranks.

```sql
SELECT
    employee_name,
    salary,
    DENSE_RANK() OVER (
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;
```

**Output**

| employee_name | salary | salary_rank |
|---|---:|---:|
| Rahul | 90000 | 1 |
| Priya | 80000 | 2 |
| Amit | 80000 | 2 |
| Neha | 70000 | 3 |
| Karan | 60000 | 4 |

### Quick comparison

| Salary | ROW_NUMBER | RANK | DENSE_RANK |
|---:|---:|---:|---:|
| 90000 | 1 | 1 | 1 |
| 80000 | 2 | 2 | 2 |
| 80000 | 3 | 2 | 2 |
| 70000 | 4 | 4 | 3 |
| 60000 | 5 | 5 | 4 |

### When should you use each function?

- `ROW_NUMBER()` — assign unique row numbers, such as selecting one latest record per customer.
- `RANK()` — competition rankings where tied positions cause gaps, such as sports rankings.
- `DENSE_RANK()` — rank distinct salary or score values without gaps.

### Interview question: Find the second-highest salary.

```sql
WITH salary_ranks AS (
    SELECT
        employee_name,
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
)
SELECT employee_name, salary
FROM salary_ranks
WHERE salary_rank = 2;
```

This returns all employees earning the second-highest distinct salary.

**Interview tip:** If you add `employee_id` to the `ORDER BY` inside `RANK()` or `DENSE_RANK()`, employees with equal salaries will no longer be tied when IDs differ. Only add a tie-breaker when that is the intended ranking behavior.

---

## 27. How do you use window functions to calculate running totals?

### Answer

A **running total** is a cumulative sum calculated row by row according to a specified order.

Window functions let you calculate a running total without collapsing all rows into a single result per group.

Consider a `sales` table:

| sale_date | amount |
|---|---:|
| 2026-01-01 | 100 |
| 2026-01-02 | 200 |
| 2026-01-03 | 150 |
| 2026-01-04 | 300 |

### SQL query

```sql
SELECT
    sale_date,
    amount,
    SUM(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM sales
ORDER BY sale_date;
```

**Output**

| sale_date | amount | running_total |
|---|---:|---:|
| 2026-01-01 | 100 | 100 |
| 2026-01-02 | 200 | 300 |
| 2026-01-03 | 150 | 450 |
| 2026-01-04 | 300 | 750 |

### How does it work?

- `SUM(amount)` calculates the cumulative sum.
- `OVER()` defines the window of rows used in the calculation.
- `ORDER BY sale_date` determines the sequence.
- `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` includes rows from the beginning of the ordered window through the current row.

### Interview question: Calculate running totals separately for each customer.

Assume the table contains `customer_id`, `order_date`, and `amount`.

```sql
SELECT
    customer_id,
    order_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date, order_id
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders;
```

This calculates a separate cumulative total for each customer. The `order_id` tie-breaker makes the order deterministic when multiple orders have the same date.

### Important point: ROWS vs RANGE

Window frames matter when multiple rows share the same ordering value.

- `ROWS` counts physical rows in the ordered result.
- `RANGE` groups rows according to ordering values and peer behavior; exact supported syntax varies by database.

For a row-by-row running total, an explicit `ROWS` frame is often the clearest choice.

### Interview tip

Running totals are useful for cumulative revenue, account balances, monthly sales, inventory changes, and progressive financial calculations.

---

## 28. How do you partition data using window functions?

### Answer

`PARTITION BY` divides rows into logical groups for a window function. The function operates separately within each partition, but the original rows remain in the result.

Unlike `GROUP BY`, which generally produces one result row per group, window functions can return a calculated value for every input row.

Consider this `employees` table:

| employee_name | department | salary |
|---|---|---:|
| Rahul | IT | 90000 |
| Priya | IT | 80000 |
| Amit | HR | 60000 |
| Neha | HR | 50000 |
| Karan | Sales | 45000 |

### Example 1: Rank employees within each department

```sql
SELECT
    employee_name,
    department,
    salary,
    DENSE_RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS department_rank
FROM employees;
```

**Output**

| employee_name | department | salary | department_rank |
|---|---|---:|---:|
| Rahul | IT | 90000 | 1 |
| Priya | IT | 80000 | 2 |
| Amit | HR | 60000 | 1 |
| Neha | HR | 50000 | 2 |
| Karan | Sales | 45000 | 1 |

### Explanation

- `PARTITION BY department` creates a separate window for each department.
- `ORDER BY salary DESC` sorts salaries within each department.
- `DENSE_RANK()` starts ranking from 1 independently in each department.

### Example 2: Calculate average salary per department while keeping every employee

```sql
SELECT
    employee_name,
    department,
    salary,
    AVG(salary) OVER (
        PARTITION BY department
    ) AS department_average
FROM employees;
```

**Output**

| employee_name | department | salary | department_average |
|---|---|---:|---:|
| Rahul | IT | 90000 | 85000 |
| Priya | IT | 80000 | 85000 |
| Amit | HR | 60000 | 55000 |
| Neha | HR | 50000 | 55000 |
| Karan | Sales | 45000 | 45000 |

Every employee remains in the output, with their department's average salary included.

### GROUP BY vs PARTITION BY

| Feature | GROUP BY | PARTITION BY in a window function |
|---|---|---|
| Result rows | Usually one per group | Keeps individual input rows |
| Typical use | Summaries and aggregation | Rankings, running totals, per-row comparisons |
| Example | Total salary per department | Department average shown beside each employee |

### Interview tip

Use `GROUP BY` when you need summary rows. Use `PARTITION BY` when you need a calculation per group while preserving individual records.

---

## 29. What are NTILE() and PERCENT_RANK()? Explain their use cases.

### Answer

`NTILE()` and `PERCENT_RANK()` are window functions that help divide or position rows within an ordered result.

### A. NTILE(n)

`NTILE(n)` divides ordered rows into up to `n` approximately equal-sized buckets and assigns a bucket number to each row.

### Example: Divide employees into four salary groups

```sql
SELECT
    employee_name,
    salary,
    NTILE(4) OVER (
        ORDER BY salary DESC, employee_id
    ) AS salary_quartile
FROM employees;
```

If there are 8 employees, the buckets will generally contain 2 employees each.

- Bucket 1: Highest salaries.
- Bucket 2: Next-highest salaries.
- Bucket 3: Lower salaries.
- Bucket 4: Lowest salaries.

The `employee_id` tie-breaker makes bucket assignment deterministic when salaries are equal.

**Use cases**

- Divide customers into four spending groups.
- Segment users into ten groups for analysis.
- Create approximate salary quartiles.
- Divide products into performance buckets.

**Important:** `NTILE(4)` creates four row-count-based buckets, not necessarily four groups with equal salary ranges.

### B. PERCENT_RANK()

`PERCENT_RANK()` calculates a row's relative rank within a partition.

Its formula is:

\[
\text{PERCENT\_RANK} =
\frac{\text{RANK} - 1}{\text{Number of rows} - 1}
\]

For a partition with more than one row, its value ranges from 0 to 1.

### Example

```sql
SELECT
    employee_name,
    salary,
    PERCENT_RANK() OVER (
        ORDER BY salary
    ) AS percent_rank
FROM employees;
```

Suppose salaries are 40,000, 50,000, 60,000, and 70,000.

| salary | rank | percent_rank |
|---:|---:|---:|
| 40000 | 1 | 0.0000 |
| 50000 | 2 | 0.3333 |
| 60000 | 3 | 0.6667 |
| 70000 | 4 | 1.0000 |

For a single-row partition, `PERCENT_RANK()` returns 0.

### Important difference: PERCENT_RANK vs percentile

`PERCENT_RANK()` is a relative rank measure, not a direct calculation of a salary threshold such as the 90th percentile.

If you need the salary value at a percentile, functions such as `PERCENTILE_CONT()` may be more appropriate where supported.

### NTILE vs PERCENT_RANK

| Feature | NTILE(n) | PERCENT_RANK() |
|---|---|---|
| Result | Integer bucket number | Relative rank between 0 and 1 |
| Purpose | Divide rows into groups | Express relative ranking |
| Equal-sized groups | Approximately, by row count | Does not create groups |
| Common use | Quartiles and deciles | Relative position and ranking analysis |

### Interview tip

Use `NTILE(4)` to segment ordered rows into four buckets. Use `PERCENT_RANK()` when you need a normalized ranking position.

---

## 30. When should you avoid window functions because of performance?

### Answer

Window functions are powerful, but they can be expensive when they operate on large datasets, require sorting, or process more rows than necessary.

You should not automatically avoid window functions. First understand the query requirements and check the execution plan.

### Common performance concerns

**1. Large sorts**

For example:

```sql
SELECT
    employee_id,
    salary,
    RANK() OVER (
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;
```

Ranking millions of rows may require a large sort if the database cannot use an appropriate access path.

**2. Processing unnecessary rows**

If you need rankings only for active employees, filter the relevant rows before calculating the window when that matches the required business logic.

```sql
SELECT
    employee_id,
    salary,
    RANK() OVER (
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees
WHERE status = 'ACTIVE';
```

This ranks active employees only. It is not equivalent to ranking all employees and then displaying only active ones.

**3. Too many incompatible window definitions**

Different window orderings or partitions may require additional sorting or processing.

```sql
SELECT
    employee_id,
    department_id,
    salary,
    RANK() OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS department_rank,
    ROW_NUMBER() OVER (
        ORDER BY hire_date
    ) AS hiring_order
FROM employees;
```

These two calculations use different ordering requirements, which may increase execution cost.

**4. Repeated calculations**

If multiple reports repeatedly calculate the same expensive result, consider whether a summary table, materialized view, or precomputed aggregate is appropriate.

### Alternatives to consider

- A regular aggregate query when only summary rows are required.
- An indexed lookup or `ORDER BY ... LIMIT` when only the top few rows are needed.
- A correlated subquery or `EXISTS` for certain existence checks.
- A summary table or materialized view for repeatedly requested analytical results.

An alternative is not automatically faster. Compare execution plans and actual timings.

### Example: GROUP BY instead of a window function

If you only need the average salary per department, use:

```sql
SELECT
    department_id,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department_id;
```

Do not use a window function if you do not need individual employee rows.

However, if you need every employee alongside the department average, this window function is appropriate:

```sql
SELECT
    employee_id,
    department_id,
    salary,
    AVG(salary) OVER (
        PARTITION BY department_id
    ) AS department_average
FROM employees;
```

### How to optimize window functions

1. Filter rows as early as logically correct.
2. Select only the columns you need.
3. Use appropriate indexes for filtering and ordering where useful.
4. Avoid unnecessary window calculations.
5. Check execution plans with `EXPLAIN` or `EXPLAIN ANALYZE` where supported.
6. Test with representative data volumes.
7. Consider pre-aggregation or materialization for repeated analytical workloads.

### Interview tip

Window functions are not inherently slow. Their performance depends on the dataset size, ordering, partitioning, indexes, execution plan, and database engine.

A strong interview answer explains how you would measure and optimize the query instead of claiming that window functions should always be avoided.

---

# Quick Revision Sheet

| Question | Key answer |
|---|---|
| `ROW_NUMBER()` | Assigns a unique sequential number to each row. |
| `RANK()` | Gives ties the same rank and skips subsequent ranks. |
| `DENSE_RANK()` | Gives ties the same rank without gaps. |
| Running total | Use `SUM() OVER (ORDER BY ... ROWS ...)`. |
| `PARTITION BY` | Divides rows into independent windows while preserving rows. |
| `NTILE(n)` | Divides ordered rows into up to `n` approximately equal-sized buckets. |
| `PERCENT_RANK()` | Calculates relative rank using `(rank - 1) / (rows - 1)`. |
| Window function performance | Watch sorting, large partitions, unnecessary rows, and repeated calculations. |

---

# Interview Practice Questions

Try solving these without looking at the answers.

1. Find the top three highest-paid employees in each department.
2. Find the second-highest distinct salary in every department.
3. Calculate a running total of sales for each customer.
4. Show every employee alongside their department's average salary.
5. Divide customers into five groups based on total spending.
6. Explain why `ROW_NUMBER()` and `DENSE_RANK()` return different results when salaries tie.
7. What is the difference between `GROUP BY` and `PARTITION BY`?
8. How would you investigate a slow window-function query?

## Sample solution 1: Top three salary ranks per department

```sql
WITH ranked_employees AS (
    SELECT
        employee_id,
        employee_name,
        department_id,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
)
SELECT *
FROM ranked_employees
WHERE salary_rank <= 3;
```

This returns the top three **distinct salary ranks** per department, including ties. It may return more than three employees per department.

To return at most three employees per department, use `ROW_NUMBER()` with a deterministic tie-breaker instead.

## Sample solution 2: Second-highest distinct salary per department

```sql
WITH ranked_employees AS (
    SELECT
        employee_id,
        employee_name,
        department_id,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
)
SELECT employee_name, department_id, salary
FROM ranked_employees
WHERE salary_rank = 2;
```

## Sample solution 3: Running total of sales per customer

```sql
SELECT
    customer_id,
    order_date,
    order_id,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date, order_id
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders;
```

---

# Final Interview Advice

For window-function questions, always explain three things:

1. **Partition:** Which rows belong to the same group?
2. **Ordering:** In what sequence are rows ranked or processed?
3. **Frame:** Which rows contribute to a running aggregate?

Understanding these three concepts makes ranking, running totals, and advanced analytical queries much easier to solve.

# SQL Indexes, Performance and Optimization — Interview Questions & Answers

Easy theory, practical SQL code snippets, examples, and interview tips for technical interviews.

---

## 31. What is an index in SQL, and why do we use it?

### Answer

An **index** is a data structure that helps a database find rows faster without scanning the entire table in many cases.

Think of an index like the index at the back of a book. Instead of reading every page to find a topic, you use the index to locate the relevant page.

### Example table: employees

| employee_id | employee_name | department_id | salary |
|---:|---|---:|---:|
| 1 | Rahul | 10 | 60000 |
| 2 | Priya | 20 | 70000 |
| 3 | Amit | 10 | 50000 |
| 4 | Neha | 30 | 80000 |

Suppose the table contains millions of employee records and you frequently search by `department_id`.

### Without an index

```sql
SELECT *
FROM employees
WHERE department_id = 10;
```

The database may perform a full table scan, checking many or all rows.

### Create an index

```sql
CREATE INDEX idx_employees_department
ON employees(department_id);
```

Run the query again:

```sql
SELECT *
FROM employees
WHERE department_id = 10;
```

The database can use the index to locate matching rows more efficiently.

**Important:** Creating an index does not guarantee that the database will use it. The optimizer decides based on the query, table statistics, selectivity, and estimated cost.

### Common types of indexes

- **Single-column index:** Indexes one column.
- **Composite index:** Indexes multiple columns.
- **Unique index:** Prevents duplicate indexed key values, subject to database-specific `NULL` rules.
- **Full-text index:** Supports text-search operations in supported database engines.
- **Partial or filtered index:** Indexes only rows satisfying a condition, where supported.
- **Clustered index:** Organizes table data according to an index structure in database systems that support this concept.

### Example: Composite index

```sql
CREATE INDEX idx_department_salary
ON employees(department_id, salary);
```

This may help queries such as:

```sql
SELECT employee_name, salary
FROM employees
WHERE department_id = 10
  AND salary > 50000;
```

### Why use indexes?

1. Speed up filtering with `WHERE`.
2. Improve some joins.
3. Help with sorting and grouping.
4. Enforce uniqueness through unique indexes.
5. Reduce the number of rows or data pages that must be examined.

### Interview tip

Indexes improve read performance in suitable queries, but they consume storage and add overhead to inserts, updates, and deletes.

---

## 32. What is the difference between clustered and non-clustered indexes?

### Answer

A **clustered index** organizes the table's data according to the index key in database systems that support clustered storage.

A **non-clustered index** stores a separate index structure containing indexed keys and row locators or references to the underlying rows.

The exact implementation differs across database engines.

### Clustered index

In SQL Server, a clustered index defines how table rows are organized in the clustered index's leaf level.

Example:

```sql
CREATE CLUSTERED INDEX idx_employee_id
ON employees(employee_id);
```

This example is SQL Server syntax.

### Non-clustered index

A non-clustered index stores index keys separately from the table's clustered data structure, with references that help locate the rows.

Example in SQL Server:

```sql
CREATE NONCLUSTERED INDEX idx_employee_department
ON employees(department_id);
```

This index can help locate employees belonging to a particular department.

### Comparison

| Feature | Clustered index | Non-clustered index |
|---|---|---|
| Data organization | Table data is organized by the clustered index key | Separate index structure |
| Leaf level | Contains the table's data rows in SQL Server | Contains index keys and row locators |
| Number per table | At most one in SQL Server | Multiple can exist |
| Storage | Defines the clustered data structure | Requires additional storage |
| Typical use | Frequently used primary access path or range queries | Additional search and filtering columns |

### Important database differences

- **SQL Server:** A table can have one clustered index and multiple non-clustered indexes.
- **MySQL InnoDB:** The table is organized around its clustered primary key. Secondary indexes generally contain the primary-key value as the row locator.
- **PostgreSQL:** Ordinary indexes are separate from the table heap. `CLUSTER` can physically reorder a table based on an index, but subsequent changes do not automatically maintain that physical order.

### Interview tip

Do not say every database supports clustered indexes in exactly the same way. Explain the database engine when discussing clustered and non-clustered indexes.

---

## 33. How do indexes impact query performance and write operations?

### Answer

Indexes can make reads faster, but they also introduce maintenance costs.

Whenever indexed data changes, the database may need to update the relevant index entries.

### A. Benefits for reads

Consider this query:

```sql
SELECT *
FROM employees
WHERE department_id = 20;
```

An index on `department_id` may allow the database to locate matching employees without scanning the entire table.

Indexes can also help with:

- Joins
- Sorting
- Range queries
- Some `GROUP BY` operations
- Unique constraints

### B. Impact on INSERT

```sql
INSERT INTO employees (
    employee_id,
    employee_name,
    department_id,
    salary
)
VALUES (5, 'Karan', 20, 55000);
```

If several indexes exist on the table, the database may need to update each relevant index.

This can make inserts slower than they would be without those indexes.

### C. Impact on UPDATE

```sql
UPDATE employees
SET department_id = 30
WHERE employee_id = 5;
```

If `department_id` is indexed, the database must maintain the affected index entries. If the update changes indexed columns, additional index work may be required.

### D. Impact on DELETE

```sql
DELETE FROM employees
WHERE employee_id = 5;
```

The database removes the relevant index entries along with the deleted row.

### Index trade-offs

| Operation | Potential impact of indexes |
|---|---|
| SELECT | Often faster for suitable access patterns |
| INSERT | More index entries may need to be added |
| UPDATE | Index maintenance may be required |
| DELETE | Index entries must be removed |
| Storage | Additional disk space is required |

### What is an over-indexed table?

An over-indexed table has more indexes than its workload justifies.

Possible problems include:

- Slower writes
- Increased storage requirements
- More maintenance during schema changes and bulk loads
- Additional optimizer choices and maintenance overhead

### Best practices

1. Index columns frequently used in selective filters and joins.
2. Review composite indexes against actual query patterns.
3. Avoid creating duplicate or redundant indexes without a reason.
4. Check whether existing indexes already support a query.
5. Measure the impact on both read and write workloads.

### Interview tip

The goal is not to create as many indexes as possible. It is to create the right indexes for the application's workload.

---

## 34. How do you optimize slow SQL queries?

### Answer

SQL query optimization means improving query execution time and resource usage while preserving the correct results.

A good approach is to identify the bottleneck first rather than randomly adding indexes or rewriting SQL.

### Step 1: Identify the slow query

Find queries with high execution time, frequent execution, excessive reads, or high resource consumption.

Use the monitoring tools available for your database, such as query statistics, performance dashboards, or slow-query logs.

### Step 2: Read the execution plan

Use `EXPLAIN` to inspect the optimizer's intended plan.

```sql
EXPLAIN
SELECT employee_name, salary
FROM employees
WHERE department_id = 10;
```

Where supported, `EXPLAIN ANALYZE` executes the query and reports actual execution statistics.

Be careful when using `EXPLAIN ANALYZE` on expensive queries because it actually runs the statement.

### Step 3: Add appropriate indexes

If the query frequently filters on `department_id`, consider:

```sql
CREATE INDEX idx_employees_department
ON employees(department_id);
```

Verify that the index improves the actual execution plan and runtime.

### Step 4: Avoid SELECT *

Instead of retrieving every column:

```sql
SELECT *
FROM employees
WHERE department_id = 10;
```

Select only the columns you need:

```sql
SELECT employee_id, employee_name
FROM employees
WHERE department_id = 10;
```

This can reduce data transfer and unnecessary reads, especially for wide rows.

### Step 5: Filter rows efficiently

Use conditions that allow the database to use suitable indexes.

Potentially less index-friendly example:

```sql
SELECT *
FROM employees
WHERE YEAR(hire_date) = 2025;
```

Depending on the database and available indexes, applying a function to the indexed column can prevent an ordinary index range scan.

A range-based alternative is:

```sql
SELECT *
FROM employees
WHERE hire_date >= '2025-01-01'
  AND hire_date < '2026-01-01';
```

This is often more index-friendly when `hire_date` is indexed.

### Step 6: Optimize JOINs

Ensure join conditions are correct and that suitable indexes exist on relevant join keys.

```sql
SELECT
    e.employee_name,
    d.department_name
FROM employees e
JOIN departments d
    ON e.department_id = d.department_id;
```

Also investigate whether duplicate keys or many-to-many relationships are producing unexpectedly large results.

### Step 7: Avoid unnecessary calculations

Do not retrieve or aggregate data that the application does not need.

For example, if only the top five highest-paid employees are required:

```sql
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

An appropriate index may help, depending on the database, existing indexes, and query plan.

### Step 8: Check pagination

Large offsets can be expensive because the database may need to process and discard many rows.

Instead of:

```sql
SELECT employee_id, employee_name
FROM employees
ORDER BY employee_id
LIMIT 20 OFFSET 100000;
```

Consider keyset pagination when the application supports it:

```sql
SELECT employee_id, employee_name
FROM employees
WHERE employee_id > 100000
ORDER BY employee_id
LIMIT 20;
```

This example assumes `employee_id` is unique and the cursor value represents the last row seen on the previous page.

### Step 9: Check database statistics

The optimizer relies on statistics to estimate row counts and choose a plan. Stale or inaccurate statistics can lead to poor decisions.

Use the database's supported statistics-maintenance tools when appropriate.

### Step 10: Measure again

Compare the execution plan, elapsed time, rows examined, logical reads, and resource usage before and after the change.

### Interview tip

A strong answer follows this process:

1. Identify the slow query.
2. Inspect the execution plan.
3. Find the bottleneck.
4. Apply a targeted fix.
5. Measure the improvement.
6. Verify that the results remain correct.

---

## 35. How do you read and understand an SQL execution plan?

### Answer

An **execution plan** shows how the database intends to execute a SQL query. Depending on the database and command, it can also show actual execution statistics.

It helps identify expensive scans, joins, sorts, filters, and other operations.

### Example query

```sql
EXPLAIN
SELECT employee_name, salary
FROM employees
WHERE department_id = 10;
```

The plan may indicate whether the database uses a table scan or an index-based access path.

### Common execution-plan operations

**1. Table scan or sequential scan**

The database reads table rows without using a conventional index lookup for the access path.

A scan is not always bad. It may be optimal when the table is small or when a large proportion of its rows must be returned.

**2. Index seek or index scan**

- An **index seek** in SQL Server seeks to a matching index range.
- An **index scan** traverses some or all of an index.

These terms are database-specific. An index scan can still be efficient, and a table scan can be appropriate for some workloads.

**3. Nested loop join**

The database iterates through rows from one input and looks for matching rows in the other input.

This can work well when the outer input is small and the inner side has an efficient access path.

**4. Hash join**

The database typically builds a hash table from one input and probes it with the other.

Hash joins can be effective for large equality joins, but they may consume memory and can spill to disk.

**5. Sort**

The database sorts rows, for example for `ORDER BY`, ranking functions, or merge joins.

Large sorts can be expensive, especially when they spill to disk.

**6. Aggregate**

The database calculates results such as `COUNT`, `SUM`, or `AVG`.

Depending on the query and plan, aggregation may use hashing, sorting, or another strategy.

### Example: PostgreSQL EXPLAIN

```sql
EXPLAIN
SELECT employee_name
FROM employees
WHERE department_id = 10;
```

A simplified plan might resemble:

```text
Index Scan using idx_employees_department on employees
  Index Cond: (department_id = 10)
```

This indicates that the plan uses the index to locate rows matching the department ID.

If the plan instead shows a sequential scan, that is not automatically a problem. The optimizer may estimate that reading most or all of the table is cheaper.

### EXPLAIN vs EXPLAIN ANALYZE

| Command | Purpose |
|---|---|
| `EXPLAIN` | Shows the estimated execution plan in supported databases |
| `EXPLAIN ANALYZE` | Executes the statement and reports actual execution information in supported databases |

For example, PostgreSQL supports:

```sql
EXPLAIN ANALYZE
SELECT employee_name
FROM employees
WHERE department_id = 10;
```

**Important:** Syntax and output vary by database. SQL Server commonly uses estimated or actual execution plans through its tooling, while MySQL supports `EXPLAIN ANALYZE` in supported versions.

### What should you check in a plan?

**1. Estimated vs actual rows**

Large differences may indicate inaccurate statistics or cardinality estimates.

**2. Access paths**

Check whether scans and index operations make sense for the expected number of rows.

**3. Join strategy**

Review nested loops, hash joins, and merge joins in the context of the input sizes and indexes.

**4. Sorts and spills**

Look for expensive sorting and operations spilling to disk because of memory pressure.

**5. Repeated operations**

A costly operation executed many times may dominate the query's runtime.

**6. Actual execution time and reads**

Where available, compare elapsed time, rows processed, logical reads, and physical reads.

### Important interview point: Cost is not execution time

Optimizer cost is an estimate used to compare plans. It is not necessarily milliseconds and should not be treated as actual elapsed time.

### Interview tip

Do not focus on one operation name alone. Read the entire plan, check estimated and actual row counts, identify the expensive operations, and verify your findings with measurements.

---

# Quick Revision Sheet

| Question | Key answer |
|---|---|
| What is an index? | A data structure that can accelerate data retrieval. |
| Clustered vs non-clustered | Table-data organization vs a separate index structure, depending on the database. |
| Index impact on writes | Index entries must be maintained during inserts, updates, and deletes. |
| Query optimization | Identify the bottleneck, inspect the plan, make targeted changes, and measure again. |
| Execution plan | Describes the operations used or intended to execute a query. |
| Table scan | Reads table rows; can be appropriate for small tables or broad queries. |
| Index seek | Locates a matching index range in systems using that terminology. |
| Nested loop join | Looks up matching rows for rows from another input. |
| Hash join | Uses a hash structure to match rows, commonly for equality joins. |
| EXPLAIN ANALYZE | Executes a query and reports actual statistics in supported databases. |

---

# Interview Practice Questions

Try answering these without looking at the solutions.

1. Why can adding an index make a SELECT query faster?
2. Why can too many indexes reduce write performance?
3. How would you optimize a query filtering by `department_id`?
4. Why might a database choose a table scan instead of an index?
5. What is the difference between a clustered and non-clustered index in SQL Server?
6. What is a composite index, and why does column order matter?
7. What is the difference between estimated and actual row counts in an execution plan?
8. What would you investigate if a query suddenly became slow?
9. Why might applying a function to an indexed column reduce index efficiency?
10. How would you optimize pagination for a large dataset?

## Sample solution: Composite index

```sql
CREATE INDEX idx_department_salary
ON employees(department_id, salary);
```

This index may help queries filtering by `department_id` and then by `salary`.

In a conventional B-tree composite index, the leftmost-prefix principle generally means the index is most directly useful for predicates beginning with `department_id`. The best index order depends on the query workload and database engine.

## Sample solution: Find employees by department and sort by salary

```sql
CREATE INDEX idx_department_salary
ON employees(department_id, salary DESC);

SELECT employee_id, employee_name, salary
FROM employees
WHERE department_id = 10
ORDER BY salary DESC
LIMIT 10;
```

The index may help with filtering and ordering, but the actual benefit should be verified using the execution plan and runtime.

---

# Final Interview Advice

For SQL performance questions, remember these five steps:

1. **Measure:** Identify the actual slow query.
2. **Explain:** Inspect the execution plan.
3. **Diagnose:** Find expensive scans, joins, sorts, or excessive row processing.
4. **Optimize:** Apply the smallest appropriate change.
5. **Verify:** Compare performance and confirm correctness.

The best answer in a senior-level interview is not simply “add an index.” Explain why the query is slow, what evidence supports your proposed change, and how you would verify the improvement.
# SQL Transactions and Isolation — Interview Questions & Answers

Easy theory, practical SQL examples, real-world scenarios, and interview tips.

---

## 36. What are transaction isolation levels, and when should you use them?

### Answer

A **transaction isolation level** controls how much one transaction can see the changes made by other concurrent transactions.

Isolation levels help balance data correctness, concurrency, and performance.

### Four standard isolation levels

| Isolation level | Dirty reads | Non-repeatable reads | Phantom reads |
|---|---|---|---|
| `READ UNCOMMITTED` | Possible | Possible | Possible |
| `READ COMMITTED` | Prevented | Possible | Possible |
| `REPEATABLE READ` | Prevented | Prevented | Possible under the SQL standard |
| `SERIALIZABLE` | Prevented | Prevented | Prevented |

These are the standard SQL isolation guarantees. Actual implementation and behavior can differ by database engine, especially when using MVCC (Multi-Version Concurrency Control).

### A. READ UNCOMMITTED

Allows a transaction to read changes that another transaction has not committed.

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

START TRANSACTION;

SELECT balance
FROM accounts
WHERE account_id = 1;

COMMIT;
```

**Use case:** Rarely appropriate for business-critical data. It may be considered for certain approximate, non-critical reads where the database supports it and dirty data is acceptable.

**Risk:** A transaction may read data that is later rolled back.

### B. READ COMMITTED

A transaction reads only committed data. A later read may see changes committed by another transaction.

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

START TRANSACTION;

SELECT balance
FROM accounts
WHERE account_id = 1;

COMMIT;
```

**Use case:** Common for general-purpose applications where dirty reads must be prevented and statement-level consistency is sufficient.

**Risk:** Reading the same row twice in one transaction may produce different values if another transaction commits an update between the reads.

### C. REPEATABLE READ

Ensures that a row read by a transaction remains consistent when read again within the transaction, according to the database's isolation implementation.

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

START TRANSACTION;

SELECT balance
FROM accounts
WHERE account_id = 1;

-- Other transaction may attempt to update the same row.

SELECT balance
FROM accounts
WHERE account_id = 1;

COMMIT;
```

**Use case:** Workflows that require repeated reads of existing rows to remain consistent.

**Important:** Phantom protection depends on the implementation. For example, MySQL InnoDB's default `REPEATABLE READ` uses MVCC and locking mechanisms with behavior that differs from a simple interpretation of the SQL standard.

### D. SERIALIZABLE

Provides the strongest standard isolation guarantee. Concurrent transactions behave as if they executed in a serial order.

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

START TRANSACTION;

SELECT SUM(balance)
FROM accounts;

COMMIT;
```

**Use case:** Critical operations where concurrent transactions must preserve strict consistency, such as certain inventory or financial workflows.

**Trade-off:** May reduce concurrency and cause blocking, transaction retries, or serialization failures.

### When should you use each level?

| Scenario | Possible choice |
|---|---|
| General application queries | `READ COMMITTED` |
| Repeated consistent reads | `REPEATABLE READ` |
| Strictly coordinated concurrent operations | `SERIALIZABLE` |
| Approximate reads where dirty data is acceptable | `READ UNCOMMITTED`, only when appropriate |

The right choice depends on the database engine, business requirements, and application workload.

### Interview tip

Higher isolation generally provides stronger guarantees, but may introduce more blocking or transaction conflicts. Choose the lowest level that safely satisfies the business requirement.

---

## 37. Explain dirty reads, non-repeatable reads, and phantom reads.

### Answer

These are anomalies that can occur when multiple transactions access or modify data concurrently.

Consider two transactions: **Transaction A** and **Transaction B**.

### A. Dirty read

A dirty read occurs when one transaction reads data written by another transaction that has not committed.

**Example**

Transaction A:

```sql
START TRANSACTION;

UPDATE accounts
SET balance = 5000
WHERE account_id = 1;

-- Transaction A has not committed yet.
```

Transaction B, under an isolation level that permits dirty reads:

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

START TRANSACTION;

SELECT balance
FROM accounts
WHERE account_id = 1;

COMMIT;
```

Suppose Transaction B reads `5000`.

If Transaction A later executes:

```sql
ROLLBACK;
```

The balance returns to its previous value. Transaction B has read a value that was never committed.

**Prevention:** Use an isolation level that prevents dirty reads, such as `READ COMMITTED` or stronger.

### B. Non-repeatable read

A non-repeatable read occurs when a transaction reads the same row twice and gets different values because another transaction committed an update between the reads.

**Example**

Transaction A:

```sql
START TRANSACTION;

SELECT balance
FROM accounts
WHERE account_id = 1;

-- Read balance: 1000
```

Transaction B:

```sql
UPDATE accounts
SET balance = 2000
WHERE account_id = 1;

COMMIT;
```

Transaction A reads the same row again:

```sql
SELECT balance
FROM accounts
WHERE account_id = 1;

COMMIT;
```

Under an isolation mode that allows this anomaly, Transaction A now reads `2000` instead of `1000`.

**Prevention:** Use `REPEATABLE READ` or `SERIALIZABLE`, or an appropriate snapshot-based isolation mode supported by the database.

### C. Phantom read

A phantom read occurs when repeating a query with the same search condition produces a different set of matching rows because another transaction inserts or deletes qualifying rows and commits.

**Example**

Transaction A:

```sql
START TRANSACTION;

SELECT *
FROM employees
WHERE salary > 50000;
```

Suppose the query returns 3 employees.

Transaction B:

```sql
INSERT INTO employees (
    employee_id,
    employee_name,
    salary
)
VALUES (101, 'Karan', 70000);

COMMIT;
```

Transaction A repeats the query:

```sql
SELECT *
FROM employees
WHERE salary > 50000;

COMMIT;
```

Under an isolation mode that permits phantom reads, the query may now return 4 employees.

**Prevention:** `SERIALIZABLE` provides the standard guarantee against phantom reads. Some database implementations also prevent them through range locks or snapshot-based mechanisms at other isolation levels.

### Quick comparison

| Anomaly | What changes? | Example |
|---|---|---|
| Dirty read | Another transaction's uncommitted data is read | Read a balance that is later rolled back |
| Non-repeatable read | The values of an existing row change between reads | Balance changes from 1000 to 2000 |
| Phantom read | The set of rows matching a condition changes | A new employee matches `salary > 50000` |

### Interview tip

Remember:

- Dirty read = uncommitted data.
- Non-repeatable read = same row, different values.
- Phantom read = same query, different set of rows.

---

## 38. How do locks work in an RDBMS?

### Answer

A **lock** is a concurrency-control mechanism used by a relational database management system (RDBMS) to coordinate access to data.

Locks help prevent conflicting operations from interfering with each other and help preserve data integrity.

### Common lock types

**1. Shared lock (S lock)**

Used for reading data in locking-based systems. Multiple transactions may hold compatible shared locks simultaneously.

**2. Exclusive lock (X lock)**

Used for modifying data. An exclusive lock generally prevents conflicting reads or writes that require incompatible locks.

**3. Update lock**

Some database systems, such as SQL Server, use update locks to reduce certain lock-conversion deadlocks.

**4. Intention locks**

Used by some database engines to indicate that a transaction intends to acquire locks at a lower level, such as rows within a table.

### Example: Updating an account balance

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 500
WHERE account_id = 1;

-- The database protects the modified row
-- according to its locking and concurrency rules.

COMMIT;
```

The database coordinates concurrent operations so that conflicting updates do not simply overwrite each other without proper concurrency control.

### Example: Explicitly lock a row

In MySQL InnoDB and PostgreSQL, a transaction can use `SELECT ... FOR UPDATE` to lock selected rows for a subsequent update.

```sql
START TRANSACTION;

SELECT balance
FROM accounts
WHERE account_id = 1
FOR UPDATE;

UPDATE accounts
SET balance = balance - 500
WHERE account_id = 1;

COMMIT;
```

This pattern is useful when application logic must read a row and then update it without allowing a conflicting transaction to modify that row first.

**Important:** Lock scope, supported syntax, and behavior vary by database. Use `FOR UPDATE` within a transaction and keep the transaction short.

### Lock granularity

| Lock granularity | Description |
|---|---|
| Row-level | Protects individual rows |
| Page-level | Protects a group of rows stored on a page |
| Table-level | Protects a whole table |
| Range or key-range | Protects a range of keys or records in supporting engines |

Finer-grained locks can allow more concurrency but may require additional lock-management overhead.

### What is lock contention?

Lock contention occurs when multiple transactions compete for incompatible locks on the same data.

For example, one transaction may need to wait because another transaction is holding a lock.

### What is lock escalation?

Some database engines can replace many fine-grained locks with a coarser lock, such as a table lock, to reduce lock-management overhead. This is called **lock escalation**.

It is not implemented identically in all databases.

### Interview tip

Locks help maintain consistency, but excessive locking or long transactions can cause blocking, lower throughput, and deadlocks.

---

## 39. What is a deadlock, and how can you handle deadlocks in SQL?

### Answer

A **deadlock** occurs when two or more transactions wait for resources held by one another, creating a cycle in which none can proceed.

The database usually detects the cycle and aborts one transaction so the others can continue.

### Example

Suppose two transactions update the same two accounts in opposite order.

Transaction A:

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE account_id = 1;

-- Transaction A now tries to update account 2.
UPDATE accounts
SET balance = balance + 100
WHERE account_id = 2;

COMMIT;
```

Transaction B:

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 200
WHERE account_id = 2;

-- Transaction B now tries to update account 1.
UPDATE accounts
SET balance = balance + 200
WHERE account_id = 1;

COMMIT;
```

A possible sequence:

1. Transaction A locks account 1.
2. Transaction B locks account 2.
3. Transaction A waits for account 2.
4. Transaction B waits for account 1.
5. Neither can continue, so the database detects a deadlock and aborts a victim transaction.

This is a possible execution sequence; whether a deadlock occurs depends on timing and the database's concurrency behavior.

### How to prevent deadlocks

**1. Access resources in a consistent order**

For example, always update the lower account ID before the higher account ID.

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE account_id = 2;

COMMIT;
```

All code paths that need both accounts should follow the same order.

**2. Keep transactions short**

Avoid unnecessary queries, user interaction, network calls, or lengthy processing while holding locks.

**3. Use appropriate indexes**

Indexes can reduce the number of rows examined and the time spent holding locks. Poor access paths may increase contention.

**4. Avoid unnecessary locking**

Lock only the rows required for the business operation.

**5. Handle deadlock errors**

Applications should be prepared to retry transactions aborted because of deadlocks.

### Example: Retry strategy in application code

The following is simplified JavaScript pseudocode:

```javascript
async function runWithRetry(operation, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const isRetryable = isDeadlockError(error);

      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      // In production, use a short backoff,
      // preferably with jitter.
      await delayWithBackoff(attempt);
    }
  }
}
```

Here, `isDeadlockError()` and `delayWithBackoff()` are application-specific helper functions that must be implemented for the chosen database driver.

**Important:** Retry the entire transaction from the beginning, not just the last failed statement. Ensure that external side effects are not repeated unintentionally.

### Deadlock vs blocking

| Feature | Deadlock | Blocking |
|---|---|---|
| Meaning | Transactions form a wait cycle | A transaction waits for another to release a resource |
| Resolution | Database usually aborts a victim transaction | Often resolves when the lock is released |
| Typical action | Fix access order and retry safely | Reduce lock duration and contention |

### Interview tip

A strong answer includes consistent lock ordering, short transactions, suitable indexes, deadlock monitoring, and safe retries.

---

## 40. What are SAVEPOINT and ROLLBACK strategies?

### Answer

A **SAVEPOINT** marks a point inside a transaction to which you can roll back without necessarily discarding the entire transaction.

`ROLLBACK` undoes uncommitted changes, either for the whole transaction or to a savepoint.

Savepoint support and exact syntax vary by database.

### Example: Using SAVEPOINT

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 500
WHERE account_id = 1;

SAVEPOINT after_debit;

UPDATE accounts
SET balance = balance + 500
WHERE account_id = 2;

-- Suppose the second operation needs to be undone.
ROLLBACK TO SAVEPOINT after_debit;

-- Continue with corrected operations if appropriate.

COMMIT;
```

### How it works

1. `START TRANSACTION` begins the transaction.
2. The first update deducts 500.
3. `SAVEPOINT after_debit` creates a rollback point.
4. The second update adds 500.
5. `ROLLBACK TO SAVEPOINT after_debit` undoes changes made after the savepoint.
6. `COMMIT` commits the remaining changes.

**Important:** This example is for illustrating savepoint behavior, not a complete money-transfer implementation. Committing after rolling back to `after_debit` would retain the debit without the credit. In a real transfer, you would normally roll back the entire transaction if the credit could not be completed.

### Example: Roll back the entire transaction

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 500
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 500
WHERE account_id = 2;

-- If the transfer fails:
ROLLBACK;
```

The database undoes the uncommitted changes made in this transaction, subject to the database's transaction semantics.

### Example: Roll back to a savepoint and continue

```sql
START TRANSACTION;

INSERT INTO orders (order_id, status)
VALUES (101, 'PENDING');

SAVEPOINT order_created;

INSERT INTO order_items (order_id, product_id, quantity)
VALUES (101, 10, 2);

-- Suppose the item insert must be undone.
ROLLBACK TO SAVEPOINT order_created;

-- Insert a corrected item.
INSERT INTO order_items (order_id, product_id, quantity)
VALUES (101, 20, 1);

COMMIT;
```

This demonstrates how a transaction can recover from a partial failure and continue with corrected operations.

The example assumes the referenced tables and columns exist and that the database supports these transaction and savepoint statements.

### Common transaction commands

| Command | Purpose |
|---|---|
| `START TRANSACTION` / `BEGIN` | Start a transaction |
| `COMMIT` | Make the transaction's changes permanent |
| `ROLLBACK` | Undo uncommitted transaction changes |
| `SAVEPOINT` | Create a named point within a transaction |
| `ROLLBACK TO SAVEPOINT` | Undo changes made after a savepoint |
| `RELEASE SAVEPOINT` | Remove a savepoint without rolling back to it, where supported |

### When should you use savepoints?

- Multi-step data processing.
- Batch operations where some work can be corrected.
- Complex transactions with recoverable intermediate steps.
- Workflows that need partial rollback without restarting everything.

### Important limitations

- Savepoints do not independently commit data.
- Rolling back to a savepoint does not normally end the whole transaction.
- Savepoint behavior and support vary by database.
- A transaction may still need a full rollback if an essential business operation fails.

### Interview tip

Use `COMMIT` when all required work succeeds. Use `ROLLBACK` when the entire operation must be undone. Use a savepoint when it is safe to undo only part of a transaction and continue.

---

# Quick Revision Sheet

| Question | Key answer |
|---|---|
| Isolation levels | Control how concurrent transactions interact and what they can observe. |
| Dirty read | Reading another transaction's uncommitted changes. |
| Non-repeatable read | Reading the same row twice and seeing different committed values. |
| Phantom read | Repeating a query and seeing a different set of qualifying rows. |
| Locks | Coordinate concurrent access and prevent conflicting operations. |
| Deadlock | Transactions wait on each other in a cycle. |
| Deadlock prevention | Consistent access order, short transactions, suitable indexes, safe retries. |
| SAVEPOINT | Marks a point inside a transaction for partial rollback. |
| ROLLBACK | Undoes uncommitted changes. |
| COMMIT | Commits the transaction's changes. |

---

# Interview Practice Questions

Try answering these without looking at the solutions.

1. What is the difference between `READ COMMITTED` and `REPEATABLE READ`?
2. Explain a dirty read with two concurrent transactions.
3. How does a phantom read differ from a non-repeatable read?
4. What is MVCC, and how does it differ from locking-based reads?
5. Why do deadlocks occur?
6. How can consistent lock ordering reduce deadlocks?
7. What is the difference between a deadlock and blocking?
8. Why should an application retry the entire transaction after a deadlock?
9. What is the difference between `ROLLBACK` and `ROLLBACK TO SAVEPOINT`?
10. When would you use `SERIALIZABLE` instead of `READ COMMITTED`?

## Sample answer: What is MVCC?

**MVCC (Multi-Version Concurrency Control)** allows a database to maintain multiple versions of a row so transactions can read an appropriate version without always blocking writers.

It can improve concurrency, but its exact behavior depends on the database engine and isolation level. MVCC does not eliminate every kind of lock or transaction conflict.

## Sample answer: How do you handle a deadlock in production?

1. Capture the database's deadlock report or diagnostic information.
2. Identify the transactions and resources involved.
3. Check whether they access resources in inconsistent orders.
4. Reduce transaction duration and examine relevant indexes.
5. Retry aborted transactions safely with bounded backoff.
6. Monitor deadlock frequency after deploying the fix.

---

# Final Interview Advice

For transaction questions, explain three things:

1. **Correctness:** What data anomalies must be prevented?
2. **Concurrency:** How will transactions interact, and what locking or versioning behavior applies?
3. **Recovery:** What happens if a transaction fails, blocks, or deadlocks?

For senior-level interviews, mention that isolation guarantees and lock behavior are database-specific. Always connect the chosen strategy to the business requirement, such as payments, inventory, or order processing.

# SQL Schema Design and Best Practices — Interview Questions & Answers

Easy theory, practical SQL examples, real-world scenarios, and interview tips for intermediate and senior-level interviews.

---

## 41. How do you design database tables and relationships?

### Answer

Database schema design is the process of organizing data into tables, columns, constraints, and relationships so that data remains consistent, queries are efficient, and the application is maintainable.

A good design generally follows these steps:

1. Identify the entities in the application.
2. Define the attributes for each entity.
3. Choose appropriate primary keys.
4. Identify relationships between entities.
5. Add foreign keys and constraints.
6. Normalize the schema to reduce unnecessary duplication.
7. Create indexes based on query patterns.
8. Review security, scalability, and data-retention requirements.

### Example: E-commerce database

Suppose we are building an application where customers can place orders containing multiple products.

We can identify four entities:

- Customers
- Orders
- Products
- Order items

### Step 1: Design the tables

```sql
CREATE TABLE customers (
    customer_id BIGINT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id BIGINT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) NOT NULL,
    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(12, 2) NOT NULL CHECK (unit_price >= 0),

    PRIMARY KEY (order_id, product_id),

    FOREIGN KEY (order_id)
        REFERENCES orders(order_id),

    FOREIGN KEY (product_id)
        REFERENCES products(product_id)
);
```

**Note:** Identity or auto-generated primary-key syntax differs by database. The example uses explicitly supplied IDs for portability.

### Step 2: Understand the relationships

| Relationship | Type | Explanation |
|---|---|---|
| Customers → Orders | One-to-many | One customer can place many orders. |
| Orders → Order items | One-to-many | One order can contain multiple products. |
| Products → Order items | One-to-many | A product can appear in many order items. |
| Orders ↔ Products | Many-to-many | Connected through `order_items`. |

### Step 3: Query the relationships

Find all orders placed by a customer:

```sql
SELECT
    o.order_id,
    o.order_date,
    o.status
FROM orders o
WHERE o.customer_id = 101;
```

Find products in an order:

```sql
SELECT
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM order_items oi
JOIN products p
    ON p.product_id = oi.product_id
WHERE oi.order_id = 5001;
```

### Best practices

- Use primary keys to identify records.
- Use foreign keys when database-enforced referential integrity is appropriate.
- Add `NOT NULL`, `UNIQUE`, and `CHECK` constraints where required.
- Use appropriate data types and avoid storing numbers as text.
- Normalize data before introducing deliberate denormalization.
- Add indexes based on real query patterns.
- Define how deleted records and historical data should be handled.

### Interview tip

Explain both the relationship and the reason behind it. For example, a many-to-many relationship requires a junction table because one order can contain many products and one product can belong to many orders.

---

## 42. When should you choose a composite key versus a surrogate key?

### Answer

A **composite key** uses two or more columns together to uniquely identify a record.

A **surrogate key** is an artificial identifier, such as an auto-generated integer or UUID, that has no business meaning.

### A. Composite key

Consider an `order_items` table. An order can contain multiple products.

```sql
CREATE TABLE order_items (
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,

    PRIMARY KEY (order_id, product_id)
);
```

Here, the combination of `order_id` and `product_id` identifies an order item.

Neither column alone is necessarily unique, but the pair is unique.

### B. Surrogate key

```sql
CREATE TABLE order_items (
    order_item_id BIGINT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,

    UNIQUE (order_id, product_id)
);
```

Now each order item has its own identifier, `order_item_id`.

The unique constraint preserves the business rule that a product appears at most once per order. If the application allows the same product to appear on multiple separate lines, the uniqueness rule would need to change.

### Comparison

| Feature | Composite key | Surrogate key |
|---|---|---|
| Meaning | Uses meaningful identifying columns | Uses an artificial identifier |
| Number of columns | Two or more | Usually one |
| Foreign-key references | May require multiple columns | Often requires one column |
| Business rules | Can directly enforce natural uniqueness | Usually needs separate unique constraints |
| Key stability | Depends on the underlying business values | Usually stable if generated independently |
| Common use | Junction tables and natural uniqueness rules | Orders, users, products, and many application entities |

### When should you choose a composite key?

Choose a composite key when:

- The combination naturally identifies the record.
- The key columns are stable.
- The relationship is simple and the composite key is manageable.
- The table represents a junction between entities.

Example: A student-course enrollment table might use `(student_id, course_id)` if a student can enroll in a course only once.

### When should you choose a surrogate key?

Choose a surrogate key when:

- You want a compact identifier for referencing records.
- Natural identifiers may change.
- Other tables frequently reference the record.
- The natural key contains several columns.
- The application needs a stable internal identity independent of business rules.

### Interview tip

A surrogate key does not replace business constraints. For example, adding `user_id` as a primary key does not automatically prevent duplicate email addresses. Use a separate unique constraint if email must be unique.

---

## 43. How do you handle schema changes in production?

### Answer

A schema change modifies the database structure, such as adding a column, creating an index, changing a data type, or removing a table.

In production, schema changes must be planned carefully to avoid downtime, data loss, application errors, and long-running locks.

### Common schema changes

- Add or remove a column.
- Change a column's data type.
- Add a constraint.
- Create or remove an index.
- Split a table.
- Rename a column.
- Migrate data between tables.

### Best practices

1. Use version-controlled database migrations.
2. Test migrations against realistic data volumes.
3. Understand whether the operation locks or rewrites the table.
4. Make backward-compatible changes where possible.
5. Deploy application and schema changes in a safe sequence.
6. Monitor errors, locks, latency, and database resource usage.
7. Prepare recovery and rollback procedures.

### Example: Add a new column safely

Suppose the `customers` table needs a `phone_number` column.

```sql
ALTER TABLE customers
ADD COLUMN phone_number VARCHAR(20);
```

Adding a nullable column is often a reasonable first step, but the operational impact depends on the database engine and table definition.

The existing application can usually continue working if it does not depend on the new column.

### The expand-and-contract deployment pattern

This is a common technique for safely changing schemas while old and new application versions may run at the same time.

**Phase 1: Expand**

Add the new column without immediately removing the old one.

```sql
ALTER TABLE customers
ADD COLUMN full_name VARCHAR(200);
```

**Phase 2: Deploy compatible application code**

Update the application to understand both the old and new schema. If required, temporarily write both columns.

**Phase 3: Backfill existing data**

```sql
UPDATE customers
SET full_name = CONCAT(first_name, ' ', last_name)
WHERE full_name IS NULL;
```

This is a simple illustration. For a large table, use controlled batches and monitor database load rather than assuming a single large update is safe.

**Phase 4: Switch reads**

Once the new column is populated and validated, update application reads to use `full_name`.

**Phase 5: Contract**

After confirming that old application versions and integrations no longer depend on the old columns, remove them in a separate deployment.

```sql
ALTER TABLE customers
DROP COLUMN first_name;
```

This final operation is only appropriate after all dependencies have been migrated and the data-retention requirements have been checked.

### What about changing a column's data type?

A direct type change may lock or rewrite a large table, depending on the database.

A safer approach for high-traffic systems may involve:

1. Adding a new column.
2. Backfilling data in batches.
3. Writing to both columns temporarily if necessary.
4. Validating consistency.
5. Switching application reads.
6. Removing the old column after the transition.

### How do you handle rollback?

- For an application release, roll back the application when safe.
- For a database migration, use a tested reverse migration where possible.
- For destructive or irreversible changes, consider backups, point-in-time recovery, or a forward-fix strategy.
- Do not assume that every DDL operation is transactional or can be rolled back in every database.

### Interview tip

Use versioned migrations, backward-compatible changes, staged data migration, monitoring, and a tested recovery plan. For large production tables, always assess locking, table rewrites, and deployment compatibility first.

---

## 44. How do you store audit trails and implement soft deletes?

### Answer

**Audit trails** record important changes to data, including who changed a record, what changed, and when.

**Soft deletes** mark records as deleted without physically removing them from the database.

They are useful for compliance, troubleshooting, recovery, and historical reporting.

### A. Audit trail

A simple audit table can store the entity, operation, user, timestamp, and changed values.

```sql
CREATE TABLE audit_logs (
    audit_id BIGINT PRIMARY KEY,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    action VARCHAR(20) NOT NULL,
    changed_by VARCHAR(100),
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    old_values TEXT,
    new_values TEXT
);
```

The `old_values` and `new_values` columns could contain JSON text, depending on the database and design.

### Example audit record

| audit_id | entity_name | entity_id | action | changed_by |
|---:|---|---|---|---|
| 1 | customers | 101 | UPDATE | admin_user |
| 2 | orders | 5001 | DELETE | support_user |

The audit record can be expanded to include correlation IDs, transaction references, or structured JSON values.

### How should audit logs be written?

For critical database changes, audit records should ideally be written in the same transaction as the business change, so the change and its audit record succeed or fail together.

```sql
START TRANSACTION;

UPDATE customers
SET email = 'new@example.com'
WHERE customer_id = 101;

INSERT INTO audit_logs (
    audit_id,
    entity_name,
    entity_id,
    action,
    changed_by,
    old_values,
    new_values
)
VALUES (
    1,
    'customers',
    '101',
    'UPDATE',
    'admin_user',
    '{"email":"old@example.com"}',
    '{"email":"new@example.com"}'
);

COMMIT;
```

This is an illustrative example. In production, use a reliable audit ID generator, obtain the old values safely, and ensure the audit data reflects the actual change. Triggers, stored procedures, or application-level auditing may be appropriate depending on the system.

### B. Soft deletes

A soft delete marks a row as deleted instead of physically removing it.

```sql
ALTER TABLE customers
ADD COLUMN deleted_at TIMESTAMP NULL;
```

To soft-delete a customer:

```sql
UPDATE customers
SET deleted_at = CURRENT_TIMESTAMP
WHERE customer_id = 101
  AND deleted_at IS NULL;
```

To retrieve only active customers:

```sql
SELECT customer_id, customer_name, email
FROM customers
WHERE deleted_at IS NULL;
```

To retrieve deleted customers:

```sql
SELECT customer_id, customer_name, email
FROM customers
WHERE deleted_at IS NOT NULL;
```

### Soft delete vs hard delete

| Feature | Soft delete | Hard delete |
|---|---|---|
| Physical row removal | No | Yes |
| Recovery | Often possible | Requires backups or another recovery mechanism |
| Query complexity | Must filter deleted rows | No deleted-row filter required |
| Storage | Deleted rows remain | Deleted rows can be removed |
| Audit/compliance | Useful but not sufficient by itself | May be required for data-erasure obligations |

### Important design considerations

- Ensure every relevant query filters out deleted rows.
- Decide whether deleted records should retain unique values such as email addresses.
- Consider how foreign keys and related records should behave.
- Define retention and permanent-deletion policies.
- Do not treat a soft delete as a replacement for audit logs.
- Restrict access to audit data and avoid logging passwords, secrets, or unnecessary sensitive information.

### Interview tip

Soft deletes support recovery and historical visibility, while audit trails record changes over time. They solve different problems and may be used together.

---

## 45. What are sharding, partitioning, and large-data strategies?

### Answer

**Partitioning** divides a large table or dataset into smaller logical or physical parts within a database system.

**Sharding** distributes data across multiple independent database instances or nodes.

Both techniques can help manage large datasets, but they solve different scaling problems.

### A. Partitioning

A table is split into partitions based on a partition key or rule.

Common strategies include:

- **Range partitioning:** Values fall within defined ranges, such as dates.
- **List partitioning:** Values belong to specified categories.
- **Hash partitioning:** A hash function distributes rows across partitions.

### Example: Range partitioning by month

The following is a PostgreSQL-style example.

```sql
CREATE TABLE sales (
    sale_id BIGINT NOT NULL,
    sale_date DATE NOT NULL,
    amount DECIMAL(12, 2) NOT NULL
) PARTITION BY RANGE (sale_date);

CREATE TABLE sales_2026_01
PARTITION OF sales
FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE sales_2026_02
PARTITION OF sales
FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
```

The range boundaries are inclusive at the start and exclusive at the end.

A query such as:

```sql
SELECT SUM(amount)
FROM sales
WHERE sale_date >= '2026-01-01'
  AND sale_date < '2026-02-01';
```

may benefit from partition pruning, which allows the database to skip partitions that cannot contain matching rows.

Partitioning is especially useful for large time-series tables, retention management, and queries that filter by the partition key.

### B. Sharding

Sharding distributes rows across multiple database nodes.

For example, a customer database might assign customers to shards using a hash of `customer_id`.

Conceptually:

```text
Customer ID
    |
    v
Hash(customer_id)
    |
    +----> Shard 1
    |
    +----> Shard 2
    |
    +----> Shard 3
```

This allows the system to distribute storage and query load across nodes.

The exact routing, rebalancing, and replication mechanisms depend on the architecture or database platform.

### Partitioning vs sharding

| Feature | Partitioning | Sharding |
|---|---|---|
| Distribution | Within a database system or table architecture | Across multiple database nodes or instances |
| Main goal | Manage large tables and improve suitable queries | Scale storage and workload horizontally |
| Application routing | Often handled by the database | May require a shard router or application logic |
| Cross-partition queries | Often handled by the database | Cross-shard queries can require distributed coordination |
| Complexity | Usually lower | Generally higher |
| Typical example | Sales partitioned by month | Customers distributed by customer ID |

### C. Other strategies for large datasets

**1. Indexing**

Create appropriate indexes for frequent filters, joins, and sorting operations.

**2. Archiving**

Move old or inactive data to lower-cost storage or archive tables according to retention requirements.

**3. Query optimization**

Use execution plans, selective filters, suitable joins, and efficient pagination.

**4. Caching**

Cache frequently requested results when stale data is acceptable and invalidation is handled correctly.

**5. Read replicas**

Offload suitable read traffic to replicas, accounting for replication lag and consistency requirements.

**6. Batch processing**

Process large updates or imports in controlled batches to reduce long transactions, lock duration, and resource spikes.

**7. Data warehouses**

Move analytical workloads to an analytical database or warehouse when operational queries should not compete with large reporting queries.

**8. Connection pooling**

Reuse database connections to reduce connection setup overhead and control concurrency.

### When should you use partitioning?

Consider partitioning when:

- A table contains very large volumes of data.
- Queries frequently filter on the partition key.
- Old data must be archived or removed efficiently.
- Partition pruning or partition-level maintenance can provide a measurable benefit.

### When should you use sharding?

Consider sharding when:

- A single database node cannot handle the required storage or throughput.
- Vertical scaling and other optimizations are insufficient.
- Data can be distributed using a suitable shard key.
- The team can manage routing, rebalancing, backups, monitoring, and distributed failure scenarios.

### Interview tip

Do not shard a database just because the table is large. First evaluate indexes, query plans, partitioning, caching, read replicas, archiving, and vertical scaling. Sharding adds operational complexity and should address a demonstrated scaling requirement.

---

# Quick Revision Sheet

| Question | Key answer |
|---|---|
| Database schema design | Define entities, relationships, keys, constraints, and indexes. |
| Composite key | Two or more columns together identify a record. |
| Surrogate key | Artificial identifier independent of business meaning. |
| Production schema changes | Use versioned migrations and backward-compatible deployment strategies. |
| Audit trail | Records who changed what and when. |
| Soft delete | Marks a record as deleted without immediately removing it. |
| Partitioning | Divides data into manageable partitions within a database architecture. |
| Sharding | Distributes data across database nodes or instances. |
| Read replicas | Offload suitable reads from the primary database. |
| Large-data optimization | Measure first, then apply indexing, query tuning, archiving, or scaling. |

---

# Interview Practice Questions

Try answering these without looking at the solutions.

1. How would you design tables for customers, orders, and products?
2. What is the difference between a composite key and a surrogate key?
3. How would you deploy a new non-null column in a high-traffic production database?
4. How do you ensure audit logs are consistent with business changes?
5. What is the difference between a soft delete and a hard delete?
6. How would you store millions of audit records efficiently?
7. What is partition pruning?
8. When would you choose partitioning instead of sharding?
9. What problems can arise from choosing a poor shard key?
10. How would you scale a database that is becoming slow as data grows?

## Sample answer: How would you scale a growing database?

1. Measure slow queries and resource bottlenecks.
2. Optimize SQL and create appropriate indexes.
3. Review data retention and archive old records.
4. Use partitioning when access patterns and maintenance requirements justify it.
5. Add caching or read replicas when suitable.
6. Consider sharding only when a single database node is insufficient and the workload can be distributed safely.

---

# Final Interview Advice

For schema-design questions, focus on three things:

1. **Data integrity:** Keys, constraints, relationships, and transactional correctness.
2. **Maintainability:** Clear schema design, versioned migrations, and safe data-retention policies.
3. **Scalability:** Query patterns, indexing, partitioning, archiving, and horizontal scaling when necessary.

A strong senior-level answer explains not only which design you would choose, but also the trade-offs, operational risks, and conditions under which you would change that design.


# SQL Interview Preparation — Scenario and Practical Problems (Q46–50)

These are commonly asked SQL interview questions for mid-level and senior developers. Each solution includes the SQL query, an explanation, and important interview points.

**Note:** Examples use MySQL 8.0+ syntax unless mentioned otherwise.

---

## Q46. How do you retrieve the Nth highest salary (3rd, 5th, etc.)?

### Approach 1: Using `DENSE_RANK()` — Recommended

**Question:** Find the third-highest distinct salary from the `employees` table.

**Table: `employees`**

| id | name | salary |
|---:|---|---:|
| 1 | Amit | 90000 |
| 2 | Priya | 80000 |
| 3 | Rahul | 80000 |
| 4 | Neha | 70000 |
| 5 | John | 60000 |

**Query:**

```sql
WITH ranked_salaries AS (
    SELECT
        id,
        name,
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
)
SELECT id, name, salary
FROM ranked_salaries
WHERE salary_rank = 3;
```

**Output:**

| id | name | salary |
|---:|---|---:|
| 4 | Neha | 70000 |

**Explanation:**

1. `ORDER BY salary DESC` sorts salaries from highest to lowest.
2. `DENSE_RANK()` assigns the same rank to employees with the same salary.
3. `WHERE salary_rank = 3` returns everyone earning the third-highest distinct salary.

To find the fifth-highest distinct salary, change `3` to `5`.

### Approach 2: Using `LIMIT` and `OFFSET`

```sql
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2;
```

**Explanation:**

- `OFFSET 2` skips the first two distinct salaries.
- `LIMIT 1` returns the next salary.
- This returns only the salary, not the employee details.

For the fifth-highest distinct salary:

```sql
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 4;
```

### Approach 3: Using a subquery

```sql
SELECT MAX(salary) AS third_highest_salary
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
    WHERE salary < (
        SELECT MAX(salary)
        FROM employees
    )
);
```

This approach is less flexible for arbitrary N because the nested subqueries must be extended.

### `ROW_NUMBER()` vs `RANK()` vs `DENSE_RANK()`

Suppose salaries are `90000, 80000, 80000, 70000`.

| Salary | `ROW_NUMBER()` | `RANK()` | `DENSE_RANK()` |
|---:|---:|---:|---:|
| 90000 | 1 | 1 | 1 |
| 80000 | 2 | 2 | 2 |
| 80000 | 3 | 2 | 2 |
| 70000 | 4 | 4 | 3 |

- `ROW_NUMBER()` gives every row a unique number.
- `RANK()` gives tied values the same rank and leaves gaps.
- `DENSE_RANK()` gives tied values the same rank without gaps.

**Interview tip:** Clarify whether the interviewer wants the Nth row or the Nth distinct salary. Use `DENSE_RANK()` for the Nth distinct salary.

---

## Q47. How do you find missing IDs in a sequence?

Suppose the `employees` table contains these IDs:

| id |
|---:|
| 1 |
| 2 |
| 3 |
| 5 |
| 7 |
| 8 |
| 10 |

The missing IDs between 1 and 10 are `4, 6, 9`.

### Approach 1: Using a recursive CTE

This approach works in MySQL 8.0+.

```sql
WITH RECURSIVE number_sequence AS (
    SELECT 1 AS id

    UNION ALL

    SELECT id + 1
    FROM number_sequence
    WHERE id < 10
)
SELECT ns.id AS missing_id
FROM number_sequence ns
LEFT JOIN employees e
    ON e.id = ns.id
WHERE e.id IS NULL
ORDER BY ns.id;
```

**Output:**

| missing_id |
|---:|
| 4 |
| 6 |
| 9 |

**Explanation:**

1. The recursive CTE generates every number from 1 through 10.
2. The `LEFT JOIN` checks which numbers exist in `employees`.
3. `WHERE e.id IS NULL` returns numbers that do not exist in the table.

To change the range, update the starting value and upper limit.

### Approach 2: Using a numbers table

In production systems, a permanent numbers or calendar table can be more efficient than generating a sequence for every query.

Assume `numbers` contains every integer in the required range.

```sql
SELECT n.id AS missing_id
FROM numbers n
LEFT JOIN employees e
    ON e.id = n.id
WHERE n.id BETWEEN 1 AND 10
  AND e.id IS NULL
ORDER BY n.id;
```

### Approach 3: Find gaps between existing IDs

If you only need to identify gaps between consecutive existing IDs, use `LEAD()`:

```sql
WITH id_gaps AS (
    SELECT
        id,
        LEAD(id) OVER (ORDER BY id) AS next_id
    FROM employees
)
SELECT
    id + 1 AS gap_start,
    next_id - 1 AS gap_end
FROM id_gaps
WHERE next_id > id + 1;
```

For the example, the gaps are:

| gap_start | gap_end |
|---:|---:|
| 4 | 4 |
| 6 | 6 |
| 9 | 9 |

This query identifies ranges of missing IDs, rather than generating every missing ID individually. It does not include gaps before the first ID or after the last ID unless the boundary values are supplied separately.

**Interview tip:** Auto-increment IDs are not guaranteed to be continuous. Gaps can occur because of rolled-back transactions, deleted rows, or failed inserts. Missing IDs do not necessarily indicate a problem.

---

## Q48. How do you find employees earning above the average salary?

**Question:** Return employees whose salary is greater than the average salary of all employees.

### Approach 1: Using a subquery

```sql
SELECT
    id,
    name,
    salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

**Explanation:**

1. The inner query calculates the average salary.
2. The outer query returns employees earning more than that average.

For the sample salaries `90000, 80000, 80000, 70000, 60000`, the average is `76000`.

**Output:**

| id | name | salary |
|---:|---|---:|
| 1 | Amit | 90000 |
| 2 | Priya | 80000 |
| 3 | Rahul | 80000 |

### Approach 2: Using a CTE

```sql
WITH average_salary AS (
    SELECT AVG(salary) AS avg_salary
    FROM employees
)
SELECT
    e.id,
    e.name,
    e.salary
FROM employees e
CROSS JOIN average_salary a
WHERE e.salary > a.avg_salary;
```

This calculates the average once in the CTE and makes the query's intent explicit.

### Follow-up: Find employees earning above their department's average

**Table:** `employees(id, name, salary, department_id)`

```sql
SELECT
    e.id,
    e.name,
    e.salary,
    e.department_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e.department_id
);
```

This is a **correlated subquery** because the inner query references the current employee's `department_id`.

An alternative using a window function:

```sql
WITH department_salaries AS (
    SELECT
        id,
        name,
        salary,
        department_id,
        AVG(salary) OVER (
            PARTITION BY department_id
        ) AS department_avg_salary
    FROM employees
)
SELECT id, name, salary, department_id
FROM department_salaries
WHERE salary > department_avg_salary;
```

**Interview tip:** Use `AVG()` for the relevant population. If the question says "above department average," comparing against the overall company average is incorrect. `AVG()` ignores `NULL` salary values.

---

## Q49. How do you implement pagination for large tables?

Pagination returns a subset of rows at a time instead of retrieving the entire table.

### Approach 1: Using `LIMIT` and `OFFSET`

```sql
SELECT id, name, salary
FROM employees
ORDER BY id
LIMIT 10 OFFSET 20;
```

This returns 10 rows after skipping the first 20 rows — typically page 3 when each page contains 10 rows.

**General formula:**

```text
OFFSET = (page_number - 1) * page_size
```

For example, page 5 with 20 rows per page:

```sql
SELECT id, name, salary
FROM employees
ORDER BY id
LIMIT 20 OFFSET 80;
```

**Advantages:**
- Simple to implement.
- Works well for small or moderately sized result sets.
- Supports jumping to a particular page.

**Disadvantages:**
- Large offsets can become slow because the database may need to scan and discard many rows.
- Concurrent inserts or deletes can cause rows to shift between pages.

Always use a deterministic `ORDER BY`. Ideally, include a unique column to break ties.

### Approach 2: Keyset pagination — Better for large tables

Instead of skipping rows, request rows after the last ID from the previous page.

**First page:**

```sql
SELECT id, name, salary
FROM employees
ORDER BY id
LIMIT 10;
```

Suppose the last ID returned is `10`.

**Next page:**

```sql
SELECT id, name, salary
FROM employees
WHERE id > 10
ORDER BY id
LIMIT 10;
```

**Why is this useful?**

- It avoids scanning and discarding a large offset.
- It works well when the ordering column is indexed.
- It is suitable for infinite scrolling and large feeds.

For a descending order, the cursor condition changes accordingly:

```sql
SELECT id, name, salary
FROM employees
WHERE id < 100
ORDER BY id DESC
LIMIT 10;
```

Here, `100` is the last ID from the previous page.

### What if the ordering column is not unique?

Suppose employees are sorted by salary descending. Multiple employees can have the same salary. Use a unique tie-breaker such as `id`.

```sql
SELECT id, name, salary
FROM employees
WHERE salary < 80000
   OR (salary = 80000 AND id > 25)
ORDER BY salary DESC, id ASC
LIMIT 10;
```

Here, the cursor is `(salary = 80000, id = 25)`. The next page includes lower salaries or employees with the same salary and a greater ID.

### Performance best practices

1. Add an appropriate index for the filtering and ordering columns.
2. Use keyset pagination for deep navigation through large datasets.
3. Return only required columns instead of using `SELECT *`.
4. Use a unique tie-breaker in the sort order.
5. Consider the consistency requirements when rows are inserted or deleted between requests.

**Interview tip:** `LIMIT/OFFSET` is simple and supports direct page jumps; keyset pagination is generally better for deep pages. Neither automatically guarantees a consistent snapshot across multiple requests.

---

## Q50. How do you find duplicate email entries?

**Question:** Find email addresses that appear more than once in the `users` table.

### Approach 1: Using `GROUP BY` and `HAVING`

```sql
SELECT
    email,
    COUNT(*) AS occurrence_count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

**Explanation:**

1. `GROUP BY email` groups rows with the same email.
2. `COUNT(*)` counts rows in each group.
3. `HAVING COUNT(*) > 1` returns only groups containing duplicates.

Example output:

| email | occurrence_count |
|---|---:|
| amit@example.com | 2 |
| priya@example.com | 3 |

### Approach 2: Retrieve all rows with duplicate emails

```sql
SELECT *
FROM users
WHERE email IN (
    SELECT email
    FROM users
    WHERE email IS NOT NULL
    GROUP BY email
    HAVING COUNT(*) > 1
)
ORDER BY email;
```

This returns the complete user records for email addresses that occur more than once. The `IS NOT NULL` condition prevents null email values from being treated as duplicate addresses in this query.

### Approach 3: Using a window function

```sql
WITH duplicate_users AS (
    SELECT
        id,
        name,
        email,
        COUNT(*) OVER (
            PARTITION BY email
        ) AS email_count
    FROM users
    WHERE email IS NOT NULL
)
SELECT id, name, email, email_count
FROM duplicate_users
WHERE email_count > 1;
```

This keeps each matching row and adds the number of occurrences alongside it.

### Follow-up: Delete duplicate rows while keeping one

**Warning:** First inspect the duplicate rows and back up the data. The following example assumes `id` is a unique primary key and keeps the row with the smallest ID for each non-NULL email.

```sql
WITH ranked_users AS (
    SELECT
        id,
        email,
        ROW_NUMBER() OVER (
            PARTITION BY email
            ORDER BY id
        ) AS row_num
    FROM users
    WHERE email IS NOT NULL
)
DELETE FROM users
WHERE id IN (
    SELECT id
    FROM ranked_users
    WHERE row_num > 1
);
```

Check your MySQL version and test the deletion in a transaction or staging environment before running it in production.

### Prevent future duplicates

If every non-NULL email must be unique, first clean existing duplicates and then create a unique index:

```sql
CREATE UNIQUE INDEX uq_users_email
ON users (email);
```

In MySQL, a unique index permits multiple `NULL` values. If email addresses should be case-insensitive, confirm the column's collation and normalize addresses according to the application's rules before enforcing uniqueness.

**Interview tip:** Use `GROUP BY ... HAVING COUNT(*) > 1` to identify duplicate values. Use a window function when you need to inspect or rank individual duplicate rows.

---

## Quick Revision Sheet

| Problem | Recommended solution | Key concept |
|---|---|---|
| Nth highest salary | `DENSE_RANK()` | Window functions |
| Missing IDs | Recursive CTE + `LEFT JOIN` | Sequence generation |
| Above-average salary | Subquery with `AVG()` | Aggregate subqueries |
| Pagination | Keyset pagination for deep pages | Indexing and cursors |
| Duplicate emails | `GROUP BY` + `HAVING` | Aggregation |

## Practice Questions

Try solving these without looking at the answers above:

1. Find the second-highest distinct salary in each department.
2. Find all missing IDs between 100 and 200.
3. Find employees whose salary is greater than their department's average but lower than the company's maximum salary.
4. Implement keyset pagination ordered by `created_at DESC, id DESC`.
5. Identify duplicate emails after ignoring leading/trailing spaces and differences in letter case.

**Senior-level interview reminder:** Explain not only how the query works, but also how ties, `NULL` values, indexes, large datasets, and concurrent changes affect the result.

# SQL Interview Preparation — Scenario-Based Questions (Q51–58)

These questions test real-world database design, production experience, data consistency, security, migrations, and performance optimization. The answers below use practical examples suitable for senior software developer and tech lead interviews.

---

## Q51. How do you design a database for an e-commerce application?

### Interview answer

I would start by identifying the core business entities, their relationships, and the most common access patterns. I would use a relational database such as MySQL or PostgreSQL for transactional data because e-commerce requires reliable transactions and referential integrity.

I would separate customers, products, inventory, orders, order items, payments, and shipments into appropriately normalized tables. I would also define primary keys, foreign keys, unique constraints, and indexes based on query patterns.

### Example database design

**Core tables:**

| Table | Purpose |
|---|---|
| `users` | Customer accounts and profile information |
| `addresses` | Customer shipping and billing addresses |
| `products` | Product details, names, descriptions, and prices |
| `categories` | Product categories |
| `product_categories` | Many-to-many product/category mapping |
| `inventory` | Available stock and reserved quantities |
| `orders` | Order-level information and status |
| `order_items` | Products, quantities, and prices for each order |
| `payments` | Payment transaction references and status |
| `shipments` | Shipment details and delivery status |

### Example SQL schema

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    total_amount DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Important design decisions

**1. Store historical prices in order items.**

Do not depend on the current product price when displaying an old order. Store `unit_price` at the time of purchase.

**2. Prevent overselling.**

Use atomic inventory updates and transactions. For example:

```sql
UPDATE inventory
SET available_quantity = available_quantity - 1
WHERE product_id = 101
  AND available_quantity >= 1;
```

Check the affected row count. If it is zero, the stock was unavailable or insufficient. Execute this as part of the appropriate transaction and reservation workflow.

**3. Add indexes based on query patterns.**

```sql
CREATE INDEX idx_orders_user_created
ON orders (user_id, created_at);

CREATE INDEX idx_order_items_order
ON order_items (order_id);
```

**4. Make order creation reliable.**

Create the order and its order items in a transaction. Payment processing usually involves an external provider, so it should be coordinated with an idempotent payment workflow rather than assuming a database transaction can roll back an external payment.

**5. Plan for scale.**

- Use caching for frequently accessed product data.
- Use pagination for product listings and order history.
- Consider read replicas for read-heavy workloads.
- Consider partitioning or archival when table size and workload justify it.
- Avoid premature microservices and sharding.

**Interview tip:** Explain the entities, relationships, constraints, transaction boundaries, and scaling strategy—not just the table definitions.

---

## Q52. How do you ensure data consistency across multiple services?

### Interview answer

When multiple services own separate databases, I avoid relying on a distributed database transaction for every business operation. Instead, I use local ACID transactions, asynchronous events, idempotent consumers, retries, and the Saga pattern when a workflow spans multiple services.

For example, an order service may create an order while the payment service processes payment and the inventory service reserves stock.

### Example: E-commerce order flow

<box> </box>

```text
Customer places order
        |
        v
   Order Service
   Create PENDING order
        |
        v
 Publish OrderCreated event
        |
        +------------------+
        |                  |
        v                  v
 Inventory Service    Payment Service
 Reserve stock        Process payment
        |                  |
        +---------+--------+
                  |
                  v
       Order status updated
        |
        +--------------------+
        |                    |
        v                    v
   CONFIRMED             FAILED
```

This is a simplified conceptual flow. In production, the services need explicit rules for handling partial failures and coordinating the final state.

### Techniques I would use

**1. Database transactions**

Use transactions for operations within a single database.

```sql
START TRANSACTION;

INSERT INTO orders (user_id, status, total_amount)
VALUES (10, 'PENDING', 1500.00);

-- Insert order_items here.

COMMIT;
```

If an operation fails, roll back the transaction.

**2. Transactional Outbox Pattern**

A common problem occurs when a service commits a database change but fails before publishing the corresponding event.

The outbox pattern solves this by saving the business change and event in the same database transaction.

```sql
START TRANSACTION;

INSERT INTO orders (user_id, status, total_amount)
VALUES (10, 'PENDING', 1500.00);

INSERT INTO outbox_events (
    event_type,
    payload,
    status
)
VALUES (
    'OrderCreated',
    '{"orderId": 123}',
    'PENDING'
);

COMMIT;
```

A separate publisher reads the outbox and sends events to a message broker. The publisher must handle retries and mark events as published safely.

**3. Idempotency**

Message brokers can deliver events more than once. Consumers should safely handle duplicates, for example by recording processed event IDs in a table with a unique constraint.

**4. Saga pattern**

If a workflow spans multiple services, define compensating actions. If payment succeeds but stock reservation ultimately fails, the workflow may need to refund or void the payment.

**5. Eventual consistency**

Some views may update asynchronously. Design the UI and business rules to tolerate temporary delays, while ensuring critical operations enforce their invariants.

**Interview tip:** Say that exactly-once processing across independent services is difficult to guarantee end-to-end. In practice, use at-least-once delivery, idempotency, durable events, retries, and reconciliation.

---

## Q53. How do you handle database migrations?

### Interview answer

I manage database migrations through version-controlled migration files and an automated deployment process. Each migration should be reviewed, tested against realistic data, and designed to be repeatable in the deployment workflow without unexpectedly destroying production data.

I use tools such as Prisma Migrate, Flyway, Liquibase, or a framework's migration system, depending on the technology stack.

### Example: Adding a new column

Suppose the `users` table needs a `phone_number` column.

**Migration file:**

```sql
ALTER TABLE users
ADD COLUMN phone_number VARCHAR(20) NULL;
```

This is a relatively safe first step because existing rows can retain `NULL`.

### Migration workflow

1. Create a versioned migration.
2. Review the SQL and expected operational impact.
3. Test on a development database.
4. Test against production-like data volume and indexes.
5. Take or verify recoverable backups where appropriate.
6. Deploy using a controlled release process.
7. Verify the migration and application behavior.
8. Monitor errors, query latency, and database load.

### What if a migration fails?

- Determine whether the migration was partially applied.
- Check the migration tool's recorded status.
- Inspect the actual database schema.
- Restore consistency before retrying or applying a corrective migration.
- Avoid blindly rerunning destructive SQL.
- Use a tested recovery or forward-fix strategy.

### Rollback considerations

Not every migration can be safely reversed. For example, dropping a populated column loses data. A migration tool's rollback command does not automatically guarantee that data can be restored.

For destructive changes, I prefer preserving data and using a staged migration process.

**Interview tip:** A migration is not just SQL. It includes deployment ordering, backward compatibility, data transformation, failure recovery, and monitoring.

---

## Q54. How do you store passwords securely in a database?

### Interview answer

I never store plaintext passwords or reversibly encrypted passwords for ordinary user authentication. I use a dedicated password-hashing algorithm such as Argon2id, scrypt, or bcrypt, with an appropriate work factor. The application stores the resulting encoded password hash and verifies it during login.

Passwords should be hashed using a trusted library, not a custom algorithm or a general-purpose fast hash such as MD5 or plain SHA-256.

### Example using Node.js and bcrypt

Install the library:

```bash
npm install bcrypt
```

**Register a user:**

```javascript
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 12;

  return bcrypt.hash(password, saltRounds);
}
```

Save the returned hash in the database:

```sql
INSERT INTO users (email, password_hash)
VALUES ('user@example.com', '<encoded-password-hash>');
```

The hash shown here is a placeholder; the application must save the actual output of `bcrypt.hash()`.

**Verify a password during login:**

```javascript
async function verifyPassword(password, storedHash) {
  return bcrypt.compare(password, storedHash);
}
```

Example:

```javascript
const isValid = await verifyPassword(
  submittedPassword,
  user.password_hash
);

if (!isValid) {
  throw new Error("Invalid email or password");
}
```

### Additional security practices

- Use Argon2id or another well-maintained password-hashing implementation with parameters appropriate for the deployment.
- Use unique salts; bcrypt and Argon2 libraries handle salt generation.
- Rate-limit login attempts and protect against credential stuffing.
- Use generic authentication error messages to reduce account enumeration.
- Use HTTPS for credentials in transit.
- Never log passwords or include them in analytics events.
- Keep database credentials and secrets in a secrets manager or secure environment configuration.
- Use secure session handling and multi-factor authentication where appropriate.
- Support password resets using short-lived, single-use tokens.

**Interview tip:** Encryption is reversible with the key, while password hashing is designed for verification without recovering the original password. Password hashing should be deliberately expensive to slow offline guessing attacks.

---

## Q55. How do you manage schema changes in production?

### Interview answer

I use a backward-compatible, staged deployment strategy so that old and new application versions can operate safely during a rolling deployment. I avoid combining a schema-breaking change with an application release that immediately depends on the new schema.

A common approach is called **expand and contract**.

### Example: Renaming `full_name` to `display_name`

Directly renaming the column may break older application instances that still query `full_name`.

Instead, I use staged changes.

### Phase 1: Expand

Add the new column without removing the old one.

```sql
ALTER TABLE users
ADD COLUMN display_name VARCHAR(150) NULL;
```

### Phase 2: Deploy compatible application code

Update the application to support the new column while keeping compatibility with the old schema.

During the transition, the application can write both columns or use a controlled backfill strategy. If both columns are written, define how conflicts are resolved.

### Phase 3: Backfill existing data

```sql
UPDATE users
SET display_name = full_name
WHERE display_name IS NULL;
```

For a large production table, perform this in controlled batches instead of one large update, and monitor locks, replication lag, and database load.

### Phase 4: Switch reads

Move application reads to `display_name`. Verify that no older application instances or background jobs still depend on `full_name`.

### Phase 5: Contract

After compatibility has been verified and the rollback window has passed, remove the old column in a separate deployment.

```sql
ALTER TABLE users
DROP COLUMN full_name;
```

This final step is destructive and should only happen after dependencies and recovery requirements have been checked.

### Production safety checklist

- Test migration duration and locking behavior.
- Ensure old and new application versions remain compatible.
- Backfill data in manageable batches.
- Monitor application errors, database load, and replication lag.
- Avoid destructive changes until all consumers have migrated.
- Have a recovery plan for each stage.

**Interview tip:** The key principle is to separate schema expansion, application migration, and destructive cleanup into distinct stages.

---

## Q56. What will you do if a column needs to be added without downtime?

### Interview answer

First, I would determine the table size, database engine, existing workload, and whether the new column needs a default or must be populated immediately. Then I would choose a schema change that is compatible with the running application and verify its locking behavior.

Adding a nullable column is often simpler than adding a populated, indexed, or constrained column, but the exact operational impact depends on the database version and table structure.

### Scenario: Add a nullable column

```sql
ALTER TABLE orders
ADD COLUMN tracking_number VARCHAR(100) NULL;
```

Before production deployment, I would verify whether the specific database version can perform this operation online or instantly and whether it could still require a metadata lock.

### Scenario: The column must be populated

Suppose every order eventually needs a `shipping_status`.

**Step 1: Add the column as nullable.**

```sql
ALTER TABLE orders
ADD COLUMN shipping_status VARCHAR(30) NULL;
```

**Step 2: Deploy application code that understands the new column.**

The application should handle both populated and missing values during the transition.

**Step 3: Backfill existing records in batches.**

```sql
UPDATE orders
SET shipping_status = 'PENDING'
WHERE shipping_status IS NULL
LIMIT 1000;
```

Repeat the batch operation until all eligible rows are updated. In production, use an appropriate batch loop and monitor progress, locking, and database load.

**Step 4: Verify completeness.**

```sql
SELECT COUNT(*) AS remaining_rows
FROM orders
WHERE shipping_status IS NULL;
```

If `NULL` is not allowed for any row, the count should be zero before proceeding.

**Step 5: Enforce the final constraint.**

After validating the data, add the `NOT NULL` constraint using the database's supported online procedure.

### Important considerations

- Avoid adding a default that triggers an expensive table rewrite on a database version where that behavior applies.
- Check database-specific online DDL capabilities.
- Consider tools such as `gh-ost` or `pt-online-schema-change` for certain MySQL schema changes on large tables, after assessing their limitations.
- Set appropriate timeouts and monitor metadata locks.
- Test with production-like table sizes.

**Interview tip:** Never promise that an `ALTER TABLE` operation is always online. Explain how you validate the specific engine/version and prepare for locking, replication, and application compatibility.

---

## Q57. How do you archive old data?

### Interview answer

I first identify the retention requirements, regulatory constraints, and query patterns. Then I decide whether to archive records to a separate database/table, move them to lower-cost object storage, or use partitioning to simplify retention.

I ensure that archived data can be retrieved when needed and that the archive process does not disrupt production workloads.

### Approach 1: Archive to a separate table

Suppose completed orders older than two years must be archived.

A basic example:

```sql
CREATE TABLE orders_archive LIKE orders;
```

Copy a limited batch:

```sql
INSERT INTO orders_archive
SELECT *
FROM orders
WHERE status = 'COMPLETED'
  AND created_at < '2024-01-01'
ORDER BY id
LIMIT 1000;
```

**Important:** `CREATE TABLE ... LIKE` copies the table definition and indexes in MySQL, but it does not automatically copy foreign key definitions. Verify constraints, indexes, and other schema requirements separately.

Before deleting the original rows, verify that the copied records match and that any dependent records are handled correctly.

For a production process, use a stable batch boundary or primary-key cursor to avoid repeatedly selecting the same rows. Make the archive operation restartable and idempotent.

### Approach 2: Partitioning

Partitioning can make retention easier when data is naturally organized by a field such as `created_at`.

For example, a large event table might be partitioned by month. Old partitions can sometimes be dropped or detached much more efficiently than deleting millions of individual rows.

Partitioning is not the same as archiving: dropping a partition deletes its data unless it has been safely preserved elsewhere.

### Approach 3: Object storage

For records rarely accessed by the application, export data to durable object storage in a format such as Parquet or compressed JSON/CSV, depending on the analytics and retrieval requirements.

Maintain metadata, integrity checks, encryption, access controls, and a documented restore procedure.

### Production checklist

1. Define the cutoff date and retention policy.
2. Identify foreign key dependencies and related records.
3. Copy or export records in batches.
4. Verify counts and, where appropriate, checksums.
5. Confirm the archive is readable and recoverable.
6. Delete source records only after verification and authorization.
7. Monitor database load, replication lag, and storage usage.

**Interview tip:** Archiving must preserve data integrity and support recovery. Do not simply delete old rows without considering dependencies, retention requirements, and audit obligations.

---

## Q58. How do you handle reporting queries on a production database?

### Interview answer

I try to isolate analytical workloads from latency-sensitive transactional workloads. Reporting queries can scan large tables, perform expensive joins, and consume CPU, memory, and I/O, potentially affecting customer-facing operations.

My first steps are to inspect the query plan, identify the largest scans and joins, add appropriate indexes where justified, and avoid unnecessary columns or repeated calculations. If the workload remains heavy, I move reporting to a read replica, reporting database, or data warehouse.

### Approach 1: Optimize the query

Instead of:

```sql
SELECT *
FROM orders
WHERE YEAR(created_at) = 2026;
```

Use a date range:

```sql
SELECT id, user_id, total_amount, created_at
FROM orders
WHERE created_at >= '2026-01-01'
  AND created_at < '2027-01-01';
```

The range condition can make an index on `created_at` usable more readily than applying a function to the column.

Validate with the actual execution plan:

```sql
EXPLAIN
SELECT id, user_id, total_amount, created_at
FROM orders
WHERE created_at >= '2026-01-01'
  AND created_at < '2027-01-01';
```

For MySQL, `EXPLAIN ANALYZE` can provide actual execution information when supported, but it executes the query. Use it carefully on expensive production workloads.

### Approach 2: Use a read replica

Route suitable reporting queries to a read replica to reduce load on the primary database.

However, replicas may lag behind the primary. Reports that require the most recent committed data need an explicit consistency strategy.

### Approach 3: Use a reporting database or data warehouse

For large historical reports, business intelligence, or complex aggregations, replicate or export the required data to a separate analytical system.

Benefits include:

- Less interference with transactional traffic.
- Better support for large scans and analytical joins.
- Easier retention of historical data.
- More predictable reporting performance.

### Approach 4: Use pre-aggregated data

For dashboards that repeatedly calculate daily revenue, maintain a summary table or materialized view where supported.

Example:

```sql
SELECT
    DATE(created_at) AS order_date,
    COUNT(*) AS total_orders,
    SUM(total_amount) AS revenue
FROM orders
WHERE status = 'COMPLETED'
GROUP BY DATE(created_at);
```

For a large dataset, repeatedly running this query against the entire orders table may be expensive. A scheduled aggregation or incremental summary table may be more appropriate.

### Production best practices

- Review execution plans and query latency.
- Index filtering, join, and ordering columns appropriately.
- Avoid unbounded queries and unnecessary `SELECT *`.
- Use replicas or analytical systems for heavy workloads.
- Run reports asynchronously when they are expensive.
- Apply query timeouts, concurrency limits, and resource controls where available.
- Monitor replication lag, database load, and slow-query logs.
- Validate report correctness when using cached or pre-aggregated data.

**Interview tip:** A read replica reduces primary workload, but it does not eliminate query cost; the replica itself can still become overloaded. For large analytical workloads, a separate reporting system or warehouse may be the better choice.

---

## Final Revision: Key Concepts to Remember

| Scenario | Main solution |
|---|---|
| E-commerce database design | Normalization, relationships, constraints, transactions, indexes |
| Consistency across services | Outbox, idempotency, retries, Saga, eventual consistency |
| Database migrations | Version control, testing, deployment and recovery strategy |
| Password storage | Argon2id, scrypt, or bcrypt with suitable parameters |
| Production schema changes | Expand-and-contract deployment |
| Add a column without downtime | Online DDL validation, staged rollout, batched backfill |
| Archive old data | Retention policy, verified copies, batches, partitioning or object storage |
| Production reporting | Query optimization, replicas, pre-aggregation, data warehouse |

## How to answer scenario-based questions in interviews

Use this structure for each answer:

1. **Requirement:** Explain the business problem and constraints.
2. **Design:** Describe your database, query, or architecture choice.
3. **Reliability:** Cover transactions, failures, rollback, and data consistency.
4. **Performance:** Explain indexes, batching, scaling, and monitoring.
5. **Trade-offs:** State why your approach fits the scenario and when you would choose an alternative.

The strongest senior-level answers explain not only what you would implement, but also how you would deploy it safely, detect failures, and recover without losing data.


# SQL Interview Preparation — Stored Procedures

**Database:** MySQL 8.0+

## 1. What is a Stored Procedure?

A stored procedure is a reusable set of SQL statements stored in the database and executed using the `CALL` statement in MySQL.

### Example

Suppose you frequently need to retrieve all employees.

```sql
DELIMITER //

CREATE PROCEDURE GetAllEmployees()
BEGIN
    SELECT * FROM employees;
END //

DELIMITER ;
```

**Execute the procedure:**

```sql
CALL GetAllEmployees();
```

**Explanation:**

- `CREATE PROCEDURE` creates the stored procedure.
- `BEGIN` and `END` enclose its SQL statements.
- `DELIMITER //` temporarily changes the statement delimiter so the internal semicolons do not terminate the entire definition.
- `CALL` executes the procedure.

## 2. Stored Procedure vs Normal SQL Query

| Stored Procedure | Normal SQL Query |
|---|---|
| Stored in the database | Usually sent by the application when needed |
| Can contain multiple SQL statements | Typically executes a single statement |
| Supports parameters and control flow | Depends on the statement and database interface |
| Can centralize database-side business operations | Business logic often resides in the application |
| Can simplify permissions by granting execution access | May require direct table permissions |
| Can reduce repeated SQL text and network round trips | May require multiple round trips for multiple statements |

**Important:** A stored procedure is not automatically faster than a normal SQL query. Performance depends on query design, indexes, execution plans, database engine, and workload.

---

## 3. Interview Questions and Answers

### Q1. What is the difference between a stored procedure and a function?

**Answer:**

A stored procedure is designed to execute a database operation or a sequence of operations. A function is designed to return a value and can often be used within SQL expressions, subject to database-specific rules.

| Stored Procedure | Function |
|---|---|
| Called using `CALL` in MySQL | Called as part of an expression |
| Can return result sets and use `OUT` parameters | Returns a value using `RETURN` |
| Can perform multi-step operations | Typically focuses on a computed result |
| Transaction control may be possible, subject to restrictions | Generally has more restrictions on side effects and transaction control |

Example procedure:

```sql
CALL GetAllEmployees();
```

Example function:

```sql
SELECT CalculateBonus(50000);
```

The function `CalculateBonus()` is illustrative; it must be created before use.

### Q2. What are `IN`, `OUT`, and `INOUT` parameters?

**Answer:**

MySQL supports three parameter modes.

- `IN`: Pass a value into the procedure.
- `OUT`: Return a value to the caller.
- `INOUT`: Pass a value in and return its modified value.

Example using an `IN` parameter:

```sql
DELIMITER //

CREATE PROCEDURE GetEmployeeById(IN emp_id INT)
BEGIN
    SELECT id, name, salary
    FROM employees
    WHERE id = emp_id;
END //

DELIMITER ;
```

Execute it:

```sql
CALL GetEmployeeById(101);
```

Example using an `OUT` parameter:

```sql
DELIMITER //

CREATE PROCEDURE GetEmployeeCount(OUT total INT)
BEGIN
    SELECT COUNT(*)
    INTO total
    FROM employees;
END //

DELIMITER ;
```

Execute it:

```sql
CALL GetEmployeeCount(@total);

SELECT @total;
```

The session variable `@total` receives the output.

### Q3. Can a stored procedure return multiple rows?

**Answer:**

Yes. A procedure can execute a `SELECT` statement that returns a result set.

```sql
DELIMITER //

CREATE PROCEDURE GetHighSalaryEmployees(IN min_salary DECIMAL(12,2))
BEGIN
    SELECT id, name, salary
    FROM employees
    WHERE salary >= min_salary
    ORDER BY salary DESC;
END //

DELIMITER ;
```

Call it:

```sql
CALL GetHighSalaryEmployees(80000);
```

The procedure returns all matching employees.

### Q4. What are the advantages of stored procedures?

**Answer:**

1. **Reusability:** Multiple applications can call the same database operation.
2. **Maintainability:** Shared SQL logic can be centralized.
3. **Security:** Applications can sometimes execute approved procedures without direct access to underlying tables.
4. **Network efficiency:** A procedure can perform multiple operations with fewer application-to-database round trips.
5. **Consistency:** Common database operations follow the same implementation.

### Q5. What are the disadvantages of stored procedures?

**Answer:**

- Business logic can become difficult to test and version if it is not managed properly.
- Complex logic inside the database can make application code harder to maintain.
- Database-specific syntax may reduce portability.
- Heavy procedures can consume database resources.
- Debugging and automated testing may be more difficult depending on the tooling.
- Deploying procedure changes requires a controlled database migration process.

### Q6. Are stored procedures always faster than application code?

**Answer:**

No. They can reduce network round trips and centralize SQL execution, but a poorly designed stored procedure can still be slow.

I would check the execution plan, indexes, query patterns, locks, and actual runtime before deciding whether a stored procedure improves performance.

### Q7. Can a stored procedure call another stored procedure?

**Answer:**

Yes. In MySQL, a procedure can call another procedure using `CALL`.

```sql
DELIMITER //

CREATE PROCEDURE ParentProcedure()
BEGIN
    CALL GetAllEmployees();
END //

DELIMITER ;
```

Execute it:

```sql
CALL ParentProcedure();
```

This example assumes `GetAllEmployees()` already exists.

### Q8. What is the difference between a stored procedure and a trigger?

**Answer:**

A stored procedure is explicitly called by an application or another database routine. A trigger executes automatically when a configured database event, such as an `INSERT`, `UPDATE`, or `DELETE`, occurs.

| Procedure | Trigger |
|---|---|
| Invoked explicitly | Invoked automatically |
| Can accept parameters | Does not accept ordinary caller-supplied parameters |
| Can be used for workflows | Commonly used for event-driven database logic |
| Called using `CALL` in MySQL | Runs when its configured event occurs |

---

## 4. Scenario-Based Questions

### Q9. Scenario: You need to transfer money between two bank accounts. How would you implement it?

**Answer:**

I would use a database transaction so that both account updates succeed together or neither update is committed.

The following example assumes the `accounts` table has `account_id` and `balance` columns. It illustrates the core transaction logic; a production implementation should also include validation, error handling, authorization, and idempotency.

```sql
DELIMITER //

CREATE PROCEDURE TransferMoney(
    IN from_account INT,
    IN to_account INT,
    IN transfer_amount DECIMAL(12,2)
)
BEGIN
    DECLARE current_balance DECIMAL(12,2);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    IF transfer_amount <= 0 OR from_account = to_account THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Invalid transfer request';
    END IF;

    START TRANSACTION;

    SELECT balance
    INTO current_balance
    FROM accounts
    WHERE account_id = from_account
    FOR UPDATE;

    IF current_balance < transfer_amount THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Insufficient balance';
    END IF;

    UPDATE accounts
    SET balance = balance - transfer_amount
    WHERE account_id = from_account;

    UPDATE accounts
    SET balance = balance + transfer_amount
    WHERE account_id = to_account;

    COMMIT;
END //

DELIMITER ;
```

Call it:

```sql
CALL TransferMoney(101, 102, 500.00);
```

**How it works:**

1. Validates the amount and account IDs.
2. Starts a transaction.
3. Locks the source account row while checking its balance.
4. Debits the source and credits the destination.
5. Commits the changes together.
6. Rolls back and rethrows SQL errors.

**Production considerations:**

- Verify that both accounts exist.
- Lock rows in a consistent order to reduce deadlocks.
- Enforce appropriate decimal precision and business rules.
- Ensure the tables use a transactional engine such as InnoDB.
- Consider idempotency keys to prevent duplicate transfers on retries.
- Add an audit or ledger record within the same transaction.
- Establish a clear policy for transaction ownership between the application and procedure.

### Q10. Scenario: An e-commerce application needs to retrieve orders for a customer. Would you use a stored procedure?

**Answer:**

I would consider a stored procedure if the query is reused by several applications or needs centralized database-side access control. For a simple query used by one service, a parameterized query in the application may be easier to maintain.

Example:

```sql
DELIMITER //

CREATE PROCEDURE GetCustomerOrders(IN customer_id BIGINT)
BEGIN
    SELECT
        id,
        status,
        total_amount,
        created_at
    FROM orders
    WHERE user_id = customer_id
    ORDER BY created_at DESC, id DESC;
END //

DELIMITER ;
```

Call it:

```sql
CALL GetCustomerOrders(1001);
```

**Performance improvement:** For a large orders table, consider a composite index:

```sql
CREATE INDEX idx_orders_user_created_id
ON orders (user_id, created_at, id);
```

This index aligns with the customer filter and ordering. Validate its usefulness using the execution plan and real workload.

### Q11. Scenario: A procedure is running slowly in production. What will you do?

**Answer:**

I would investigate the SQL statements inside the procedure rather than assuming the procedure itself is the problem.

My approach:

1. Identify the slow statement using database monitoring and slow-query logs.
2. Inspect the execution plan with `EXPLAIN`.
3. Check for missing or ineffective indexes.
4. Review table sizes, join conditions, and full table scans.
5. Check for lock waits, blocking transactions, and deadlocks.
6. Reduce unnecessary queries and repeated calculations.
7. Test the proposed changes with representative data.
8. Deploy and compare latency and resource usage.

Example:

```sql
EXPLAIN
SELECT id, name
FROM employees
WHERE department_id = 10;
```

If this query is frequently executed against a large table and the plan indicates an expensive scan, an index may help:

```sql
CREATE INDEX idx_employees_department
ON employees (department_id);
```

I would verify that the index improves the workload and account for its additional storage and write costs.

### Q12. Scenario: Two users try to purchase the last available product simultaneously. How would you prevent overselling?

**Answer:**

I would use an atomic conditional update instead of reading stock and updating it later in separate, unprotected operations.

Assume the `inventory` table contains `product_id` and `available_quantity`.

```sql
UPDATE inventory
SET available_quantity = available_quantity - 1
WHERE product_id = 101
  AND available_quantity >= 1;
```

Immediately check the number of affected rows:

- `1` row affected: one unit was reserved.
- `0` rows affected: the product was unavailable or had insufficient stock.

For an operation that also creates an order, execute the inventory update and order changes within an appropriate transaction.

**Why is this safer?**

The database evaluates the condition and update as one atomic operation. Competing requests cannot both decrement the same single available unit successfully.

For more complex workflows involving payment services, use a reservation/expiry mechanism and a reliable order-state workflow.

### Q13. Scenario: A stored procedure must process millions of rows. How would you design it?

**Answer:**

I would avoid loading and processing all rows in one enormous transaction unless the workload specifically requires it. Large operations can create excessive locks, transaction logs, undo data, replication lag, and rollback costs.

I would:

- Process rows in controlled batches using a stable indexed cursor or primary-key range.
- Make the operation restartable and idempotent.
- Commit batches where the business consistency requirements allow it.
- Monitor execution time, lock waits, replication lag, and database load.
- Consider set-based SQL instead of row-by-row loops.
- Schedule heavy jobs away from peak traffic where possible.

Example of a batch update:

```sql
UPDATE orders
SET status = 'ARCHIVED'
WHERE status = 'COMPLETED'
  AND created_at < '2024-01-01'
ORDER BY id
LIMIT 1000;
```

Repeat until no rows are affected, while ensuring the operation has appropriate indexes and that each batch meets the required business rules.

### Q14. Scenario: How would you handle errors inside a stored procedure?

**Answer:**

In MySQL, I can use `DECLARE ... HANDLER` to handle SQL exceptions and perform cleanup or rollback.

```sql
DELIMITER //

CREATE PROCEDURE UpdateEmployeeSalary(
    IN emp_id INT,
    IN new_salary DECIMAL(12,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    IF new_salary <= 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Salary must be greater than zero';
    END IF;

    START TRANSACTION;

    UPDATE employees
    SET salary = new_salary
    WHERE id = emp_id;

    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Employee not found or salary unchanged';
    END IF;

    COMMIT;
END //

DELIMITER ;
```

**Important nuance:** In MySQL, `ROW_COUNT()` can return zero when the update matches a row but does not change its value. Therefore, the example's message can be inaccurate when the salary is already equal to `new_salary`. In production, check employee existence separately if the distinction matters.

Also, transaction handling must be designed carefully if the caller already owns a transaction. A procedure should not unexpectedly commit or roll back work that belongs to its caller.

---

## 5. Rapid-Fire Interview Questions

**Q15. Can we use `IF` and `LOOP` inside a stored procedure?**

Yes. MySQL stored procedures support control-flow statements such as `IF`, `CASE`, `LOOP`, `WHILE`, and `REPEAT`.

**Q16. Can a stored procedure return an error?**

Yes. You can raise a custom error using `SIGNAL SQLSTATE '45000'` in MySQL.

**Q17. Can we use a transaction inside a stored procedure?**

Yes, subject to transaction ownership and database-specific restrictions. Be careful when the application or caller has already started a transaction.

**Q18. Can we create an index inside a stored procedure?**

MySQL supports certain DDL statements inside stored procedures, but DDL can cause implicit commits and may introduce locking. Schema changes are usually better handled through controlled migration tooling.

**Q19. How do you secure a stored procedure?**

Use least-privilege database accounts, parameterized inputs, appropriate execution privileges, and a secure execution context. Avoid building dynamic SQL by concatenating untrusted user input.

**Q20. When should you avoid stored procedures?**

Avoid them when they add unnecessary complexity, duplicate application logic, make deployment difficult, or perform expensive operations that are better suited to an analytical system. Choose based on the workload and maintainability requirements.

---

## 6. Final Revision Sheet

| Topic | Key point |
|---|---|
| Stored procedure | Reusable database-side SQL logic |
| `IN` parameter | Input value |
| `OUT` parameter | Output value |
| `INOUT` parameter | Input and output |
| Procedure vs function | Procedure performs operations; function returns a value |
| Procedure vs trigger | Explicit invocation vs automatic invocation |
| Transactions | Use commit/rollback for atomic operations |
| Error handling | Use handlers and `RESIGNAL` |
| Performance | Inspect SQL plans, indexes, and lock waits |
| Security | Least privilege, safe parameters, controlled execution |
| Large data processing | Batching, set-based SQL, restartability |
| Concurrency | Atomic updates, transactions, and suitable locking |

**Best interview strategy:** For every scenario, explain the business requirement, show the SQL approach, describe failure handling, and mention performance and concurrency considerations. That demonstrates practical database experience rather than just syntax knowledge.


# Top 20 Complex MySQL Queries for Interviews

## Sample Tables Used

Assume these tables exist:

```sql
employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(12,2),
    department_id INT,
    manager_id INT,
    email VARCHAR(255),
    hire_date DATE
);

departments (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255)
);

orders (
    id INT PRIMARY KEY,
    customer_id INT,
    amount DECIMAL(12,2),
    status VARCHAR(30),
    order_date DATETIME
);

products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    category_id INT,
    price DECIMAL(12,2)
);

order_items (
    id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(12,2)
);
```

---

## Q1. Find the second-highest distinct salary

**Concept:** Subquery, `MAX()`

```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);
```

**Explanation:**

1. The inner query finds the highest salary.
2. The outer query considers salaries below the maximum.
3. `MAX()` returns the next-highest distinct salary.

**Follow-up:** For the Nth-highest distinct salary, use `DENSE_RANK()`.

```sql
WITH ranked AS (
    SELECT
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
    FROM employees
)
SELECT DISTINCT salary
FROM ranked
WHERE salary_rank = 3;
```

Change `3` to the required rank.

---

## Q2. Find the highest-paid employee in each department

**Concept:** `ROW_NUMBER()`, partitioning

```sql
WITH ranked_employees AS (
    SELECT
        e.id,
        e.name,
        e.salary,
        e.department_id,
        ROW_NUMBER() OVER (
            PARTITION BY e.department_id
            ORDER BY e.salary DESC, e.id
        ) AS rn
    FROM employees e
)
SELECT id, name, salary, department_id
FROM ranked_employees
WHERE rn = 1;
```

**Explanation:**

- `PARTITION BY department_id` ranks employees independently in each department.
- `ORDER BY salary DESC` puts the highest salary first.
- `id` breaks ties deterministically.
- `ROW_NUMBER() = 1` returns exactly one employee per department.

To return **all employees tied for the highest salary**, use `RANK()` instead of `ROW_NUMBER()`.

---

## Q3. Find employees earning more than their department's average salary

**Concept:** Window function

```sql
WITH department_salary AS (
    SELECT
        id,
        name,
        salary,
        department_id,
        AVG(salary) OVER (
            PARTITION BY department_id
        ) AS avg_salary
    FROM employees
)
SELECT id, name, salary, department_id, avg_salary
FROM department_salary
WHERE salary > avg_salary;
```

**Explanation:** The window function calculates the average for each department without collapsing individual employee rows. The outer query filters employees whose salary is above that average.

---

## Q4. Find the top 3 highest-paid employees in each department

**Concept:** `DENSE_RANK()`

```sql
WITH ranked AS (
    SELECT
        id,
        name,
        salary,
        department_id,
        DENSE_RANK() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
)
SELECT id, name, salary, department_id
FROM ranked
WHERE salary_rank <= 3
ORDER BY department_id, salary DESC;
```

**Important:** `DENSE_RANK()` returns the top three distinct salary levels per department. It may return more than three employees if salaries are tied.

If the requirement is exactly three employees per department, use `ROW_NUMBER()` instead.

---

## Q5. Find customers who have never placed an order

**Concept:** `LEFT JOIN`, `NULL`

```sql
SELECT
    c.id,
    c.name,
    c.email
FROM customers c
LEFT JOIN orders o
    ON o.customer_id = c.id
WHERE o.id IS NULL;
```

**Explanation:**

- `LEFT JOIN` preserves every customer.
- Customers with no matching order have `NULL` values in the order columns.
- `WHERE o.id IS NULL` selects those customers.

**Alternative using `NOT EXISTS`:**

```sql
SELECT c.id, c.name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
);
```

`NOT EXISTS` is often a clear choice for anti-join logic.

---

## Q6. Find customers who placed more than 5 orders

**Concept:** `GROUP BY`, `HAVING`

```sql
SELECT
    c.id,
    c.name,
    COUNT(o.id) AS total_orders
FROM customers c
JOIN orders o
    ON o.customer_id = c.id
GROUP BY c.id, c.name
HAVING COUNT(o.id) > 5
ORDER BY total_orders DESC;
```

**Explanation:**

- `GROUP BY` creates one result per customer.
- `COUNT(o.id)` counts matching orders.
- `HAVING` filters groups after aggregation.

If only successful or completed orders count, add the appropriate status condition, for example `AND o.status = 'COMPLETED'` in the join.

---

## Q7. Find duplicate email addresses

**Concept:** Aggregation

```sql
SELECT
    email,
    COUNT(*) AS duplicate_count
FROM employees
WHERE email IS NOT NULL
GROUP BY email
HAVING COUNT(*) > 1;
```

To retrieve the full rows for duplicate emails:

```sql
WITH duplicates AS (
    SELECT email
    FROM employees
    WHERE email IS NOT NULL
    GROUP BY email
    HAVING COUNT(*) > 1
)
SELECT e.*
FROM employees e
JOIN duplicates d
    ON d.email = e.email
ORDER BY e.email, e.id;
```

**Interview tip:** Discuss case sensitivity and whitespace normalization if email comparisons must follow application-specific rules.

---

## Q8. Find the latest order for each customer

**Concept:** `ROW_NUMBER()`

```sql
WITH ranked_orders AS (
    SELECT
        id,
        customer_id,
        amount,
        status,
        order_date,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY order_date DESC, id DESC
        ) AS rn
    FROM orders
)
SELECT id, customer_id, amount, status, order_date
FROM ranked_orders
WHERE rn = 1;
```

**Explanation:** The latest order is ranked first within each customer's partition. The `id` tie-breaker ensures deterministic ordering when two orders share the same timestamp.

To include customers who have never placed an order, start from `customers` and use a `LEFT JOIN` to the ranked results.

---

## Q9. Calculate a running total of sales

**Concept:** `SUM() OVER`

```sql
SELECT
    id,
    customer_id,
    order_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date, id
        ROWS BETWEEN UNBOUNDED PRECEDING
                 AND CURRENT ROW
    ) AS running_total
FROM orders
WHERE status = 'COMPLETED'
ORDER BY customer_id, order_date, id;
```

**Explanation:**

- `PARTITION BY customer_id` resets the total for each customer.
- The ordering determines the accumulation sequence.
- `UNBOUNDED PRECEDING` starts from the first row in the partition.

This calculates a running total of completed orders for each customer.

---

## Q10. Calculate month-over-month revenue growth

**Concept:** `LAG()`, aggregation

```sql
WITH monthly_revenue AS (
    SELECT
        DATE_FORMAT(order_date, '%Y-%m') AS sales_month,
        SUM(amount) AS revenue
    FROM orders
    WHERE status = 'COMPLETED'
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
),
revenue_comparison AS (
    SELECT
        sales_month,
        revenue,
        LAG(revenue) OVER (
            ORDER BY sales_month
        ) AS previous_month_revenue
    FROM monthly_revenue
)
SELECT
    sales_month,
    revenue,
    previous_month_revenue,
    ROUND(
        100.0 * (revenue - previous_month_revenue)
        / NULLIF(previous_month_revenue, 0),
        2
    ) AS growth_percentage
FROM revenue_comparison
ORDER BY sales_month;
```

**Explanation:**

1. Aggregate revenue by month.
2. Use `LAG()` to retrieve the previous row's revenue.
3. Calculate the percentage change.
4. Use `NULLIF()` to prevent division by zero.

**Important:** This compares each month with the previous month present in the results. If a month has no orders, it is absent from the aggregation. To compare against the immediately preceding calendar month even when it has zero revenue, join the results to a calendar or month-sequence table.

---

## Q11. Find consecutive days on which a customer placed orders

**Concept:** Gaps and islands

Suppose you need to find customer/date groups with at least three consecutive calendar days of orders.

```sql
WITH daily_orders AS (
    SELECT DISTINCT
        customer_id,
        DATE(order_date) AS order_day
    FROM orders
),
numbered AS (
    SELECT
        customer_id,
        order_day,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY order_day
        ) AS rn
    FROM daily_orders
),
grouped_days AS (
    SELECT
        customer_id,
        order_day,
        DATE_SUB(
            order_day,
            INTERVAL rn DAY
        ) AS group_key
    FROM numbered
)
SELECT
    customer_id,
    MIN(order_day) AS streak_start,
    MAX(order_day) AS streak_end,
    COUNT(*) AS consecutive_days
FROM grouped_days
GROUP BY customer_id, group_key
HAVING COUNT(*) >= 3
ORDER BY customer_id, streak_start;
```

**Explanation:**

- First, keep one row per customer per calendar day.
- Assign a sequential row number to each day.
- Subtracting the row number from each date produces the same grouping key for consecutive dates.
- Group by that key and keep streaks of at least three days.

This is a classic **gaps-and-islands** interview problem.

---

## Q12. Find employees and their managers

**Concept:** Self join

```sql
SELECT
    e.id AS employee_id,
    e.name AS employee_name,
    m.id AS manager_id,
    m.name AS manager_name
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.id
ORDER BY e.id;
```

**Explanation:**

The `employees` table is joined to itself:

- `e` represents the employee.
- `m` represents the manager.
- `manager_id` references another employee's `id`.

A `LEFT JOIN` also returns employees who do not have a manager, such as top-level executives.

---

## Q13. Find the complete employee hierarchy

**Concept:** Recursive CTE

```sql
WITH RECURSIVE employee_hierarchy AS (
    SELECT
        id,
        name,
        manager_id,
        0 AS hierarchy_level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT
        e.id,
        e.name,
        e.manager_id,
        h.hierarchy_level + 1
    FROM employees e
    JOIN employee_hierarchy h
        ON e.manager_id = h.id
)
SELECT
    id,
    name,
    manager_id,
    hierarchy_level
FROM employee_hierarchy
ORDER BY hierarchy_level, manager_id, id;
```

**Explanation:**

- The anchor query starts with employees who have no manager.
- The recursive query finds employees reporting to each row in the current hierarchy.
- The level increases at each step.

**Interview tip:** Consider cycles and orphaned records in production. This query only returns employees reachable from a root with `manager_id IS NULL`.

---

## Q14. Find products that have never been ordered

**Concept:** `NOT EXISTS`

```sql
SELECT
    p.id,
    p.name,
    p.price
FROM products p
WHERE NOT EXISTS (
    SELECT 1
    FROM order_items oi
    WHERE oi.product_id = p.id
);
```

**Explanation:** The subquery checks whether each product has at least one matching order item. `NOT EXISTS` returns products without any matching record.

If the business means "never sold in a completed order," join to `orders` and filter by the appropriate completed status.

---

## Q15. Find the best-selling product in each category

**Concept:** Aggregation + window ranking

```sql
WITH product_sales AS (
    SELECT
        p.id,
        p.name,
        p.category_id,
        SUM(oi.quantity) AS units_sold
    FROM products p
    JOIN order_items oi
        ON oi.product_id = p.id
    JOIN orders o
        ON o.id = oi.order_id
    WHERE o.status = 'COMPLETED'
    GROUP BY p.id, p.name, p.category_id
),
ranked_products AS (
    SELECT
        id,
        name,
        category_id,
        units_sold,
        DENSE_RANK() OVER (
            PARTITION BY category_id
            ORDER BY units_sold DESC
        ) AS sales_rank
    FROM product_sales
)
SELECT id, name, category_id, units_sold
FROM ranked_products
WHERE sales_rank = 1;
```

**Explanation:**

1. Aggregate the quantity sold for each product.
2. Rank products separately within each category.
3. Return the top sales rank.

`DENSE_RANK()` includes ties. If you need exactly one winner per category, use `ROW_NUMBER()` with a deterministic tie-breaker.

---

## Q16. Find orders whose amount is greater than the customer's average order amount

**Concept:** Window function

```sql
WITH customer_order_stats AS (
    SELECT
        id,
        customer_id,
        amount,
        order_date,
        AVG(amount) OVER (
            PARTITION BY customer_id
        ) AS average_order_amount
    FROM orders
)
SELECT
    id,
    customer_id,
    amount,
    average_order_amount
FROM customer_order_stats
WHERE amount > average_order_amount
ORDER BY customer_id, amount DESC;
```

**Explanation:** The average is calculated separately for each customer. The outer query filters orders that exceed that customer's average order amount.

If only completed orders count, filter to completed orders before calculating the average.

---

## Q17. Find customers who ordered in every month of a given year

**Concept:** `COUNT(DISTINCT)`, aggregation

For customers who placed at least one order in **each of the 12 months of 2025**:

```sql
SELECT
    customer_id,
    COUNT(DISTINCT MONTH(order_date)) AS active_months
FROM orders
WHERE order_date >= '2025-01-01'
  AND order_date < '2026-01-01'
GROUP BY customer_id
HAVING COUNT(DISTINCT MONTH(order_date)) = 12;
```

**Explanation:**

- The date range limits the data to 2025.
- `COUNT(DISTINCT MONTH(order_date))` counts distinct calendar months.
- `HAVING = 12` keeps customers active in all 12 months.

This query does not require an order in every month if some rows are excluded by other filters; add any required status condition consistently.

---

## Q18. Find duplicate orders or records using multiple columns

**Concept:** Composite grouping

Suppose duplicate records are defined as rows with the same `customer_id`, `amount`, and `order_date`.

```sql
SELECT
    customer_id,
    amount,
    order_date,
    COUNT(*) AS duplicate_count
FROM orders
GROUP BY
    customer_id,
    amount,
    order_date
HAVING COUNT(*) > 1;
```

**Explanation:** This identifies groups sharing all three values. It does not necessarily mean the records are erroneous: a customer can legitimately place two orders with identical amounts at the same timestamp.

To retrieve the full duplicate rows:

```sql
WITH duplicate_groups AS (
    SELECT
        customer_id,
        amount,
        order_date
    FROM orders
    GROUP BY customer_id, amount, order_date
    HAVING COUNT(*) > 1
)
SELECT o.*
FROM orders o
JOIN duplicate_groups d
    ON d.customer_id = o.customer_id
   AND d.amount = o.amount
   AND d.order_date = o.order_date;
```

This equality-based join does not match `NULL` values in the grouped columns. If those columns can be `NULL`, use null-safe comparisons such as MySQL's `<=>` where appropriate.

---

## Q19. Find the percentage contribution of each product to total revenue

**Concept:** Window aggregate

```sql
WITH product_revenue AS (
    SELECT
        p.id,
        p.name,
        SUM(oi.quantity * oi.unit_price) AS revenue
    FROM products p
    JOIN order_items oi
        ON oi.product_id = p.id
    JOIN orders o
        ON o.id = oi.order_id
    WHERE o.status = 'COMPLETED'
    GROUP BY p.id, p.name
)
SELECT
    id,
    name,
    revenue,
    ROUND(
        100.0 * revenue
        / NULLIF(SUM(revenue) OVER (), 0),
        2
    ) AS revenue_percentage
FROM product_revenue
ORDER BY revenue DESC;
```

**Explanation:**

- Revenue is calculated for each product.
- `SUM(revenue) OVER ()` calculates the total across all returned products.
- Each product's revenue is divided by that total to obtain its percentage contribution.

**Important:** Use `order_items.unit_price` to calculate historical sales revenue rather than the current product price.

---

## Q20. Find the median salary

**Concept:** Window functions, row counting

MySQL 8.0 does not provide a general built-in `MEDIAN()` aggregate, so you can calculate the median using window functions.

```sql
WITH ranked_salaries AS (
    SELECT
        salary,
        ROW_NUMBER() OVER (
            ORDER BY salary
        ) AS rn,
        COUNT(*) OVER () AS total_rows
    FROM employees
    WHERE salary IS NOT NULL
)
SELECT AVG(salary) AS median_salary
FROM ranked_salaries
WHERE rn IN (
    FLOOR((total_rows + 1) / 2),
    FLOOR((total_rows + 2) / 2)
);
```

**Explanation:**

- `ROW_NUMBER()` sorts the salaries and assigns row numbers.
- `COUNT(*) OVER()` finds the number of non-NULL salaries.
- For an odd count, the middle row is selected.
- For an even count, the two middle salaries are averaged.

Example:

| Salaries | Median |
|---|---:|
| 10, 20, 30 | 20 |
| 10, 20, 30, 40 | 25 |

This computes the median across all employees. To calculate the median separately per department, partition the row number and count by `department_id` and group the final result by department.

---

# Bonus: Performance Questions Interviewers Ask

## 1. How do you optimize a slow query?

- Inspect the execution plan with `EXPLAIN`.
- Check whether indexes support the filters, joins, and sorting.
- Avoid retrieving unnecessary columns.
- Review join cardinality and aggregation costs.
- Check for lock waits and missing statistics.
- Measure changes with representative data.

## 2. Why can a query fail to use an index?

Common reasons include:

- Applying a function to an indexed column in a way that prevents ordinary index use.
- Using a leading-wildcard search such as `LIKE '%phone'`.
- Implicit type conversions.
- Low-selectivity indexes that the optimizer decides not to use.
- Composite-index column order not matching the query pattern.

Always validate the actual execution plan rather than assuming an index will be used.

## 3. What is the difference between `WHERE` and `HAVING`?

- `WHERE` filters individual rows before grouping.
- `HAVING` filters groups after aggregation.

Example:

```sql
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
WHERE salary > 0
GROUP BY department_id
HAVING AVG(salary) > 70000;
```

## 4. What is the difference between `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()`?

| Function | Behavior with ties |
|---|---|
| `ROW_NUMBER()` | Gives each row a unique number |
| `RANK()` | Gives tied rows the same rank, leaving gaps |
| `DENSE_RANK()` | Gives tied rows the same rank, without gaps |

## 5. What should you explain while writing a complex query?

1. Clarify the required output and edge cases.
2. Choose joins, subqueries, CTEs, or window functions appropriately.
3. Explain how duplicates, `NULL`, and ties are handled.
4. Discuss indexes and execution plans.
5. Consider data volume and correctness under concurrent changes.

**Interview strategy:** Practice writing Q2, Q4, Q8, Q10, Q11, Q13, Q15, and Q20 without looking at the solutions. These are particularly useful for testing window functions, recursion, aggregation, and problem-solving skills.