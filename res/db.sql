CREATE TABLE tutorials (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    published BOOLEAN,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE tutorials RENAME COLUMN createdat TO "createdAt";
ALTER TABLE tutorials RENAME COLUMN updatedat TO "updatedAt";

INSERT INTO tutorials (title, description, published)
VALUES 
    ('Introduction to PostgreSQL', 'Learn the basics of PostgreSQL', true),
    ('Advanced SQL Queries', 'Deep dive into complex SQL queries', true),
    ('Database Optimization', 'Techniques to improve database performance', false),
    ('Using Indexes in PostgreSQL', 'Understanding and using indexes efficiently', true),
    ('PostgreSQL Triggers', 'How to use triggers in PostgreSQL', false);