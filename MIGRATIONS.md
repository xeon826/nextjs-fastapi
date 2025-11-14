# Database Migrations with SQLModel and Alembic

This project uses SQLModel for database models and Alembic for database migrations.

## Migration Commands

### Initialize Alembic (first time only)
```bash
poetry run alembic init alembic
```

### Create a new migration
When you change your SQLModel models, create a migration:
```bash
npm run migrate-create -- "description of changes"
```

### Apply migrations
```bash
npm run migrate
```

### Rollback last migration
```bash
npm run migrate-downgrade
```

### View migration history
```bash
poetry run alembic history
```

### Check current migration
```bash
poetry run alembic current
```

## Migration Workflow

1. **Make changes** to your SQLModel models in `api/models.py`
2. **Create migration**: `npm run migrate-create -- "add user table"`
3. **Review** the generated migration file in `alembic/versions/`
4. **Apply migration**: `npm run migrate`
5. **Test** your application

## Development vs Production

- **Development**: Uses SQLite database (`test.db`)
- **Production**: Set `DATABASE_URL` environment variable to your production database

## First Time Setup

```bash
# Install dependencies
npm run python-install

# Create initial migration
npm run migrate-create -- "initial tables"

# Apply migrations
npm run migrate

# Start development servers
npm run dev
```