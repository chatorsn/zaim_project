#!/bin/bash
set -e

echo "Waiting for PostgreSQL..."
while ! nc -z postgres 5432; do
  sleep 0.5
done
echo "PostgreSQL is ready"

node -e "
const { query } = require('./lib/db');
const fs = require('fs');
const sql = fs.readFileSync('./lib/init.sql', 'utf8');
query(sql).then(() => console.log('Tables created')).catch(console.error);
"
